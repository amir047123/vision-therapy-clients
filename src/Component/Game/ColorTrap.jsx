import moment from "moment";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import scoreIncreaseSound from "../../Assets/sound/smooth movement/correct-choice-43861.mp3";
import { server_url } from "../../Config/API";
import AuthUser from "../../Hooks/authUser";
import PostHooks from "../../Hooks/PostHooks";
import UpdateHooks from "../../Hooks/UpdateHooks";

const ColorTrap = () => {
  // State variables
  const [gameStarted, setGameStarted] = useState(true);
  const [objectPosition, setObjectPosition] = useState({ x: 0, y: 0 });
  const [circleSize, setCircleSize] = useState(100);
  const navigate = useNavigate();
  // Full screen event listener
  const [isFullScreen, setIsFullScreen] = useState(false);

  const [timeLeft, setTimeLeft] = useState(300);
  const [score, setScore] = useState(0);
  const [colorTrapData, setColorTrapData] = useState([]);

  const { userInfo } = AuthUser();
  let date = moment().format("YYYY-MM-D");
  let time = moment().format("h:mm a");
  const previousStateRef = useRef(null);
  const scoreRef = useRef(null);
  const timeRef = useRef(null);
  scoreRef.current = score;
  timeRef.current = timeLeft;

  // Function to start the game
  // const startGame = () => {
  //   setGameStarted(true);
  //   setScore(0);
  //   moveObjectRandomly();
  //   startTimer();
  // };

  const fetchFunction = async () => {
    await fetch(
      `${server_url}/colorTrap/specific?fieldName=${"userId"}&&fieldValue=${
        userInfo?._id
      }&&fieldName2=${"date"}&&fieldValue2=${date}&&fieldName3=${"gameName"}&&fieldValue3=${"Color Trap Monocular"}`
    )
      .then((res) => res.json())
      .then((data) => {
        setColorTrapData(data?.data);
        console.log(data?.data);
        if (data?.data.length) {
          setScore(data?.data[0]?.score);
          previousStateRef.current = data?.data;
        }
      });
  };
  // console.log(score);
  useEffect(() => {
    if (colorTrapData?.length) {
      setTimeLeft(colorTrapData[0]?.remainingTime);
      setScore(colorTrapData[0]?.score);
    }
  }, [colorTrapData]);

  useEffect(() => {
    fetchFunction();
    return () => {
      // insertFunction();
    };
  }, []);

  const insertFunction = useCallback(() => {
    if (previousStateRef?.current?.length) {
      UpdateHooks(
        `${server_url}/colorTrap/updateColorTrap/${previousStateRef?.current[0]?._id}`,
        {
          date: date,
          time: time,
          score: scoreRef.current,
          remainingTime: timeRef.current,
        }
      );
    } else {
      PostHooks(
        `${server_url}/colorTrap/addColorTrap`,
        {
          gameName: "Color Trap Monocular",
          userId: userInfo?._id,
          userName: userInfo?.name,
          date: date,
          time: time,
          score: scoreRef.current,
          remainingTime: timeRef.current,
        },
        "Color Trap score updated !"
      );
    }
  }, [colorTrapData, timeLeft, scoreRef]);

  useEffect(() => {
    toggleFullScreen();
  }, []);

  // Function to move the object randomly on the screen
  const moveObjectRandomly = () => {
    const randomX = Math.random() * window.innerWidth;
    const randomY = Math.random() * window.innerHeight;
    setObjectPosition({ x: randomX, y: randomY });
    setCircleSize(100);
  };

  // Function to handle tapping the circle
  const handleTap = () => {
    if (gameStarted) {
      const proximity =
        Math.abs(objectPosition.x - window.innerWidth / 2) +
        Math.abs(objectPosition.y - window.innerHeight / 2);
      if (proximity <= 10) {
        setScore(score + 1);
        // Play the sound when the score increases
        const audio = new Audio(scoreIncreaseSound);
        audio.play();
      }

      // Decrease circle size gradually
      const circleDecreaseInterval = setInterval(() => {
        setCircleSize((size) => Math.max(size - 1, 0));
      }, 2);

      // Move the object randomly after a delay
      setTimeout(() => {
        clearInterval(circleDecreaseInterval);
        moveObjectRandomly();
      }, 50);
    }
  };
  const handleGameOver = () => {
    navigate(-1);
    toggleFullScreen();
  };

  // Function to start the game timer
  useEffect(() => {
    const interval = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft((prevTime) => prevTime - 1);
      } else {
        insertFunction();
        clearInterval(interval);
        setGameStarted(false);
        handleGameOver();
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [timeLeft]);

  // Use effect to handle game over conditions

  // useEffect(() => {
  //   if (gameStarted && timeLeft === 0) {
  //     setGameStarted(false);
  //     console.log("Game Over! Your score:", score);
  //   }
  // }, [gameStarted, score, timeLeft]);

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
        // Esc key and in full screen mode
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
  // Render the component

  console.log(score);
  // console.log(
  //   Math.floor(timeLeft / 60),
  //   ":",
  //   (timeLeft % 60).toString().padStart(2, "0")
  // );
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white inset-0 fixed text-black">
      <>
        <div
          className="relative w-12 h-12 bg-black cursor-pointer rounded-full"
          style={{
            position: "absolute",
            top: `${objectPosition.y}px`,
            left: `${objectPosition.x}px`,
            transition: "top 0.3s ease-out, left 0.3s ease-out", // Smooth movement transition
          }}
          onClick={handleTap}
        >
          <div
            className="absolute bg-transparent border-2 border-blue-600 rounded-full"
            style={{
              width: `${circleSize}px`,
              height: `${circleSize}px`,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              transition: "width 0.3s ease-out, height 0.3s ease-out",
            }}
          >
            <div
              className="w-1 h-1 bg-red-500 rounded-full"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                cursor: "pointer",
              }}
              onClick={() => setScore(score + 1)}
            ></div>
          </div>
        </div>
      </>
    </div>
  );
};

// Export the component
export default ColorTrap;
