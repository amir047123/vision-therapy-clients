import React, { useState, useEffect } from "react";
import CorrectChoice from "../../Assets/final new sound/correct-2-46134.mp3";
import incorrectSound from "../../Assets/final new sound/invalid-selection-39351.mp3";
import moment from "moment";
import { server_url } from "../../Config/API";
import AuthUser from "../../Hooks/authUser";
import PostHooks from "../../Hooks/PostHooks";
import UpdateHooks from "../../Hooks/UpdateHooks";
import { useNavigate } from "react-router";
import { useCallback } from "react";
import { useRef } from "react";

function SmoothMovement() {
  const [movingLetter, setMovingLetter] = useState(generateRandomLetter());
  const navigate = useNavigate();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [xDirection, setXDirection] = useState(1);
  const [yDirection, setYDirection] = useState(1);
  const [gameActive, setGameActive] = useState(true);
  const [timeLeft, setTimeLeft] = useState(300);
  const [score, setScore] = useState(0);
  const [smoothData, setSmoothData] = useState([]);

  const { userInfo } = AuthUser();
  let date = moment().format("YYYY-MM-D");
  let time = moment().format("h:mm a");
  const previousStateRef = useRef(null);
  const scoreRef = useRef(null);
  const timeRef = useRef(null);
  scoreRef.current = score;
  timeRef.current = timeLeft;
  // let time = moment().format("LT");
  // console.log(dayGridDate);
  // console.log(time);
  // Function to enter fullscreen mode
  console.log(userInfo?._id);
  const fetchFunction = async () => {
    await fetch(
      `${server_url}/smoothMovement/specific?fieldName=${"userId"}&&fieldValue=${
        userInfo?._id
      }&&fieldName2=${"date"}&&fieldValue2=${date}&&fieldName3=${"gameName"}&&fieldValue3=${"Smooth Movement Monocular"}`
    )
      .then((res) => res.json())
      .then((data) => {
        setSmoothData(data?.data);
        console.log(data?.data);
        if (data?.data.length) {
          // setTimeLeft(data?.data[0]?.remainingTime);
          // setTimeLeft(data?.data[0]?.score);
          setScore(data?.data[0]?.score);
          previousStateRef.current = data?.data;
        }
      });
  };
  // console.log(score);
  useEffect(() => {
    if (smoothData?.length) {
      setTimeLeft(smoothData[0]?.remainingTime);
      setScore(smoothData[0]?.score);
    }
  }, [smoothData]);

  useEffect(() => {
    fetchFunction();
    return () => {
      // insertFunction();
    };
  }, []);

  const insertFunction = useCallback(() => {
    if (previousStateRef?.current?.length) {
      UpdateHooks(
        `${server_url}/smoothMovement/updateSmoothMovement/${previousStateRef?.current[0]?._id}`,
        {
          date: date,
          time: time,
          score: scoreRef.current,
          remainingTime: timeRef.current,
        }
      );
    } else {
      PostHooks(
        `${server_url}/smoothMovement/addSmoothMovement`,
        {
          gameName: "Smooth Movement Monocular",
          userId: userInfo?._id,
          userName: userInfo?.name,
          date: date,
          time: time,
          score: scoreRef.current,
          remainingTime: timeRef.current,
        },
        "Smooth movement score updated !"
      );
    }
  }, [smoothData, timeLeft, scoreRef]);

  const enterFullscreen = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen().catch((error) => {
        console.error("Error entering full screen:", error);
      });
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen().catch((error) => {
        console.error("Error entering full screen:", error);
      });
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen().catch((error) => {
        console.error("Error entering full screen:", error);
      });
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen().catch((error) => {
        console.error("Error entering full screen:", error);
      });
    }
  };

  useEffect(() => {
    enterFullscreen();
    const handleEscKey = (event) => {
      if (event.keyCode === 27) {
        insertFunction();
        window.history.back();
      }
    };

    document.addEventListener("keydown", handleEscKey);

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, []);

  // Generate a random letter
  function generateRandomLetter() {
    const randomIndex = Math.floor(Math.random() * 26);
    return String.fromCharCode(65 + randomIndex);
  }

  useEffect(() => {
    if (gameActive) {
      // Move the letter smoothly
      const moveInterval = setInterval(() => {
        setPosition((prevPosition) => {
          const newX = prevPosition.x + xDirection * 2;
          const newY = prevPosition.y + yDirection * 2;

          // Reverse direction if hitting screen edges
          if (newX <= 0 || newX >= window.innerWidth) {
            setXDirection(-xDirection);
          }

          if (newY <= 0 || newY >= window.innerHeight) {
            setYDirection(-yDirection);
          }

          return { x: newX, y: newY };
        });
      }, 30); // Change this value to control the speed of movement (lower value = faster movement)

      return () => clearInterval(moveInterval);
    }
  }, [xDirection, yDirection, gameActive]);

  // Handle clicking the letter
  const handleLetterClick = () => {
    updateLetter();
  };

  useEffect(() => {
    // Add event listener for keydown
    document.addEventListener("keydown", handleKeyDown);

    // Remove event listener on component unmount
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Handle pressing keyboard keys
  const handleKeyDown = (event) => {
    if (gameActive && event.keyCode >= 65 && event.keyCode <= 90) {
      event.preventDefault(); // Prevent default action of the pressed key
    }
  };

  // Update the moving letter
  const updateLetter = () => {
    // Play a sound when the letter changes
    const audio = new Audio(CorrectChoice);
    audio.play();

    // Generate a new random letter
    setMovingLetter(generateRandomLetter());
  };

  // console.log(score);
  const handleKeyPress = (event) => {
    const audio = new Audio(CorrectChoice);
    const incorrectAudio = new Audio(incorrectSound);

    if (gameActive) {
      const pressedKey = event.key.toUpperCase();
      if (pressedKey === movingLetter) {
        console.log(smoothData);
        audio.play();
        setScore((prevCount) => prevCount + 1);
        setMovingLetter(generateRandomLetter());
      } else {
        if (event.keyCode === 27) {
        } else {
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
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [movingLetter, gameActive]);

  const textStyle = {
    fontSize: "85px", // Change the font size to your desired value, e.g., "48px"
  };

  return (
    <div className="flex fixed inset-0 bg-white items-center justify-center min-h-screen">
      {gameActive && (
        <div
          className="absolute text-2xl cursor-pointer transition-transform duration-500"
          style={{
            left: position.x + "px",
            top: position.y + "px",
            ...textStyle,
          }}
          // onClick={handleLetterClick}
        >
          {movingLetter}
        </div>
      )}
      <div className="absolute top-0 right-0 p-4 text-white text-xl">
        Time left: {timeLeft} seconds
      </div>
    </div>
  );
}

export default SmoothMovement;
