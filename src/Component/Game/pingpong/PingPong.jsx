import React, { useCallback, useEffect, useRef, useState } from "react";
import hitSound from "../../../Assets/final new sound/correct-2-46134.mp3";
import userHitSound from "../../../Assets/final new sound/correct-2-46134.mp3";
import computerHitSound from "../../../Assets/new pinpong sound/comScore.mp3.mp3";

import { useNavigate } from "react-router";
import AuthUser from "../../../Hooks/authUser";
import moment from "moment";
import { server_url } from "../../../Config/API";
import PostHooks from "../../../Hooks/PostHooks";
import UpdateHooks from "../../../Hooks/UpdateHooks";
const PingPong = () => {
  const [timeLeft, setTimeLeft] = useState(300);
  const [score, setScore] = useState(0);
  const [pingPongData, setPingPongData] = useState([]);
  const userHit = new Audio(userHitSound);
  const computerHit = new Audio(computerHitSound);

  const { userInfo } = AuthUser();
  let date = moment().format("YYYY-MM-D");
  let time = moment().format("h:mm a");
  const previousStateRef = useRef(null);
  const scoreRef = useRef(null);
  const timeRef = useRef(null);
  scoreRef.current = score;
  timeRef.current = timeLeft;

  const navigate = useNavigate();
  // Full screen event listener
  const [isFullScreen, setIsFullScreen] = useState(false);

  const fetchFunction = async () => {
    await fetch(
      `${server_url}/pingPong/specific?fieldName=${"userId"}&&fieldValue=${
        userInfo?._id
      }&&fieldName2=${"date"}&&fieldValue2=${date}&&fieldName3=${"gameName"}&&fieldValue3=${"PingPong Monocular"}`
    )
      .then((res) => res.json())
      .then((data) => {
        setPingPongData(data?.data);
        console.log(data?.data);
        if (data?.data.length) {
          // setTimeLeft(data?.data[0]?.remainingTime);
          // setTimeLeft(data?.data[0]?.score);
          setScore(data?.data[0]?.score);
          previousStateRef.current = data?.data;
        }
      });
  };

  useEffect(() => {
    if (pingPongData?.length) {
      setTimeLeft(pingPongData[0]?.remainingTime);
      setScore(pingPongData[0]?.score);
    }
  }, [pingPongData]);

  useEffect(() => {
    fetchFunction();
    return () => {
      // insertFunction();
    };
  }, []);

  const insertFunction = useCallback(() => {
    if (previousStateRef?.current?.length) {
      UpdateHooks(
        `${server_url}/pingPong/updatePingPong/${previousStateRef?.current[0]?._id}`,
        {
          date: date,
          time: time,
          score: scoreRef.current,
          remainingTime: timeRef.current,
        }
      );
    } else {
      PostHooks(
        `${server_url}/pingPong/addPingPong`,
        {
          gameName: "PingPong Monocular",
          userId: userInfo?._id,
          userName: userInfo?.name,
          date: date,
          time: time,
          score: scoreRef.current,
          remainingTime: timeRef.current,
        },
        "pin pong score updated !"
      );
    }
  }, [pingPongData, timeLeft, scoreRef]);

  console.log(score);
  console.log(timeLeft);

  useEffect(() => {
    if (timeLeft <= 0) {
      console.log("Game over");
      insertFunction();
      navigate(-1);
    }
  }, [timeLeft]);

  useEffect(() => {
    toggleFullScreen();
    // select canvas element
    const canvas = document.getElementById("pong");

    // getContext of canvas = methods and properties to draw and do a lot of thing to the canvas
    const ctx = canvas.getContext("2d");
    function game() {
      update();
      render();
      console.log("User Score:", user.score);
      console.log("COM Score:", com.score);
    }

    // load sounds
    let hit = new Audio(hitSound);

    // Adjust canvas dimensions to inner width and inner height
    function adjustCanvasDimensions() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    // Call adjustCanvasDimensions initially and whenever the window is resized
    adjustCanvasDimensions();
    window.addEventListener("resize", adjustCanvasDimensions);

    // Full screen when the game starts

    // Ball object
    const ball = {
      x: canvas.width / 2,
      y: canvas.height / 2,
      radius: 17,
      velocityX: 5,
      velocityY: 5,
      speed: 7,
      color: "WHITE",
    };

    // User Paddle
    const user = {
      x: 0, // left side of canvas
      y: (canvas.height - 100) / 2, // -100 the height of paddle
      width: 10,
      height: 100,
      score: 0,
      color: "WHITE",
    };

    // COM Paddle
    const com = {
      x: canvas.width - 10, // - width of paddle
      y: (canvas.height - 100) / 2, // -100 the height of paddle
      width: 10,
      height: 100,
      score: 0,
      color: "WHITE",
    };

    // NET
    const net = {
      x: (canvas.width - 2) / 2,
      y: 0,
      height: 10,
      width: 2,
      color: "WHITE",
    };

    // draw a rectangle, will be used to draw paddles
    function drawRect(x, y, w, h, color) {
      ctx.fillStyle = color;
      ctx.fillRect(x, y, w, h);
    }

    // draw circle, will be used to draw the ball
    function drawArc(x, y, r, color) {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.fill();
    }

    // listening to the mouse
    canvas.addEventListener("mousemove", getMousePos);

    function getMousePos(evt) {
      let rect = canvas.getBoundingClientRect();

      user.y = evt.clientY - rect.top - user.height / 2;
    }

    // when COM or USER scores, we reset the ball
    function resetBall() {
      ball.x = canvas.width / 2;
      ball.y = canvas.height / 2;
      ball.velocityX = -ball.velocityX;
      ball.speed = 7;
    }

    // draw the net
    function drawNet() {
      for (let i = 0; i <= canvas.height; i += 15) {
        drawRect(net.x, net.y + i, net.width, net.height, net.color);
      }
    }

    // draw text
    function drawText(text, x, y) {
      ctx.fillStyle = "#FFF";
      ctx.font = "75px fantasy";
      ctx.fillText(text, x, y);
    }

    // collision detection
    function collision(b, p) {
      p.top = p.y;
      p.bottom = p.y + p.height;
      p.left = p.x;
      p.right = p.x + p.width;

      b.top = b.y - b.radius;
      b.bottom = b.y + b.radius;
      b.left = b.x - b.radius;
      b.right = b.x + b.radius;

      const isUserPaddleCollision =
        p === user &&
        p.left < b.right &&
        p.top < b.bottom &&
        p.right > b.left &&
        p.bottom > b.top;

      const isComputerPaddleCollision =
        p === com &&
        p.left < b.right &&
        p.top < b.bottom &&
        p.right > b.left &&
        p.bottom > b.top;

      if (isUserPaddleCollision) {
        // Play the user's paddle hit sound effect
        userHit.play();
      } else if (isComputerPaddleCollision) {
        // Play the computer's paddle hit sound effect
        // computerHit.play();
      }

      return isUserPaddleCollision || isComputerPaddleCollision;
    }

    // update function, the function that does all calculations
    function update() {
      // change the score of players, if the ball goes to the left "ball.x<0" computer win, else if "ball.x > canvas.width" the user win
      if (ball.x - ball.radius < 0) {
        com.score++;
        setScore((prevCount) => prevCount + 1);
        // comScore.play();
        resetBall();
      } else if (ball.x + ball.radius > canvas.width) {
        user.score++;

        // userScore.play();
        resetBall();
      }

      // the ball has a velocity
      ball.x += ball.velocityX;
      ball.y += ball.velocityY;

      // computer plays for itself, and we must be able to beat it
      // simple AI
      com.y += (ball.y - (com.y + com.height / 2)) * 0.1;

      // when the ball collides with bottom and top walls we inverse the y velocity.
      if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
        ball.velocityY = -ball.velocityY;
        // wall.play();
      }

      // we check if the paddle hit the user or the com paddle
      let player = ball.x + ball.radius < canvas.width / 2 ? user : com;
      let playerHit = collision(ball, player);
      let comHit = collision(ball, com);
      // if the ball hits a paddle  use code -collision(ball, player)
      if (collision(ball, player)) {
        // play sound
        // hit.play();
        // console.log("hit");
        // we check where the ball hits the paddle
        let collidePoint = ball.y - (player.y + player.height / 2);
        // normalize the value of collidePoint, we need to get numbers between -1 and 1.
        // -player.height/2 < collide Point < player.height/2
        collidePoint = collidePoint / (player.height / 2);

        // when the ball hits the top of a paddle we want the ball, to take a -45degees angle
        // when the ball hits the center of the paddle we want the ball to take a 0degrees angle
        // when the ball hits the bottom of the paddle we want the ball to take a 45degrees
        // Math.PI/4 = 45degrees
        let angleRad = (Math.PI / 4) * collidePoint;

        // change the X and Y velocity direction
        let direction = ball.x + ball.radius < canvas.width / 2 ? 1 : -1;
        ball.velocityX = direction * ball.speed * Math.cos(angleRad);
        ball.velocityY = ball.speed * Math.sin(angleRad);

        // speed up the ball everytime a paddle hits it.
        ball.speed += 0.1;
      }
    }

    // render function, the function that does al the drawing
    function render() {
      // clear the canvas
      drawRect(0, 0, canvas.width, canvas.height, "#000");

      // draw the user score to the left
      // drawText(user.score, canvas.width / 4, canvas.height / 5);

      // draw the COM score to the right
      // drawText(com.score, (3 * canvas.width) / 4, canvas.height / 5);

      // draw the net
      // drawNet();

      // draw the user's paddle
      drawRect(user.x, user.y, user.width, user.height, user.color);

      // draw the COM's paddle
      drawRect(com.x, com.y, com.width, com.height, com.color);

      // draw the ball
      drawArc(ball.x, ball.y, ball.radius, ball.color);
    }

    // Adjust the number of frames per second to control the speed
    const framePerSecond = 100; // Adjust this value as needed
    let loop;

    const countdownInterval = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);
    const startGame = () => {
      loop = setInterval(game, 1000 / framePerSecond);
      const gameDuration = timeLeft * 1000; // Convert seconds to milliseconds
      setTimeout(() => {
        clearInterval(countdownInterval);
        clearInterval(loop); // Clear the interval to stop the game
      }, gameDuration);
    };

    startGame();

    return () => {
      clearInterval(countdownInterval);
      clearInterval(loop); // Clear the interval when the component unmounts
    };
  }, []);
  // Your game logic and canvas setup here

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
        await navigate(-1); // Navigate to the previous route
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
    <div className="fixed inset-0 bg-white">
      <canvas id="pong"></canvas>
    </div>
  );
};

export default PingPong;
