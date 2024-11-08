import "./MatchGabor.css";
import { useState, useEffect, useRef, useCallback } from "react";
import BlueCandy from "../../../Assets/Game/MatchGabor/BlueCandy.png";
import YellowCandy from "../../../Assets/Game/MatchGabor/YellowCandy.png";
import OrangeCandy from "../../../Assets/Game/MatchGabor/OrangeCandy.svg";
import PurpleCandy from "../../../Assets/Game/MatchGabor/PurpleCandy.png";
import GreenCandy from "../../../Assets/Game/MatchGabor/GreenCandy.png";
import RedCandy from "../../../Assets/Game/MatchGabor/RedCandy.png";
import blank from "../../../Assets/Game/candy/black.png";
import { useNavigate } from "react-router";
import AuthUser from "../../../Hooks/authUser";
import moment from "moment";
import { server_url } from "../../../Config/API";
import PostHooks from "../../../Hooks/PostHooks";
import UpdateHooks from "../../../Hooks/UpdateHooks";
// import ScoreBoard from "./components/ScoreBoard";
// import Footer from "./components/Footer";
const grid = 8;

const colors = [
  RedCandy,
  BlueCandy,
  GreenCandy,
  YellowCandy,
  OrangeCandy,
  PurpleCandy,
];

const MatchGabor = () => {
  //state for current board arrangements
  const [currentColorArrangement, setCurrentColorArrangement] = useState([]);
  const navigate = useNavigate();
  const [squareBeingDragged, setSquareBeingDragged] = useState(null);
  const [squareBeingReplaced, setSquareBeingReplaced] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [isGameOver, setIsGameOver] = useState(false);
  // Full screen event listener
  const [isFullScreen, setIsFullScreen] = useState(false);

  const [matchGaborData, setMatchGaborData] = useState([]);

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
      `${server_url}/matchGabor/specific?fieldName=${"userId"}&&fieldValue=${
        userInfo?._id
      }&&fieldName2=${"date"}&&fieldValue2=${date}`
    )
      .then((res) => res.json())
      .then((data) => {
        setMatchGaborData(data?.data);
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
    if (matchGaborData?.length) {
      setTimeLeft(matchGaborData[0]?.remainingTime);
      setScore(matchGaborData[0]?.score);
    }
  }, [matchGaborData]);

  useEffect(() => {
    fetchFunction();
    return () => {
      // insertFunction();
    };
  }, []);

  const insertFunction = useCallback(() => {
    if (previousStateRef?.current?.length) {
      UpdateHooks(
        `${server_url}/matchGabor/updateMatchGabor/${previousStateRef?.current[0]?._id}`,
        {
          date: date,
          time: time,
          score: scoreRef.current,
          remainingTime: timeRef.current,
        }
      );
    } else {
      PostHooks(
        `${server_url}/matchGabor/addMatchGabor`,
        {
          gameName: "Match Gabor Monocular",
          userId: userInfo?._id,
          userName: userInfo?.name,
          date: date,
          time: time,
          score: scoreRef.current,
          remainingTime: timeRef.current,
        },
        "Match Gabor score updated !"
      );
    }
  }, [matchGaborData, timeLeft, scoreRef]);

  // function for creating board
  const createBoard = () => {
    const randomColorArrangement = [];
    for (let i = 0; i < 64; i++) {
      let randomColor = colors[Math.floor(Math.random() * colors.length)];
      randomColorArrangement.push(randomColor);
    }
    setCurrentColorArrangement(randomColorArrangement);
  };
  useEffect(() => {
    toggleFullScreen();
  }, []);

  const checkForColumnOfFour = () => {
    for (let i = 0; i <= 39; i++) {
      const columnOfFour = [i, i + grid, i + grid * 2, i + grid * 3];
      const decidingColor = currentColorArrangement[i];

      if (
        columnOfFour.every(
          (square) => currentColorArrangement[square] === decidingColor
        )
      ) {
        columnOfFour.forEach((square) => {
          currentColorArrangement[square] = blank;
        });
        setScore(score + 4);
        return true;
      }
    }
  };
  const checkForColumnOfThree = () => {
    for (let i = 0; i <= 47; i++) {
      const columnOfThree = [i, i + grid, i + grid * 2];
      const decidedColor = currentColorArrangement[i];
      const isBlank = currentColorArrangement[i] === blank;

      if (
        columnOfThree.every(
          (square) =>
            currentColorArrangement[square] === decidedColor && !isBlank
        )
      ) {
        // setScoreDisplay((score) => score + 3);
        columnOfThree.forEach(
          (square) => (currentColorArrangement[square] = blank)
        );
        setScore(score + 3);
        return true;
      }
    }
  };

  const checkForRowOfThree = () => {
    for (let i = 0; i < grid * grid; i++) {
      const rowOfThree = [i, i + 1, i + 2];
      const decidingColor = currentColorArrangement[i];

      const notValid = [
        6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64,
      ];

      if (notValid.includes(i)) continue;

      if (
        rowOfThree.every(
          (square) => currentColorArrangement[square] === decidingColor
        )
      ) {
        rowOfThree.forEach((square) => {
          currentColorArrangement[square] = blank;
        });
        setScore(score + 3);
        return true;
      }
    }
  };
  const checkForRowOfFour = () => {
    for (let i = 0; i < grid * grid; i++) {
      const rowOfFour = [i, i + 1, i + 2];
      const decidingColor = currentColorArrangement[i];

      const notValid = [
        5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53,
        54, 55, 62, 63, 64,
      ];

      if (notValid.includes(i)) continue;

      if (
        rowOfFour.every(
          (square) => currentColorArrangement[square] === decidingColor
        )
      ) {
        rowOfFour.forEach((square) => {
          currentColorArrangement[square] = blank;
        });
        setScore(score + 4);
        return true;
      }
    }
  };

  const moveIntoSquareBelow = () => {
    for (let i = 0; i < 64 - grid; i++) {
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];

      const isFirstRow = firstRow.includes(i);

      if (isFirstRow && currentColorArrangement[i] === blank) {
        currentColorArrangement[i] =
          colors[Math.floor(Math.random() * colors.length)];
      }

      if (currentColorArrangement[i + grid] === blank) {
        currentColorArrangement[i + grid] = currentColorArrangement[i];
        currentColorArrangement[i] = blank;
      }
    }
  };

  const dragStart = (e) => {
    // console.log("Drag START");

    setSquareBeingDragged(e.target);
  };
  const dragDrop = (e) => {
    e.preventDefault();

    setSquareBeingReplaced(e.target);
  };
  const dragEnd = () => {
    const squareBeingDraggedId = parseInt(
      squareBeingDragged.getAttribute("data-id")
    );
    const squareBeingReplacedId = parseInt(
      squareBeingReplaced.getAttribute("data-id")
    );

    currentColorArrangement[squareBeingReplacedId] =
      squareBeingDragged.getAttribute("src");
    currentColorArrangement[squareBeingDraggedId] =
      squareBeingReplaced.getAttribute("src");

    const validMoves = [
      squareBeingDraggedId - 1,
      squareBeingDraggedId - grid,
      squareBeingDraggedId + 1,
      squareBeingDraggedId + grid,
    ];

    const validMove = validMoves.includes(squareBeingReplacedId);
    if (validMove) {
      const isAColumnOfFour = checkForColumnOfFour();
      const isARowOfFour = checkForRowOfFour();
      const isAColumnOfThree = checkForColumnOfThree();
      const isARowOfThree = checkForRowOfThree();
      if (
        squareBeingReplacedId &&
        validMove &&
        (isARowOfThree || isARowOfFour || isAColumnOfFour || isAColumnOfThree)
      ) {
        setSquareBeingDragged(null);
        setSquareBeingReplaced(null);
      } else {
        currentColorArrangement[squareBeingReplacedId] =
          squareBeingReplaced.getAttribute("src");
        currentColorArrangement[squareBeingDraggedId] =
          squareBeingDragged.getAttribute("src");
        setCurrentColorArrangement([...currentColorArrangement]);
      }
    } else {
      currentColorArrangement[squareBeingReplacedId] =
        squareBeingReplaced.getAttribute("src");
      currentColorArrangement[squareBeingDraggedId] =
        squareBeingDragged.getAttribute("src");
      setCurrentColorArrangement([...currentColorArrangement]);
    }
  };

  // create the board when app loaded.
  useEffect(() => {
    createBoard();
  }, []);

  useEffect(() => {
    if (!isGameOver) {
      // Countdown timer
      const countdownInterval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      // End the game after 5 minutes (300 seconds)
      setTimeout(() => {
        clearInterval(countdownInterval);
        setIsGameOver(true);
        // alert("game over");
      }, timeLeft * 1000); // Change this value to set the game duration

      return () => {
        clearInterval(countdownInterval);
      };
    }
  }, [isGameOver]);

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsGameOver(true);
      return;
    }

    const timer = setInterval(() => {
      checkForColumnOfFour();
      checkForColumnOfThree();
      checkForRowOfFour();
      checkForRowOfThree();
      moveIntoSquareBelow();
      setCurrentColorArrangement([...currentColorArrangement]);
    }, 100);

    return () => {
      clearInterval(timer);
    };
  }, [
    checkForColumnOfThree,
    checkForColumnOfFour,
    checkForRowOfThree,
    checkForRowOfFour,
    moveIntoSquareBelow,
    currentColorArrangement,
    timeLeft,
  ]);

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
    if (timeLeft <= 0) {
      console.log("Game over");
      insertFunction();
      navigate(-1);
      setIsGameOver(true);
    }
  }, [timeLeft]);

  useEffect(() => {
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
  return (
    <div className="min-h-screen inset-0 fixed bg-white flex items-center justify-center">
      <div className="  w-full bg-[#7F7F7F] grid  grid-cols-8 gap-0">
        {currentColorArrangement.map((currentColor, index) => (
          <img
            className="rotate opacity-full"
            src={currentColor}
            key={index}
            draggable={true}
            data-id={index}
            onDragStart={dragStart}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => e.preventDefault()}
            onDragLeave={(e) => e.preventDefault()}
            onDrop={dragDrop}
            onDragEnd={dragEnd}
          />
        ))}
      </div>
    </div>
  );
};
export default MatchGabor;
