import React, { useState, useEffect, useRef, useCallback } from "react";
import correctSound from "../../Assets/final new sound/correct-2-46134.mp3";
import wrongSound from "../../Assets/final new sound/invalid-selection-39351.mp3";
import { useNavigate } from "react-router";
import AuthUser from "../../Hooks/authUser";
import moment from "moment";
import { server_url } from "../../Config/API";
import PostHooks from "../../Hooks/PostHooks";
import UpdateHooks from "../../Hooks/UpdateHooks";

const SearchQuest = () => {
  const [tableData, setTableData] = useState([]);
  const [suggestion, setSuggestion] = useState("");
  const correctAudio = new Audio(correctSound);
  const wrongAudio = new Audio(wrongSound);
  const navigate = useNavigate();
  // Full screen event listener
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [suggestionClicks, setSuggestionClicks] = useState(0); // Counter for
  const suggestionRef = useRef(null);
  suggestionRef.current = suggestion;

  const [timeLeft, setTimeLeft] = useState(300);
  const [score, setScore] = useState(0);
  const [searchQuestData, setSearchQuestData] = useState([]);

  const { userInfo } = AuthUser();
  let date = moment().format("YYYY-MM-D");
  let time = moment().format("h:mm a");
  const previousStateRef = useRef(null);
  const scoreRef = useRef(null);
  const timeRef = useRef(null);
  scoreRef.current = score;
  timeRef.current = timeLeft;
  const usedCharacters = new Set();

  const generateRandomData = () => {
    const characters =
      "!?:;-.+-×÷=><€£¥₹$₿0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    // Filter out characters that have already been used
    const availableCharacters = characters.split("").filter(char => !usedCharacters.has(char));

    if (availableCharacters.length === 0) {
      // All characters have been used, reset the set
      usedCharacters.clear();
    }

    const randomIndex = Math.floor(Math.random() * availableCharacters.length);
    const randomCharacter = availableCharacters[randomIndex];

    // Add the selected character to the used set
    usedCharacters.add(randomCharacter);

    return randomCharacter;
  };

  // Function to handle suggestion generation
  const generateSuggestion = () => {
    const randomIndex = Math.floor(Math.random() * tableData.length);
    setSuggestion(tableData[randomIndex]);
  };

  const fetchFunction = async () => {
    await fetch(
      `${server_url}/searchQuest/specific?fieldName=${"userId"}&&fieldValue=${
        userInfo?._id
      }&&fieldName2=${"date"}&&fieldValue2=${date}&&fieldName3=${"gameName"}&&fieldValue3=${"Search Quest Monocular"}`
    )
      .then((res) => res.json())
      .then((data) => {
        setSearchQuestData(data?.data);
        console.log(data?.data);
        if (data?.data.length) {
          setScore(data?.data[0]?.score);
          previousStateRef.current = data?.data;
        }
      });
  };
  // console.log(score);
  useEffect(() => {
    if (searchQuestData?.length) {
      setTimeLeft(searchQuestData[0]?.remainingTime);
      setScore(searchQuestData[0]?.score);
    }
  }, [searchQuestData]);

  useEffect(() => {
    fetchFunction();
    return () => {
      // insertFunction();
    };
  }, []);

  const insertFunction = useCallback(() => {
    if (previousStateRef?.current?.length) {
      UpdateHooks(
        `${server_url}/searchQuest/updateSearchQuest/${previousStateRef?.current[0]?._id}`,
        {
          date: date,
          time: time,
          score: scoreRef.current,
          remainingTime: timeRef.current,
        }
      );
    } else {
      PostHooks(
        `${server_url}/searchQuest/addSearchQuest`,
        {
          gameName: "Search Quest Monocular",
          userId: userInfo?._id,
          userName: userInfo?.name,
          date: date,
          time: time,
          score: scoreRef.current,
          remainingTime: timeRef.current,
        },
        "searchQuest  score updated !"
      );
    }
  }, [searchQuestData, timeLeft, scoreRef]);

  // Function to handle cell click
  const handleCellClick = (rowData) => {
    generateSuggestion();
    if (rowData === suggestionRef.current) {
      // Update score and suggestion clicks
      setScore((prevScore) => prevScore + 1);
      setSuggestionClicks((prevClicks) => prevClicks + 1);

      // Play correct audio
      correctAudio.play();

      // If suggestion clicked three times, reset the game
      if (suggestionClicks >= 2) {
        resetGame();
      } else {
        // Remove clicked data and insert new data randomly
        const updatedTableData = [...tableData];

        updatedTableData.splice(updatedTableData.indexOf(rowData), 1);
        setTableData(updatedTableData);
        insertRandomData();
      }
    } else {
      // Play wrong audio
      wrongAudio.play();
    }
  };

  // Function to insert new random data
  const insertRandomData = () => {
    const newData = generateRandomData();
    setTableData((prevTableData) => [...prevTableData, newData]);
  };

  // Function to reset the game
  const resetGame = () => {
    usedCharacters.clear();

    const initialTableData = [];
    for (let i = 0; i < 48; i++) {
      initialTableData.push(generateRandomData());
    }
    setTableData(initialTableData);
    generateSuggestion();
    setSuggestionClicks(0);
  };

  const handleGameOver = () => {
    navigate(-1);
    toggleFullScreen();
  };

  // Countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft((prevTime) => prevTime - 1);
      } else {
        insertFunction();
        clearInterval(interval);
        handleGameOver();
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [timeLeft]);

  // Initial setup on component mount
  useEffect(() => {
    const initialTableData = [];

    for (let i = 0; i < 48; i++) {
      initialTableData.push(generateRandomData());
    }
    setTableData(initialTableData);
    generateSuggestion();
  }, []);

  useEffect(() => {
    toggleFullScreen();
  }, []);

  useEffect(() => {
    generateSuggestion();
  }, [tableData]);

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
      // const pressedKey = event.key.toUpperCase();

      if (event.keyCode === 27 && isFullScreen) {
        insertFunction();
        // Esc key and in full screen mode
        await navigate(-1); // Navigate to the previous route
        toggleFullScreen();
        // console.log("isFull");
      }

      if (event?.keyCode === 16 || event?.keyCode === 27) {
        return;
      }
      // handleCellClick(pressedKey);
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
      // console.log("return");
    };
  }, [isFullScreen, navigate]);

  return (
    <div
      className={`flex items-center justify-center inset-0 fixed bg-white ${
        isFullScreen ? "h-screen" : "min-h-screen"
      } bg-gray-100`}
    >
      <div
        className={`w-full ${
          isFullScreen ? "max-h-screen" : "max-w-screen-lg"
        } bg-white rounded-lg  p-6`}
      >
        <div className="grid grid-cols-12 text-[70px]  gap-5 justify-around">
          {tableData.map((rowData, index) => (
            <div
              key={index}
              className="px-4 py-2   cursor-pointer"
              onClick={() => handleCellClick(rowData)}
            >
              {rowData}
            </div>
          ))}
        </div>

        <div className="border-t-4 border-black w-full flex justify-between items-center">
          <h1 className="text-[70px] font-sans italic">
            Search: <span className="text-black text-[70px]">{suggestion}</span>
          </h1>
          <div>
            <h2 className="text-5xl font-semibold font-sans italic">
              Time Left:{" "}
              <span className="text-black">
                {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? "0" : ""}
                {timeLeft % 60}
              </span>
            </h2>
            <h2 className="text-5xl font-semibold font-sans italic">
              Score: <span className="text-black">{score}</span>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchQuest;
