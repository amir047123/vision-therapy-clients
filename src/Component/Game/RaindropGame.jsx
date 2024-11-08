import React, { useState, useEffect, useRef, useCallback } from "react";
import Sound from "../../Assets/final new sound/correct-2-46134.mp3";
import { useNavigate } from "react-router";
import AuthUser from "../../Hooks/authUser";
import moment from "moment";
import { server_url } from "../../Config/API";
import PostHooks from "../../Hooks/PostHooks";
import UpdateHooks from "../../Hooks/UpdateHooks";

const RaindropGame = () => {
  const [paddlePosition, setPaddlePosition] = useState(
    window.innerWidth / 2 - 40
  );
  const [raindrops, setRaindrops] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [soundPlayed, setSoundPlayed] = useState(false);
  const navigate = useNavigate();
  // Full screen event listener
  const [isFullScreen, setIsFullScreen] = useState(false);
  const paddleSpeed = 100;
  const raindropSpeed = 2;
  const raindropInterval = 2000;
  const paddleRef = useRef(null);

  const [timeLeft, setTimeLeft] = useState(300);
  const [score, setScore] = useState(0);
  const [rainDropData, setRainDropData] = useState([]);

  const { userInfo } = AuthUser();
  let date = moment().format("YYYY-MM-D");
  let time = moment().format("h:mm a");
  const previousStateRef = useRef(null);
  const scoreRef = useRef(null);
  const timeRef = useRef(null);
  scoreRef.current = score;
  timeRef.current = timeLeft;

  const fetchFunction = async () => {
    await fetch(
      `${server_url}/rainDrop/specific?fieldName=${"userId"}&&fieldValue=${userInfo?._id
      }&&fieldName2=${"date"}&&fieldValue2=${date}&&fieldName3=${"gameName"}&&fieldValue3=${"Rain Drop Monocular"}`
    )
      .then((res) => res.json())
      .then((data) => {
        setRainDropData(data?.data);
        console.log(data?.data);
        if (data?.data.length) {
          setScore(data?.data[0]?.score);
          previousStateRef.current = data?.data;
        }
      });
  };

  useEffect(() => {
    if (rainDropData?.length) {
      setTimeLeft(rainDropData[0]?.remainingTime);
      setScore(rainDropData[0]?.score);
    }
  }, [rainDropData]);

  useEffect(() => {
    fetchFunction();
    return () => {
      // insertFunction();
    };
  }, []);

  const insertFunction = useCallback(() => {
    if (previousStateRef?.current?.length) {
      UpdateHooks(
        `${server_url}/rainDrop/updateRainDrop/${previousStateRef?.current[0]?._id}`,
        {
          date: date,
          time: time,
          score: scoreRef.current,
          remainingTime: timeRef.current,
        }
      );
    } else {
      PostHooks(
        `${server_url}/rainDrop/addRainDrop`,
        {
          gameName: "Rain Drop Monocular",
          userId: userInfo?._id,
          userName: userInfo?.name,
          date: date,
          time: time,
          score: scoreRef.current,
          remainingTime: timeRef.current,
        },
        "RainDorp score updated !"
      );
    }
  }, [rainDropData, timeLeft, scoreRef]);

  useEffect(() => {
    toggleFullScreen();

    paddleRef.current = document.getElementById("paddle");
    const handleMouseMove = (event) => {
      // Update paddle position based on mouse movement
      const paddleWidth = paddleRef.current.offsetWidth;
      const newPaddleX = event.clientX - paddleWidth / 2; // Adjust for paddle width
      setPaddlePosition(newPaddleX);
    };

    // Add event listener for mouse movement
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      // Remove event listener when the component unmounts
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const createRaindrop = () => {
    const startX = Math.random() * (window.innerWidth - 10);
    const newRaindrop = {
      id: Date.now(),
      top: -10,
      left: startX,
    };

    setRaindrops((prevRaindrops) => [...prevRaindrops, newRaindrop]);
  };

  const animateRaindrops = () => {
    setRaindrops((prevRaindrops) =>
      prevRaindrops.map((raindrop) => ({
        ...raindrop,
        top: raindrop.top + raindropSpeed,
      }))
    );

    checkCollision();

    requestAnimationFrame(animateRaindrops);
  };

  const checkCollision = () => {
    const paddleRect = document
      ?.getElementById("paddle")
      ?.getBoundingClientRect();

    setRaindrops((prevRaindrops) => {
      return prevRaindrops.filter((raindrop) => {
        const raindropRect = {
          top: raindrop.top,
          bottom: raindrop.top + 10,
          left: raindrop.left,
          right: raindrop.left + 10,
        };

        if (
          raindropRect.bottom >= paddleRect.top &&
          raindropRect.top <= paddleRect.top &&
          raindropRect.left >= paddleRect.left &&
          raindropRect.right <= paddleRect.right
        ) {
          setScore((prevScore) => prevScore + 1);
          if (!soundPlayed) {
            playSound();
            setSoundPlayed(true);
          }
          return false;
        }

        return true;
      });
    });
  };

  const playSound = () => {
    const touchSound = new Audio(Sound);
    touchSound.play();
  };
  useEffect(() => {
    if (timeLeft <= 0) {
      console.log("Game over");
      insertFunction();
      navigate(-1);
      setGameOver(true);
    }
  }, [timeLeft]);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    setTimeout(() => {
      clearInterval(countdownInterval);
      setGameOver(true);
    }, timeLeft * 1000);

    const raindropCreationInterval = setInterval(
      createRaindrop,
      raindropInterval
    );

    animateRaindrops();

    return () => {
      clearInterval(countdownInterval);
      clearInterval(raindropCreationInterval);
    };
  }, [gameOver]);

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
        // exist btn
        // Esc key and in full screen mode
        await navigate(-1); // Navigate to the previous route
        toggleFullScreen();
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
      // console.log("return");
    };
  }, [isFullScreen, navigate]);

  return (
    <div>
      <div
        id="game-container"
        className="inset-0 fixed bg-white w-screen h-screen border-2 border-white overflow-hidden"
      >
        <div
          id="paddle"
          className="absolute w-40 h-4 bg-white z-50 bottom-8"
          style={{ left: `${paddlePosition}px` }}
        ></div>
        <div className="absolute w-full h-4 bg-black bottom-8"></div>
        {/* <div id="score-display" className="absolute top-10 left-10 text-black">
          Score: {score}
        </div> */}
        {raindrops.map((raindrop) => (
          <div
            key={raindrop.id}
            className="raindrop"
            style={{
              position: "absolute",
              width: "20px",
              height: "40px",
              backgroundColor: "black",
              borderRadius: "0%",
              left: `${raindrop.left}px`,
              top: `${raindrop.top}px`,
            }}
          ></div>
        ))}
        {gameOver && (
          <div
            id="game-over"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl text-red"
          >
            Game Over
          </div>
        )}
      </div>
    </div>
  );
};

export default RaindropGame;
