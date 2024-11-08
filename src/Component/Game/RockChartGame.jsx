import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router";
import correctSound from "../../Assets/final new sound/correct-2-46134.mp3"; // Import correct sound
import wrongSound from "../../Assets/final new sound/invalid-selection-39351.mp3"; // Import wrong sound
import AuthUser from "../../Hooks/authUser";
import moment from "moment";
import { server_url } from "../../Config/API";
import UpdateHooks from "../../Hooks/UpdateHooks";
import PostHooks from "../../Hooks/PostHooks";

const CircleTypingGame = () => {
  const [targetLetters, setTargetLetters] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  // sound usestate

  const [correctSoundPlayed, setCorrectSoundPlayed] = useState(false);
  const [wrongSoundPlayed, setWrongSoundPlayed] = useState(false);
  const navigate = useNavigate();
  // Full screen event listener
  const [isFullScreen, setIsFullScreen] = useState(false);

  const [timeLeft, setTimeLeft] = useState(300);
  const [score, setScore] = useState(0);
  const [rockChartData, setRockChartData] = useState([]);

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
      `${server_url}/rockChart/specific?fieldName=${"userId"}&&fieldValue=${
        userInfo?._id
      }&&fieldName2=${"date"}&&fieldValue2=${date}&&fieldName3=${"gameName"}&&fieldValue3=${"Rock Chart Monocular"}`
    )
      .then((res) => res.json())
      .then((data) => {
        setRockChartData(data?.data);
        console.log(data?.data);
        if (data?.data.length) {
          setScore(data?.data[0]?.score);
          previousStateRef.current = data?.data;
        }
      });
  };
  // console.log(score);
  useEffect(() => {
    if (rockChartData?.length) {
      setTimeLeft(rockChartData[0]?.remainingTime);
      setScore(rockChartData[0]?.score);
    }
  }, [rockChartData]);

  useEffect(() => {
    fetchFunction();
    return () => {
      // insertFunction();
    };
  }, []);

  const insertFunction = useCallback(() => {
    if (previousStateRef?.current?.length) {
      UpdateHooks(
        `${server_url}/rockChart/updateRockChart/${previousStateRef?.current[0]?._id}`,
        {
          date: date,
          time: time,
          score: scoreRef.current,
          remainingTime: timeRef.current,
        }
      );
    } else {
      PostHooks(
        `${server_url}/rockChart/addRockChart`,
        {
          gameName: "Rock Chart Monocular",
          userId: userInfo?._id,
          userName: userInfo?.name,
          date: date,
          time: time,
          score: scoreRef.current,
          remainingTime: timeRef.current,
        },
        "rock chart score updated !"
      );
    }
  }, [rockChartData, timeLeft, scoreRef]);

  useEffect(() => {
    toggleFullScreen();
    generateNewTargetLetters();
  }, []);

  const generateNewTargetLetters = () => {
    const newTargetLetters = Array.from({ length: 4 }, () =>
      String.fromCharCode(65 + Math.floor(Math.random() * 26))
    );
    setTargetLetters(newTargetLetters);
    setCurrentIndex(0); // Reset current index when new target letters are generated
  };

  const handleKeyPress = (event) => {
    const typedKey = event.key.toUpperCase();
    const currentTarget = targetLetters[currentIndex];

    if (typedKey === currentTarget) {
      const newTargetLetters = [...targetLetters];
      newTargetLetters[currentIndex] = null;
      setTargetLetters(newTargetLetters);
      setScore((prevScore) => prevScore + 1);

      // Play correct sound
      new Audio(correctSound).play();

      setCorrectSoundPlayed(true); // Set state to trigger useEffect to reset the sound played state
      if (currentIndex < 3) {
        setCurrentIndex(currentIndex + 1);
      } else {
        generateNewTargetLetters();
      }
    } else if (event.key !== "Escape") {
      // Check if the key is not Esc
      // Play wrong sound for all keys except Esc
      new Audio(wrongSound).play();
      setWrongSoundPlayed(true); // Set state to trigger useEffect to reset the sound played state
    }
  };

  // Reset the sound played states when appropriate
  useEffect(() => {
    if (correctSoundPlayed) {
      setCorrectSoundPlayed(false);
    }
    if (wrongSoundPlayed) {
      setWrongSoundPlayed(false);
    }
  }, [correctSoundPlayed, wrongSoundPlayed]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [currentIndex, targetLetters]);

  // Countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft((prevTime) => prevTime - 1);
      } else {
        insertFunction();
        navigate(-1); // Navigate to the previous route
        toggleFullScreen();
        clearInterval(interval);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [timeLeft]);

  useEffect(() => {
    if (timeLeft % 60 === 0) {
      const currentMinuteScore = score - (timeLeft === 300 ? 0 : score);
      console.log(
        `Score for minute ${5 - timeLeft / 60}: ${currentMinuteScore}`
      );
    }
  }, [timeLeft, score]);

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
  const [escapeKeyClicked, setEscapeKeyClicked] = useState(false);

  useEffect(() => {
    const handleKeyPress = async (event) => {
      if (event.key === "Escape") {
        insertFunction();
        // Esc key and in full screen mode
        await navigate(-1); // Navigate to the previous route
        toggleFullScreen();
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [navigate]);

  useEffect(() => {
    if (escapeKeyClicked) {
      // Handle the Esc key press here, e.g., go back to the previous route
      navigate(-1); // Navigate to the previous route
      setEscapeKeyClicked(false); // Reset the state
    }
  }, [escapeKeyClicked, navigate]);

  return (
    <div className="flex inset-0 fixed bg-white flex-col items-center justify-center h-screen ">
      {/* <div className="text-4xl font-bold mb-4">Circle Typing</div> */}
      {/* <div className="text-2xl mb-2">
        Type the correct letter for each circle in sequence.
      </div> */}
      <div className="flex justify-center space-x-4">
        {targetLetters.map((letter, index) => (
          <div
            key={index}
            className={` w-28 h-28 rounded-full bg-black flex items-center justify-center text-white text-[85px] ${
              letter === null ? "bg-gray-300 " : ""
            }`}
          >
            {letter === null ? "" : letter}
          </div>
        ))}
      </div>
      {/* <div className="text-xl mt-4">
        Time Left: {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? "0" : ""}
        {timeLeft % 60}
      </div> */}
      {/* <div className="text-xl mt-2">Score: {score}</div> */}
    </div>
  );
};

export default CircleTypingGame;
