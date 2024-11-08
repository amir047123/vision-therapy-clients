import moment from "moment";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import correctSound from "../../Assets/final new sound/correct-2-46134.mp3";
import incorrectSound from "../../Assets/final new sound/invalid-selection-39351.mp3";
import { server_url } from "../../Config/API";
import AuthUser from "../../Hooks/authUser";
import PostHooks from "../../Hooks/PostHooks";
import UpdateHooks from "../../Hooks/UpdateHooks";

function RapidMovement() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const [currentLetter, setCurrentLetter] = useState("");
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [score, setScore] = useState(0);
  const [gameActive, setGameActive] = useState(true);
  const [timeLeft, setTimeLeft] = useState(300);
  const navigate = useNavigate();
  // Full screen event listener
  const [isFullScreen, setIsFullScreen] = useState(false);
  const correctAudio = new Audio(correctSound);
  const incorrectAudio = new Audio(incorrectSound);

  const [rapidData, setRapidData] = useState([]);

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
      `${server_url}/rapidMovement/specific?fieldName=${"userId"}&&fieldValue=${
        userInfo?._id
      }&&fieldName2=${"date"}&&fieldValue2=${date}&&fieldName3=${"gameName"}&&fieldValue3=${"Rapid Movement Monocular"}`
    )
      .then((res) => res.json())
      .then((data) => {
        setRapidData(data?.data);
        console.log(data?.data);
        if (data?.data.length) {
          setScore(data?.data[0]?.score);
          previousStateRef.current = data?.data;
        }
      });
  };

  useEffect(() => {
    if (rapidData?.length) {
      setTimeLeft(rapidData[0]?.remainingTime);
      setScore(rapidData[0]?.score);
    }
  }, [rapidData]);

  useEffect(() => {
    fetchFunction();
    return () => {
      // insertFunction();
    };
  }, []);

  const insertFunction = useCallback(() => {
    if (previousStateRef?.current?.length) {
      UpdateHooks(
        `${server_url}/rapidMovement/updateRapidMovement/${previousStateRef?.current[0]?._id}`,
        {
          date: date,
          time: time,
          score: scoreRef.current,
          remainingTime: timeRef.current,
        }
      );
    } else {
      PostHooks(
        `${server_url}/rapidMovement/addRapidMovement`,
        {
          gameName: "Rapid Movement Monocular",
          userId: userInfo?._id,
          userName: userInfo?.name,
          date: date,
          time: time,
          score: scoreRef.current,
          remainingTime: timeRef.current,
        },
        "Rapid movement score updated !"
      );
    }
  }, [rapidData, timeLeft, scoreRef]);

  const getRandomPosition = () => {
    return {
      x: Math.random() * (window.innerWidth - 100),
      y: Math.random() * (window.innerHeight - 200),
    };
  };

  const generateRandomLetter = () => {
    return letters[Math.floor(Math.random() * letters.length)];
  };

  useEffect(() => {
    toggleFullScreen();
  }, []);

  const handleKeyPress = (event) => {
    if (gameActive) {
      const pressedKey = event.key.toUpperCase();
      if (pressedKey === currentLetter) {
        correctAudio.play();
        setScore((prevCount) => prevCount + 1);
        setCurrentLetter(generateRandomLetter());
        setPosition(getRandomPosition());
      } else {
        if (event.key !== "Escape") {
          // Check if the pressed key is not "Esc"
          incorrectAudio.play(false);
        }
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft((prevTime) => prevTime - 1);
      } else {
        insertFunction();
        clearInterval(interval);
        setGameActive(false);
        navigate(-1);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [timeLeft]);

  useEffect(() => {
    if (gameActive) {
      setCurrentLetter(generateRandomLetter());
      setPosition(getRandomPosition());
    }
  }, [gameActive]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [currentLetter, gameActive]);
  console.log(score);
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
        // Esc key and in full screen mode
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

  return (
    <div className="flex fixed inset-0 bg-white justify-center items-center h-screen">
      {/* <div className="text-4xl font-bold mb-4">Score: {timeLeft}</div> */}
      {gameActive && (
        <div
          className="text-6xl font-bold"
          style={{
            position: "absolute",
            left: `${position.x}px`,
            top: `${position.y}px`,
          }}
        >
          {currentLetter}
        </div>
      )}
    </div>
  );
}

export default RapidMovement;
