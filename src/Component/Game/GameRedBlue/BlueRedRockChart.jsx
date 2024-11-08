import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router";
import correctSound from "../../../Assets/final new sound/correct-2-46134.mp3"; // Import correct sound
import wrongSound from "../../../Assets/final new sound/invalid-selection-39351.mp3"; // Import wrong sound
import AuthUser from "../../../Hooks/authUser";
import moment from "moment";
import { server_url } from "../../../Config/API";
import UpdateHooks from "../../../Hooks/UpdateHooks";
import PostHooks from "../../../Hooks/PostHooks";
import { getUserHook } from "../../../Hooks/getUserHook";

const BlueRedRockChart = () => {
  const [targetLetters, setTargetLetters] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  // sound usestate

  const [currentColor, setCurrentColor] = useState("red"); // Initial color is red

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

  // red blue settings start
  const [user, setUser] = useState([]);
  const [blue, setBlue] = useState(100);
  const [red, setRed] = useState(100);

  useEffect(() => {
    getUserHook(userInfo?._id, setUser);
  }, []);

  useEffect(() => {
    setRed(user?.redOpacity);
    setBlue(user?.blueOpacity);
  }, [user]);
  // red blue settings end

  const fetchFunction = async () => {
    await fetch(
      `${server_url}/rockChart/specific?fieldName=${"userId"}&&fieldValue=${
        userInfo?._id
      }&&fieldName2=${"date"}&&fieldValue2=${date}&&fieldName3=${"gameName"}&&fieldValue3=${"Rock Chart Binocular"}`
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
          gameName: "Rock Chart Binocular",
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
    generateNewTargetLetters();
  }, [currentColor]); // Re-generate letters when color changes

  const generateNewTargetLetters = () => {
    const newTargetLetters = Array.from({ length: 4 }, () =>
      String.fromCharCode(65 + Math.floor(Math.random() * 26))
    );
    setTargetLetters(newTargetLetters);
    setCurrentIndex(0);
  };
  const handleKeyPress = (event) => {
    if (event.key === "Escape") {
      return; // Do nothing if the Esc key is pressed
    }

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
        setCurrentColor(currentColor === "red" ? "blue" : "red"); // Toggle color
      }
    } else {
      // Play wrong sound
      new Audio(wrongSound).play();
      setWrongSoundPlayed(true); // Set state to trigger useEffect to reset the sound played state
    }
  };
  useEffect(() => {
    toggleFullScreen();
  }, []);

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

  return (
    <div className="flex inset-0 fixed bg-black flex-col items-center justify-center h-screen ">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          background: "black",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          {targetLetters.map((letter, index) => (
            <div
              key={index}
              style={{
                width: "130px",
                height: "130px",
                borderRadius: "50%",
                background: "black",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "85px",
                color: currentColor,
                opacity: currentColor === "red" ? `${red}%` : `${blue}%`,
                border: `4px solid ${currentColor}`,
              }}
            >
              {letter === null ? "" : letter}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlueRedRockChart;
