import moment from "moment";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import hitSound from "../../Assets/final new sound/invalid-selection-39351.mp3";
import { server_url } from "../../Config/API";
import AuthUser from "../../Hooks/authUser";
import PostHooks from "../../Hooks/PostHooks";
import UpdateHooks from "../../Hooks/UpdateHooks";
const JumpAndRunGame = () => {
  const [isRunning, setIsRunning] = useState(true);
  const [positionY, setPositionY] = useState(window.innerHeight / 2);
  const [velocityY, setVelocityY] = useState(0);
  const [obstacles, setObstacles] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300);
  const [isGameOver, setIsGameOver] = useState(false);
  const gameRef = useRef(null);
  const deviceWidth = window.innerWidth;
  const deviceHeight = window.innerHeight;
  const gameContainerRef = useRef(null);
  const navigate = useNavigate();
  // Full screen event listener
  const [isFullScreen, setIsFullScreen] = useState(false);

  const [randomData, setRandomData] = useState([]);

  const { userInfo } = AuthUser();
  let date = moment().format("YYYY-MM-D");
  let time = moment().format("h:mm a");
  const previousStateRef = useRef(null);
  const scoreRef = useRef(null);
  const timeRef = useRef(null);
  scoreRef.current = score;
  timeRef.current = timeLeft;
  // const squareHeight = [20, 50, 80, 20, 70, 130, 90, 80, 100, 115];

  const fetchFunction = async () => {
    await fetch(
      `${server_url}/randomObstacle/specific?fieldName=${"userId"}&&fieldValue=${
        userInfo?._id
      }&&fieldName2=${"date"}&&fieldValue2=${date}&&fieldName3=${"gameName"}&&fieldValue3=${"Random Obstacle Monocular"}`
    )
      .then((res) => res.json())
      .then((data) => {
        setRandomData(data?.data);
        console.log(data?.data);
        if (data?.data.length) {
          setScore(data?.data[0]?.score);
          previousStateRef.current = data?.data;
        }
      });
  };

  useEffect(() => {
    if (randomData?.length) {
      setTimeLeft(randomData[0]?.remainingTime);
      setScore(randomData[0]?.score);
    }
  }, [randomData]);

  useEffect(() => {
    fetchFunction();
    return () => {
      // insertFunction();
    };
  }, []);

  const insertFunction = useCallback(() => {
    if (previousStateRef?.current?.length) {
      UpdateHooks(
        `${server_url}/randomObstacle/updateRandomObstacle/${previousStateRef?.current[0]?._id}`,
        {
          date: date,
          time: time,
          score: scoreRef.current,
          remainingTime: timeRef.current,
        }
      );
    } else {
      PostHooks(
        `${server_url}/randomObstacle/addRandomObstacle`,
        {
          gameName: "Random Obstacle Monocular",
          userId: userInfo?._id,
          userName: userInfo?.name,
          date: date,
          time: time,
          score: scoreRef.current,
          remainingTime: timeRef.current,
        },
        "Random Obstacle score updated !"
      );
    }
  }, [randomData, timeLeft, scoreRef]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft((prevTime) => prevTime - 1);
      } else {
        insertFunction();
        clearInterval(interval);
        setIsGameOver(true);
        navigate(-1);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [timeLeft]);

  const jump = () => {
    if (isGameOver) return;
    if (positionY === window.innerHeight / 2) {
      setVelocityY(25);
    }
  };

  const audioContextRef = useRef(
    new (window.AudioContext || window.webkitAudioContext)()
  ); // Create an audio context
  const collisionSoundRef = useRef(null);
  const isCollisionSoundLoadedRef = useRef(false);

  // Function to play the hit sound
  const loadAudio = async () => {
    try {
      const response = await fetch(hitSound);
      const audioData = await response.arrayBuffer();
      const audioBuffer = await audioContextRef.current.decodeAudioData(
        audioData
      );
      collisionSoundRef.current = audioBuffer;
      isCollisionSoundLoadedRef.current = true;
    } catch (error) {
      console.error("Error loading audio:", error);
    }
  };

  const playCollisionSound = () => {
    if (collisionSoundRef.current && isCollisionSoundLoadedRef.current) {
      const source = audioContextRef.current.createBufferSource();
      source.buffer = collisionSoundRef.current;
      source.connect(audioContextRef.current.destination);
      source.start(0);
    }
  };

  useEffect(() => {
    loadAudio();
    gameContainerRef.current.focus();

    const handleKeyDown = (event) => {
      if (event.keyCode === 32) {
        jump();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsRunning(false);
      setIsGameOver(true);
      clearInterval(gameRef.current);
    }
  }, [timeLeft]);
  useEffect(() => {
    toggleFullScreen();
  }, []);

  useEffect(() => {
    // const MIN_GAP = 100;
    // const MAX_GAP = 250;

    const gameLoop = setInterval(() => {
      if (isRunning && !isGameOver) {
        // Logic for ball movement
        setVelocityY(velocityY - 2);
        setPositionY(Math.max(deviceHeight / 2, positionY + velocityY));
        if (positionY === deviceHeight / 2 && velocityY < 0) setVelocityY(0);

        // Logic for obstacle movement and creation
        const newObstacles = obstacles.map((obstacle) => ({
          ...obstacle,
          x: obstacle.x - 12,
        }));
        if (newObstacles.length > 0 && newObstacles[0].x < -50)
          newObstacles.shift();
        if (
          newObstacles.length === 0 ||
          (newObstacles.length < 3 &&
            newObstacles[newObstacles.length - 1].x < deviceWidth - 300 &&
            Math.random() < 0.02)
        ) {
          newObstacles.push({
            x: deviceWidth,
            y: deviceHeight / 2,
            z: 20 + Math.floor(Math.random() * 80),
          });
        }
        // Update collision detection logic
        const collision = newObstacles.some((obstacle) => {
          const obstacleRadius = obstacle.z / 2;
          const ballRadius = 10;
          const distance = Math.sqrt(
            Math.pow(obstacle.x - deviceWidth / 2, 2) +
              Math.pow(obstacle.y - positionY, 2)
          );
          if (distance < obstacleRadius + ballRadius) {
            playCollisionSound();

            return true;
          } else {
            setScore((prevScore) => prevScore + 1);
          }
          return false;
        });

        if (collision) setScore(score - 10);

        // Update states
        setObstacles(newObstacles);
      }
    }, 1000 / 30); // 60 FPS

    gameRef.current = gameLoop;

    return () => clearInterval(gameRef.current);
  }, [isRunning, positionY, velocityY, obstacles, score, timeLeft, isGameOver]);

  const toggleFullScreen = () => {
    if (!isFullScreen) {
      // Enter full screen mode
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch((error) => {
          console.error("Error entering full screen:", error);
        });
      }
    } else {
      // navigate(-1);
    }
    setIsFullScreen(!isFullScreen);
  };

  useEffect(() => {
    const handleKeyPress = async (event) => {
      if (event.keyCode === 27 && isFullScreen) {
        insertFunction();
        await navigate(-1);
        toggleFullScreen();
        // console.log("isFull");
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
      // console.log("return");
    };
  }, [isFullScreen, navigate]);

  console.log(timeLeft, score);
  return (
    <div
      className="w-full h-screen inset-0 fixed bg-[#f7f7f7] "
      tabIndex="0"
      onKeyDown={jump}
      ref={gameContainerRef}
    >
      <>
        <div
          style={{
            position: "absolute",
            bottom: `${positionY}px`,
            left: "50%",
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            backgroundColor: "#333",
          }}
        ></div>
        {/* {console.log(obstacles)} */}
        {obstacles.map((obstacle, index) => (
          <div
            className="border-2 border-black"
            key={index}
            style={{
              position: "absolute",
              bottom: `${obstacle.y}px`,
              left: `${obstacle.x}px`,
              width: "30px",
              height: `${obstacle.z}px`,
            }}
          ></div>
        ))}
        <div className="bg-black h-[2px] w-full absolute bottom-[50%]"></div>
      </>

      <div
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          fontSize: "18px",
        }}
      >
        {/* Time: {Math.floor(timeLeft / 50)}:
        {(timeLeft % 50).toString().padStart(2, "0")} */}
      </div>
    </div>
  );
};

export default JumpAndRunGame;
