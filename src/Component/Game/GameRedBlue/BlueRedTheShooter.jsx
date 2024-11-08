import React, { useState, useEffect, useRef, useCallback } from "react";
import hitSound from "../../../Assets/final new sound/correct-2-46134.mp3"; // Replace with the correct path to the hit sound
import { useNavigate } from "react-router";
import AuthUser from "../../../Hooks/authUser";
import moment from "moment";
import PostHooks from "../../../Hooks/PostHooks";
import { server_url } from "../../../Config/API";
import UpdateHooks from "../../../Hooks/UpdateHooks";
import { getUserHook } from "../../../Hooks/getUserHook";

const BlueRedTheShooter = () => {
  const canvasRef = useRef(null);
  const cRef = useRef(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300);
  const [bulletHitEnemy, setBulletHitEnemy] = useState(false);
  const [isHitSoundPlayed, setIsHitSoundPlayed] = useState(false);

  const navigate = useNavigate();
  const [isFullScreen, setIsFullScreen] = useState(false);

  const [theShooter, setTheShooter] = useState([]);
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
  const blueRef = useRef(null);
  const redRef = useRef(null);
  redRef.current = red;
  blueRef.current = blue;

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
      `${server_url}/theShooter/specific?fieldName=${"userId"}&&fieldValue=${
        userInfo?._id
      }&&fieldName2=${"date"}&&fieldValue2=${date}&&fieldName3=${"gameName"}&&fieldValue3=${"The Shooter Binocular"}`
    )
      .then((res) => res.json())
      .then((data) => {
        setTheShooter(data?.data);
        console.log(data?.data);
        if (data?.data.length) {
          setScore(data?.data[0]?.score);
          previousStateRef.current = data?.data;
        }
      });
  };

  useEffect(() => {
    if (theShooter?.length) {
      setTimeLeft(theShooter[0]?.remainingTime);
      setScore(theShooter[0]?.score);
    }
  }, [theShooter]);

  useEffect(() => {
    fetchFunction();
    return () => {
      // insertFunction();
    };
  }, []);

  // console.log(`rgba(0, 0, 255, ${+redRef.current / 100})`);

  const insertFunction = useCallback(() => {
    if (previousStateRef?.current?.length) {
      UpdateHooks(
        `${server_url}/theShooter/updateTheShooter/${previousStateRef?.current[0]?._id}`,
        {
          date: date,
          time: time,
          score: scoreRef.current,
          remainingTime: timeRef.current,
        }
      );
    } else {
      PostHooks(
        `${server_url}/theShooter/addTheShooter`,
        {
          gameName: "The Shooter Binocular",
          userId: userInfo?._id,
          userName: userInfo?.name,
          date: date,
          time: time,
          score: scoreRef.current,
          remainingTime: timeRef.current,
        },
        "The Shooter score updated !"
      );
    }
  }, [theShooter, timeLeft, scoreRef]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft((prevTime) => prevTime - 1);
      } else {
        insertFunction();
        clearInterval(interval);
        setGameOver(true);
        navigate(-1);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [timeLeft]);

  useEffect(() => {
    toggleFullScreen();
    const canvas = canvasRef.current;
    const c = canvas.getContext("2d");
    cRef.current = c;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const x = canvas.width / 2;
    const y = canvas.height / 2;
    const playerRadius = 25;
    const projectileRadius = 10;
    const enemyRadius = 20;

    class Player {
      constructor(x, y) {
        this.x = x;
        this.y = y;
      }
      draw() {
        // c.save();
        c.beginPath();
        c.arc(this.x, this.y, playerRadius, 0, Math.PI * 2, false);
        c.fillStyle = "yellow";
        c.fill();
        // c.globalAlpha = 1.0;
        // c.restore();
      }
    }

    class Projectile {
      constructor(x, y, velocity, projectileRadius) {
        this.x = x;
        this.y = y;
        this.radius = projectileRadius || 10; // Default size of 10 if none provided
        this.velocity = velocity;
      }

      draw() {
        // c.save();
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = "yellow";
        c.fill();
        // c.globalAlpha = 1.0;
        // c.restore();
      }

      update() {
        this.draw();
        this.x += this.velocity.x;
        this.y += this.velocity.y;
      }

      increaseSize() {
        this.radius += 15; // Adjust this value as desired for the projectile
      }

      decreaseSize() {
        this.radius -= 3; // Make sure to check that radius doesn't go negative
        if (this.radius < 0) this.radius = 0;
      }
    }
    let projectile = new Projectile(100, 100, { x: 1, y: 1 }, 20);
    projectile.increaseSize();
    projectile.decreaseSize();
    class Enemy {
      constructor(x, y, velocity) {
        this.x = x;
        this.y = y;
        this.radius = enemyRadius;
        this.velocity = velocity;

        this.color =
          Math.random() < 0.5
            ? `rgba(255, 0, 0, ${redRef.current / 100})`
            : `rgba(0, 0, 255, ${blueRef.current / 100})`; // Random color
      }
      draw() {
        c.beginPath();
        c.arc(this.x, this.y, enemyRadius, 0, Math.PI * 2, false);
        c.fillStyle = this.color; // Use the randomly chosen color
        c.fill();
      }

      update() {
        this.draw();
        this.x += this.velocity.x;
        this.y += this.velocity.y;
      }

      increaseSize() {
        this.radius += 10; // You can adjust this value as desired
      }

      decreaseSize() {
        this.radius -= 5; // Make sure to check that radius doesn't go negative
        if (this.radius < 0) this.radius = 0;
      }
    }

    const player = new Player(x, y);
    const projectiles = [];
    const enemies = [];

    function spawnEnemies() {
      setInterval(() => {
        const radius = enemyRadius;
        let x, y;
        if (Math.random() < 0.5) {
          x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;
          y = Math.random() * canvas.height;
        } else {
          x = Math.random() * canvas.width;
          y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;
        }
        const angle = Math.atan2(player.y - y, player.x - x);
        const speed = 1.5;
        const velocity = {
          x: Math.cos(angle) * speed,
          y: Math.sin(angle) * speed,
        };
        enemies.push(new Enemy(x, y, velocity));
      }, 1500);
    }

    function animate() {
      if (!gameOver) {
        requestAnimationFrame(animate);
        c.clearRect(0, 0, canvas.width, canvas.height);
        player.draw();
        projectiles.forEach((projectile, projectileIndex) => {
          projectile.update();
          if (
            projectile.x + projectileRadius < 0 ||
            projectile.x - projectileRadius > canvas.width ||
            projectile.y + projectileRadius < 0 ||
            projectile.y - projectileRadius > canvas.height
          ) {
            projectiles.splice(projectileIndex, 1);
          }
        });

        enemies.forEach((enemy, enemyIndex) => {
          enemy.update();
          const distance = Math.hypot(player.x - enemy.x, player.y - enemy.y);
          if (distance - enemyRadius - playerRadius < 1) {
            setGameOver(true);
          }
          projectiles.forEach((projectile, projectileIndex) => {
            const distance = Math.hypot(
              projectile.x - enemy.x,
              projectile.y - enemy.y
            );
            if (distance - enemyRadius - projectileRadius < 1) {
              enemies.splice(enemyIndex, 1);
              projectiles.splice(projectileIndex, 1);
              setBulletHitEnemy(true);
            }
          });
        });
      }
    }

    animate();
    spawnEnemies();

    window.addEventListener("click", (event) => {
      if (!gameOver) {
        const angle = Math.atan2(event.clientY - y, event.clientX - x + 5);

        const speed = 25;
        const velocity = {
          x: Math.cos(angle) * speed,
          y: Math.sin(angle) * speed,
        };
        const projectile = new Projectile(x, y, velocity);
        projectiles.push(projectile);
        setIsHitSoundPlayed(false); // Reset the flag when a new projectile is created

      }
    });
  }, [gameOver, score]);

  useEffect(() => {
    const handleKeyPress = async (event) => {
      if (event.keyCode === 27) {
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

  useEffect(() => {
    if (bulletHitEnemy && !isHitSoundPlayed) {
      // Play the hit sound only if it hasn't been played before for the current bullet
      const hit = new Audio(hitSound);
      hit.currentTime = 0;
      hit.play();
      setScore((prevScore) => prevScore + 1);
      setBulletHitEnemy(false);    }
  }, [bulletHitEnemy, isHitSoundPlayed, score]);

  const toggleFullScreen = () => {
    if (!isFullScreen) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch((error) => {
          // console.error("Error entering full screen:", error);
        });
      }
    } else {
      setIsFullScreen(!isFullScreen);
    }
  };

  return (
    <div className=" inset-0 fixed bg-black ">
      {/* {gameOver ? (
        <div className="game-over">
          Game Over
          <br />
          Score: {score}
        </div>
      ) : (
        <div className="countdown">
          Time Remaining:{" "}
          {Math.max(300 - Math.floor((Date.now() - gameStartTime) / 1000), 0)}{" "}
          seconds
        </div>
      )} */}
      <canvas ref={canvasRef} />
    </div>
  );
};

export default BlueRedTheShooter;
