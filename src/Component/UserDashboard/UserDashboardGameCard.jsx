import React, { useEffect, useState } from "react";
import smooth from "../../Assets/Dashboard/smooth.png";
import match from "../../Assets/Dashboard/match.png";
import rain from "../../Assets/Dashboard/rain.png";
import random from "../../Assets/Dashboard/random.png";
import rapid from "../../Assets/Dashboard/rapid.png";
import ping from "../../Assets/Dashboard/ping.png";
import emoji from "../../Assets/Game/emoji.svg";
import glass from "../../Assets/Game/blueGass.svg";
import questsearch from "../../Assets/Dashboard/quest-search.png";
import RockChart from "../../Assets/Dashboard/RockChart.png";
import TheShooter from "../../Assets/Dashboard/Shooter.png";
import Colortrap from "../../Assets/Dashboard/colorTrap.png";
import done from "../../Assets/Game/done.png";

import ModalSmoothMovement from "../Modal/ModalSmoothMovement";
import ModalRapidMovement from "../Modal/ModalRapidMovement"; // Import the Modal component you created
import ModalPingPong from "../Modal/ModalPingPong"; // Import the Modal component you created
import ModalMatchGabor from "../Modal/ModalMatchGabor"; // Import the Modal component you created
import ModalRandomObstacle from "../Modal/ModalRandomObstacle"; // Import the Modal component you created
import ModalRainDrop from "../Modal/ModalRainDrop";
import ModalSearchQuest from "../Modal/ModalSearchQuest";
import ModalTheShooter from "../Modal/ModalTheShooter";
import ModalRockChart from "../Modal/ModalRockChart";
import ModalColorTrap from "../Modal/Colortrap";

// Import the Modal component you created

import { Link } from "react-router-dom";
import { server_url } from "../../Config/API";
import AuthUser from "../../Hooks/authUser";
import moment from "moment";
import BlueRedSmoothMovementModal from "../Modal/BlueRedModal/BlueRedSmoothMovementModal";
import BlueRedRapidMovementModal from "../Modal/BlueRedModal/BlueRedRapidMovementModal";
import BlueRedPingPongModal from "../Modal/BlueRedModal/BlueRedPingPongModal";
import BlueRedRainDropModal from "../Modal/BlueRedModal/BlueRedRainDropModal";
import BlueRedRockChartModal from "../Modal/BlueRedModal/BlueRedRockChartModal";
import Loading from "../../Shared/Loading";
import BlueRedSearchQuestModal from "../Modal/BlueRedModal/BlueRedSearchQuestModal";
import BlueRedTheShooterModal from "../Modal/BlueRedModal/BlueRedTheShooterModal";
import BlueRedRandomObstacleModal from "../Modal/BlueRedModal/BlueRedRandomObstacleModal";
import { Icon } from "@iconify/react";

const UserDashboardGameCard = () => {
  const [loading, setLoading] = useState(false);
  // state for normal game
  const [smoothData, setSmoothData] = useState([]);
  const [rapidData, setRapidData] = useState([]);
  const [pingPongData, setPingPongData] = useState([]);
  const [rainDropData, setRainDropData] = useState([]);
  const [matchGaborData, setMatchGaborData] = useState([]);
  const [randomObstacleData, setRandomObstacleData] = useState([]);
  const [searchQuestData, setSearchQuestData] = useState([]);
  const [rockChartData, setRockChartData] = useState([]);
  const [theShooterData, setTheShooterData] = useState([]);
  const [colorTrapData, setColorTrapData] = useState([]);

  // state for red blue game
  const [redBlueSmoothData, setRedBlueSmoothData] = useState([]);
  const [redBlueRapidData, setRedBlueRapidData] = useState([]);
  const [redBluePingPongData, setRedBluePingPongData] = useState([]);
  const [redBlueRainDropData, setRedBlueRainDropData] = useState([]);
  const [redBlueMatchGaborData, setRedBlueMatchGaborData] = useState([]);
  const [redBlueRandomObstacleData, setRedBlueRandomObstacleData] = useState(
    []
  );
  const [redBlueSearchQuestData, setRedBlueSearchQuestData] = useState([]);
  const [redBlueRockChartData, setRedBlueRockChartData] = useState([]);
  const [redBlueTheShooterData, setRedBlueTheShooterData] = useState([]);
  const [redBlueColorTrapData, setRedBlueColorTrapData] = useState([]);

  const { userInfo } = AuthUser();
  let date = moment().format("YYYY-MM-D");
  const currentDate = moment();

  const show = Number(currentDate.format("DD") % 2);
  //modal SmoothMovement
  const [modalIsOpenSmoothMovement, setModalIsOpenSmoothMovement] =
    useState(false);

  const openModalSmoothMovement = () => {
    setModalIsOpenSmoothMovement(true);
  };

  const closeModalSmoothMovement = () => {
    setModalIsOpenSmoothMovement(false);
  };

  // Modal Rapid fire

  const [modalIsOpenRapidMovement, setModalIsOpenRapidMovement] =
    useState(false);

  const openModalRapidMovement = () => {
    setModalIsOpenRapidMovement(true);
  };

  const closeModalRapidMovement = () => {
    setModalIsOpenRapidMovement(false);
  };

  // Modal PingPong

  const [modalIsOpenPingPong, setModalIsOpenPingPong] = useState(false);

  const openModalPingPong = () => {
    setModalIsOpenPingPong(true);
  };

  const closeModalPingPong = () => {
    setModalIsOpenPingPong(false);
  };
  // Modal Match Gabor

  const [modalIsOpenMatchGabor, setModalIsOpenMatchGabor] = useState(false);

  const openModalMatchGabor = () => {
    setModalIsOpenMatchGabor(true);
  };

  const closeModalMatchGabor = () => {
    setModalIsOpenMatchGabor(false);
  };

  //Random Obstacle Modal

  const [modalIsOpenRandomObstacle, setModalIsOpenRandomObstacle] =
    useState(false);

  const openModalRandomObstacle = () => {
    setModalIsOpenRandomObstacle(true);
  };

  const closeModalRandomObstacle = () => {
    setModalIsOpenRandomObstacle(false);
  };

  // Modal Rain Drop
  const [modalIsOpenRainDrop, setModalIsOpenRainDrop] = useState(false);

  const openModalRainDrop = () => {
    setModalIsOpenRainDrop(true);
  };

  const closeModalRainDrop = () => {
    setModalIsOpenRainDrop(false);
  };

  //Modal Search Quest
  const [modalIsOpenSearchQuest, setModalIsOpenSearchQuest] = useState(false);

  const openModalSearchQuest = () => {
    setModalIsOpenSearchQuest(true);
  };

  const closeModalSearchQuest = () => {
    setModalIsOpenSearchQuest(false);
  };

  //Modal the shooter
  const [modalIsOpenTheShooter, setModalIsOpenTheShooter] = useState(false);

  const openModalTheShooter = () => {
    setModalIsOpenTheShooter(true);
  };

  const closeModalTheShooter = () => {
    setModalIsOpenTheShooter(false);
  };

  //Modal Rock Chart
  const [modalIsOpenRockChart, setModalIsOpenRockChart] = useState(false);

  const openModalRockChart = () => {
    setModalIsOpenRockChart(true);
  };

  const closeModalRockChart = () => {
    setModalIsOpenRockChart(false);
  };

  //color Trap
  const [modalIsOpenColorTrap, setModalIsOpenColorTrap] = useState(false);

  const openModalColorTrap = () => {
    setModalIsOpenColorTrap(true);
  };

  const closeModalColorTrap = () => {
    setModalIsOpenColorTrap(false);
  };

  //red and blue game

  //red-blue smoothmovement game

  const [
    modalIsOpenBlueRedSmoothMovementModal,
    setModalIsOpenBlueRedSmoothMovementModal,
  ] = useState(false);

  const openModalBlueRedSmoothMovementModal = () => {
    setModalIsOpenBlueRedSmoothMovementModal(true);
  };

  const closeModalBlueRedSmoothMovementModal = () => {
    setModalIsOpenBlueRedSmoothMovementModal(false);
  };

  //blue Red Rapid Movement
  const [modalIsOpenBlueRedRapidMovement, setModalIsOpenBlueRedRapidMovement] =
    useState(false);

  const openModalBlueRedRapidMovement = () => {
    setModalIsOpenBlueRedRapidMovement(true);
  };

  const closeModalBlueRedRapidMovement = () => {
    setModalIsOpenBlueRedRapidMovement(false);
  };

  //blue red ping-pong modal
  const [modalIsOpenRedBluePingPong, setModalIsOpenRedBluePingPong] =
    useState(false);

  const openModalRedBluePingPong = () => {
    setModalIsOpenRedBluePingPong(true);
  };

  const closeModalRedBluePingPong = () => {
    setModalIsOpenRedBluePingPong(false);
  };
  //blue red rain drop

  const [modalIsOpenRedBlueRainDrop, setModalIsOpenRedBlueRainDrop] =
    useState(false);

  const openModalRedBlueRainDrop = () => {
    setModalIsOpenRedBlueRainDrop(true);
  };

  const closeModalRedBlueRainDrop = () => {
    setModalIsOpenRedBlueRainDrop(false);
  };

  //blue red rock chart modal
  const [modalIsOpenBlueRedRockChart, setModalIsOpenBlueRedRockChart] =
    useState(false);

  const openModalBlueRedRockChart = () => {
    setModalIsOpenBlueRedRockChart(true);
  };

  const closeModalBlueRedRockChart = () => {
    setModalIsOpenBlueRedRockChart(false);
  };
  //blue red search quest

  const [modalIsOpenRedBlueSearchQuest, setModalIsOpenRedBlueSearchQuest] =
    useState(false);

  const openModalRedBlueSearchQuest = () => {
    setModalIsOpenRedBlueSearchQuest(true);
  };

  const closeModalRedBlueSearchQuest = () => {
    setModalIsOpenRedBlueSearchQuest(false);
  };

  //blue red the shooter

  const [modalIsOpenBlueRedTheShooter, setModalIsOpenBlueRedTheShooter] =
    useState(false);

  const openModalBlueRedTheShooter = () => {
    setModalIsOpenBlueRedTheShooter(true);
  };

  const closeModalBlueRedTheShooter = () => {
    setModalIsOpenBlueRedTheShooter(false);
  };

  //blue and red random obstacle
  const [
    modalIsOpenBlueRedRandomObstacle,
    setModalIsOpenBlueRedRandomObstacle,
  ] = useState(false);

  const openModalBlueRedRandomObstacle = () => {
    setModalIsOpenBlueRedRandomObstacle(true);
  };

  const closeModalBlueRedRandomObstacle = () => {
    setModalIsOpenBlueRedRandomObstacle(false);
  };

  // Smooth movement Game Start
  const fetchFunction = async (url, setData) => {
    setLoading(true);
    await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data?.data.length) {
          setData(data?.data);
        }

        setLoading(false);
      });
    setLoading(false);
  };

  // load monocular data
  useEffect(() => {
    fetchFunction(
      `${server_url}/smoothMovement/specific?fieldName=${"userId"}&&fieldValue=${
        userInfo?._id
      }&&fieldName2=${"date"}&&fieldValue2=${date}&&fieldName3=${"gameName"}&&fieldValue3=${"Smooth Movement Monocular"}`,
      setSmoothData
    );
    fetchFunction(
      `${server_url}/rapidMovement/specific?fieldName=${"userId"}&&fieldValue=${
        userInfo?._id
      }&&fieldName2=${"date"}&&fieldValue2=${date}&&fieldName3=${"gameName"}&&fieldValue3=${"Rapid Movement Monocular"}`,
      setRapidData
    );
    fetchFunction(
      `${server_url}/pingPong/specific?fieldName=${"userId"}&&fieldValue=${
        userInfo?._id
      }&&fieldName2=${"date"}&&fieldValue2=${date}&&fieldName3=${"gameName"}&&fieldValue3=${"PingPong Monocular"}`,
      setPingPongData
    );
    fetchFunction(
      `${server_url}/rainDrop/specific?fieldName=${"userId"}&&fieldValue=${
        userInfo?._id
      }&&fieldName2=${"date"}&&fieldValue2=${date}&&fieldName3=${"gameName"}&&fieldValue3=${"Rain Drop Monocular"}`,
      setRainDropData
    );
    fetchFunction(
      `${server_url}/matchGabor/specific?fieldName=${"userId"}&&fieldValue=${
        userInfo?._id
      }&&fieldName2=${"date"}&&fieldValue2=${date}&&fieldName3=${"gameName"}&&fieldValue3=${"Match Gabor Monocular"}`,
      setMatchGaborData
    );
    fetchFunction(
      `${server_url}/randomObstacle/specific?fieldName=${"userId"}&&fieldValue=${
        userInfo?._id
      }&&fieldName2=${"date"}&&fieldValue2=${date}&&fieldName3=${"gameName"}&&fieldValue3=${"Random Obstacle Monocular"}`,
      setRandomObstacleData
    );
    fetchFunction(
      `${server_url}/searchQuest/specific?fieldName=${"userId"}&&fieldValue=${
        userInfo?._id
      }&&fieldName2=${"date"}&&fieldValue2=${date}&&fieldName3=${"gameName"}&&fieldValue3=${"Search Quest Monocular"}`,
      setSearchQuestData
    );
    fetchFunction(
      `${server_url}/rockChart/specific?fieldName=${"userId"}&&fieldValue=${
        userInfo?._id
      }&&fieldName2=${"date"}&&fieldValue2=${date}&&fieldName3=${"gameName"}&&fieldValue3=${"Rock Chart Monocular"}`,
      setRockChartData
    );
    fetchFunction(
      `${server_url}/theShooter/specific?fieldName=${"userId"}&&fieldValue=${
        userInfo?._id
      }&&fieldName2=${"date"}&&fieldValue2=${date}&&fieldName3=${"gameName"}&&fieldValue3=${"The Shooter Monocular"}`,
      setTheShooterData
    );
    fetchFunction(
      `${server_url}/colorTrap/specific?fieldName=${"userId"}&&fieldValue=${
        userInfo?._id
      }&&fieldName2=${"date"}&&fieldValue2=${date}&&fieldName3=${"gameName"}&&fieldValue3=${"Color Trap Monocular"}`,
      setColorTrapData
    );
  }, []);

  // load binocular data
  useEffect(() => {
    fetchFunction(
      `${server_url}/smoothMovement/specific?fieldName=${"userId"}&&fieldValue=${
        userInfo?._id
      }&&fieldName2=${"date"}&&fieldValue2=${date}&&fieldName3=${"gameName"}&&fieldValue3=${"Smooth Movement Binocular"}`,
      setRedBlueSmoothData
    );
    fetchFunction(
      `${server_url}/rapidMovement/specific?fieldName=${"userId"}&&fieldValue=${
        userInfo?._id
      }&&fieldName2=${"date"}&&fieldValue2=${date}&&fieldName3=${"gameName"}&&fieldValue3=${"Rapid Movement Binocular"}`,
      setRedBlueRapidData
    );
    fetchFunction(
      `${server_url}/pingPong/specific?fieldName=${"userId"}&&fieldValue=${
        userInfo?._id
      }&&fieldName2=${"date"}&&fieldValue2=${date}&&fieldName3=${"gameName"}&&fieldValue3=${"PingPong Binocular"}`,
      setRedBluePingPongData
    );
    fetchFunction(
      `${server_url}/rainDrop/specific?fieldName=${"userId"}&&fieldValue=${
        userInfo?._id
      }&&fieldName2=${"date"}&&fieldValue2=${date}&&fieldName3=${"gameName"}&&fieldValue3=${"Rain Drop Binocular"}`,
      setRedBlueRainDropData
    );
    fetchFunction(
      `${server_url}/matchGabor/specific?fieldName=${"userId"}&&fieldValue=${
        userInfo?._id
      }&&fieldName2=${"date"}&&fieldValue2=${date}&&fieldName3=${"gameName"}&&fieldValue3=${"Match Gabor Binocular"}`,
      setRedBlueMatchGaborData
    );
    fetchFunction(
      `${server_url}/randomObstacle/specific?fieldName=${"userId"}&&fieldValue=${
        userInfo?._id
      }&&fieldName2=${"date"}&&fieldValue2=${date}&&fieldName3=${"gameName"}&&fieldValue3=${"Random Obstacle Binocular"}`,
      setRedBlueRandomObstacleData
    );
    fetchFunction(
      `${server_url}/searchQuest/specific?fieldName=${"userId"}&&fieldValue=${
        userInfo?._id
      }&&fieldName2=${"date"}&&fieldValue2=${date}&&fieldName3=${"gameName"}&&fieldValue3=${"Search Quest Binocular"}`,
      setRedBlueSearchQuestData
    );
    fetchFunction(
      `${server_url}/rockChart/specific?fieldName=${"userId"}&&fieldValue=${
        userInfo?._id
      }&&fieldName2=${"date"}&&fieldValue2=${date}&&fieldName3=${"gameName"}&&fieldValue3=${"Rock Chart Binocular"}`,
      setRedBlueRockChartData
    );
    fetchFunction(
      `${server_url}/theShooter/specific?fieldName=${"userId"}&&fieldValue=${
        userInfo?._id
      }&&fieldName2=${"date"}&&fieldValue2=${date}&&fieldName3=${"gameName"}&&fieldValue3=${"The Shooter Binocular"}`,
      setRedBlueTheShooterData
    );
    fetchFunction(
      `${server_url}/colorTrap/specific?fieldName=${"userId"}&&fieldValue=${
        userInfo?._id
      }&&fieldName2=${"date"}&&fieldValue2=${date}&&fieldName3=${"gameName"}&&fieldValue3=${"Color Trap Binocular"}`,
      setRedBlueColorTrapData
    );
  }, []);

  // Smooth movement Game End

  if (loading) {
    return <Loading />;
  }

  const gameCard = [
    <>
      <div className="bg-white shadow-md p-5 rounded-lg">
        {/* first */}
        <div className="grid grid-cols-2 gap-5 items-center">
          <img className="w-18 mx-auto" src={smooth} alt="smooth" />
          <h2 className="text-2xl font-medium">Smooth Movement </h2>
        </div>
        {/* second */}
        <div className="grid grid-cols-2 gap-5 items-center mt-10">
          <div>
            <div className="h-1 w-full bg-neutral-200  rounded-full">
              <div
                className="h-1 bg-secondary rounded-full"
                style={{
                  width: `${
                    redBlueSmoothData?.length
                      ? Math.ceil(
                          ((300 - redBlueSmoothData[0]?.remainingTime) / 300) *
                            100,
                          2
                        )
                      : 0
                  }%`,
                }}
              ></div>
            </div>

            <button
              disabled={redBlueSmoothData[0]?.remainingTime < 1}
              onClick={openModalBlueRedSmoothMovementModal}
              className="bg-gray-50 border border-secondary py-2.5 px-6 rounded-md mx-auto w-fit block my-5 hover:scale-105 disabled:bg-green-100 duration-500  disabled:hover:scale-100"
            >
              {redBlueSmoothData[0]?.remainingTime ||
              redBlueSmoothData?.length === 0 ? (
                <img className="w-7" src={glass} alt="glass" />
              ) : (
                <img className="w-6" src={done} alt="glass" />
              )}
            </button>

            <BlueRedSmoothMovementModal
              isOpen={modalIsOpenBlueRedSmoothMovementModal}
              onRequestClose={closeModalBlueRedSmoothMovementModal}
            ></BlueRedSmoothMovementModal>
          </div>
          <div>
            <div className="h-1 w-full bg-neutral-200  rounded-full">
              <div
                className="h-1 bg-secondary rounded-full"
                style={{
                  width: `${
                    smoothData?.length
                      ? Math.ceil(
                          ((300 - smoothData[0]?.remainingTime) / 300) * 100,
                          2
                        )
                      : 0
                  }%`,
                }}
              ></div>
            </div>
            <div>
              <button
                disabled={smoothData[0]?.remainingTime < 1}
                className="bg-[#6f63f4] py-3 px-6 rounded-md mx-auto w-fit block my-5 hover:scale-105 duration-500 hover:bg-[rgb(111,99,244)] disabled:bg-green-100 disabled:hover:scale-100"
                onClick={openModalSmoothMovement}
              >
                {smoothData[0]?.remainingTime || smoothData?.length === 0 ? (
                  <img className="w-6" src={emoji} alt="glass" />
                ) : (
                  <img className="w-6" src={done} alt="glass" />
                )}
              </button>

              <ModalSmoothMovement
                isOpen={modalIsOpenSmoothMovement}
                onRequestClose={closeModalSmoothMovement}
              ></ModalSmoothMovement>
            </div>
          </div>
        </div>
      </div>
    </>,
    <>
      <div className="bg-white shadow-md p-5 rounded-lg">
        {/* first */}
        <div className="grid grid-cols-2 gap-5 items-center">
          <img className="w-18 mx-auto" src={rapid} alt="smooth" />
          <h2 className="text-2xl font-medium">Rapid Movement</h2>
        </div>
        {/* second */}
        <div className="grid grid-cols-2 gap-5 items-center mt-10">
          <div>
            <div className="h-1 w-full bg-neutral-200  rounded-full">
              <div
                className="h-1 bg-secondary rounded-full"
                style={{
                  width: `${
                    redBlueRapidData?.length
                      ? Math.ceil(
                          ((300 - redBlueRapidData[0]?.remainingTime) / 300) *
                            100,
                          2
                        )
                      : 0
                  }%`,
                }}
              ></div>
            </div>
            <button
              disabled={redBlueRapidData[0]?.remainingTime < 1}
              onClick={openModalBlueRedRapidMovement}
              className="bg-gray-50 border border-secondary py-2.5 px-6 rounded-md mx-auto w-fit block my-5 hover:scale-105 duration-500  disabled:bg-green-100 disabled:hover:scale-100"
            >
              {redBlueRapidData[0]?.remainingTime ||
              redBlueRapidData?.length === 0 ? (
                <img className="w-7" src={glass} alt="glass" />
              ) : (
                <img className="w-6" src={done} alt="glass" />
              )}
            </button>

            <BlueRedRapidMovementModal
              isOpen={modalIsOpenBlueRedRapidMovement}
              onRequestClose={closeModalBlueRedRapidMovement}
            ></BlueRedRapidMovementModal>
          </div>
          <div>
            <div className="h-1 w-full bg-neutral-200  rounded-full">
              <div
                className="h-1 bg-secondary rounded-full"
                style={{
                  width: `${
                    rapidData?.length
                      ? Math.ceil(
                          ((300 - rapidData[0]?.remainingTime) / 300) * 100,
                          2
                        )
                      : 0
                  }%`,
                }}
              ></div>
            </div>{" "}
            <div>
              <button
                disabled={rapidData[0]?.remainingTime < 1}
                className="bg-[#7367F0] py-3 px-6 rounded-md mx-auto w-fit block my-5 hover:scale-105 duration-500 hover:bg-[rgb(111,99,244)] disabled:bg-green-100 disabled:hover:scale-10"
                onClick={openModalRapidMovement}
              >
                {rapidData[0]?.remainingTime || rapidData?.length === 0 ? (
                  <img className="w-6" src={emoji} alt="glass" />
                ) : (
                  <img className="w-6" src={done} alt="glass" />
                )}
              </button>

              <ModalRapidMovement
                isOpen={modalIsOpenRapidMovement}
                onRequestClose={closeModalRapidMovement}
              ></ModalRapidMovement>
            </div>
          </div>
        </div>
      </div>
    </>,
    <>
      <div className="bg-white shadow-md p-5 rounded-lg">
        {/* first */}
        <div className="grid grid-cols-2 gap-5 items-center">
          <img className="w-18 mx-auto" src={ping} alt="smooth" />
          <h2 className="text-2xl font-medium">Ping Pong</h2>
        </div>
        {/* second */}
        <div className="grid grid-cols-2 gap-5 items-center mt-10">
          <div>
            <div className="h-1 w-full bg-neutral-200  rounded-full">
              <div
                className="h-1 bg-secondary rounded-full"
                style={{
                  width: `${
                    redBluePingPongData?.length
                      ? Math.ceil(
                          ((300 - redBluePingPongData[0]?.remainingTime) /
                            300) *
                            100,
                          2
                        )
                      : 0
                  }%`,
                }}
              ></div>
            </div>
            <button
              disabled={redBluePingPongData[0]?.remainingTime < 1}
              onClick={openModalRedBluePingPong}
              className="bg-gray-50 border border-secondary py-2.5 px-6 rounded-md mx-auto w-fit block my-5 hover:scale-105 duration-500  disabled:bg-green-100 disabled:hover:scale-100"
            >
              {redBluePingPongData[0]?.remainingTime ||
              redBluePingPongData?.length === 0 ? (
                <img className="w-7" src={glass} alt="glass" />
              ) : (
                <img className="w-6" src={done} alt="glass" />
              )}
            </button>

            <BlueRedPingPongModal
              isOpen={modalIsOpenRedBluePingPong}
              onRequestClose={closeModalRedBluePingPong}
            ></BlueRedPingPongModal>
          </div>
          <div>
            <div className="h-1 w-full bg-neutral-200  rounded-full">
              <div
                className="h-1 bg-secondary rounded-full"
                style={{
                  width: `${
                    pingPongData?.length
                      ? Math.ceil(
                          ((300 - pingPongData[0]?.remainingTime) / 300) * 100,
                          2
                        )
                      : 0
                  }%`,
                }}
              ></div>
            </div>

            <div>
              <button
                disabled={pingPongData[0]?.remainingTime < 1}
                className="bg-[#7367F0] py-3 px-6 rounded-md mx-auto w-fit block my-5 hover:scale-105 duration-500 hover:bg-[rgb(111,99,244)] disabled:bg-green-100 disabled:hover:scale-100"
                onClick={openModalPingPong}
              >
                {pingPongData[0]?.remainingTime ||
                pingPongData?.length === 0 ? (
                  <img className="w-6" src={emoji} alt="glass" />
                ) : (
                  <img className="w-6" src={done} alt="glass" />
                )}
              </button>

              <ModalPingPong
                isOpen={modalIsOpenPingPong}
                onRequestClose={closeModalPingPong}
              ></ModalPingPong>
            </div>
          </div>
        </div>
      </div>
    </>,
    <>
      <div className="bg-white shadow-md p-5 rounded-lg">
        {/* first */}
        <div className="grid grid-cols-2 gap-5 items-center">
          <img
            className="w-18 mx-auto"
            src={RockChart}
            alt="Random
Obstacle"
          />
          <h2 className="text-2xl font-medium">Rock Chart</h2>
        </div>
        {/* second */}
        <div className="grid grid-cols-2 gap-5 items-center mt-10">
          <div>
            <div className="h-1 w-full bg-neutral-200  rounded-full">
              <div
                className="h-1 bg-secondary rounded-full"
                style={{
                  width: `${
                    redBlueRockChartData?.length
                      ? Math.ceil(
                          ((300 - redBlueRockChartData[0]?.remainingTime) /
                            300) *
                            100,
                          2
                        )
                      : 0
                  }%`,
                }}
              ></div>
            </div>
            <button
              disabled={redBlueRockChartData[0]?.remainingTime < 1}
              onClick={openModalBlueRedRockChart}
              className="bg-gray-50 border border-secondary py-2.5 px-6 rounded-md mx-auto w-fit block my-5 hover:scale-105 duration-500  disabled:bg-green-100 disabled:hover:scale-100"
            >
              {redBlueRockChartData[0]?.remainingTime ||
              redBlueRockChartData?.length === 0 ? (
                <img className="w-7" src={glass} alt="glass" />
              ) : (
                <img className="w-6" src={done} alt="glass" />
              )}
            </button>
            <BlueRedRockChartModal
              isOpen={modalIsOpenBlueRedRockChart}
              onRequestClose={closeModalBlueRedRockChart}
            ></BlueRedRockChartModal>
          </div>
          <div>
            <div className="h-1 w-full bg-neutral-200  rounded-full">
              <div
                className="h-1 bg-secondary rounded-full"
                style={{
                  width: `${
                    rockChartData?.length
                      ? Math.ceil(
                          ((300 - rockChartData[0]?.remainingTime) / 300) * 100,
                          2
                        )
                      : 0
                  }%`,
                }}
              ></div>
            </div>

            <div>
              <button
                disabled={rockChartData[0]?.remainingTime < 1}
                className="bg-[#7367F0] py-3 px-6 rounded-md mx-auto w-fit block my-5 hover:scale-105 duration-500 hover:bg-[rgb(111,99,244)] disabled:bg-green-100 disabled:hover:scale-100"
                onClick={openModalRockChart}
              >
                {rockChartData[0]?.remainingTime ||
                rockChartData?.length === 0 ? (
                  <img className="w-6" src={emoji} alt="glass" />
                ) : (
                  <img className="w-6" src={done} alt="glass" />
                )}
              </button>

              <ModalRockChart
                isOpen={modalIsOpenRockChart}
                onRequestClose={closeModalRockChart}
              ></ModalRockChart>
            </div>
          </div>
        </div>
      </div>
    </>,

    <>
      <div className="bg-white shadow-md p-5 rounded-lg">
        {/* first */}
        <div className="grid grid-cols-2 gap-5 items-center">
          <img className="w-18 mx-auto" src={random} alt="Random Obstacle" />
          <h2 className="text-2xl font-medium">Random Obstacle</h2>
        </div>
        {/* second */}
        <div className="grid grid-cols-2 gap-5 items-center mt-10">
          <div>
            <div className="h-1 w-full bg-neutral-200  rounded-full">
              <div
                className="h-1 bg-secondary rounded-full"
                style={{
                  width: `${
                    redBlueRandomObstacleData?.length
                      ? Math.ceil(
                          ((300 - redBlueRandomObstacleData[0]?.remainingTime) /
                            300) *
                            100,
                          2
                        )
                      : 0
                  }%`,
                }}
              ></div>
            </div>
            <button
              disabled={redBlueRandomObstacleData[0]?.remainingTime < 1}
              onClick={openModalBlueRedRandomObstacle}
              className="bg-gray-50 border border-secondary py-2.5 px-6 rounded-md mx-auto w-fit block my-5 hover:scale-105 duration-500  disabled:bg-green-100 disabled:hover:scale-100"
            >
              {redBlueRandomObstacleData[0]?.remainingTime ||
              redBlueRandomObstacleData?.length === 0 ? (
                <img className="w-7" src={glass} alt="glass" />
              ) : (
                <img className="w-6" src={done} alt="glass" />
              )}
            </button>

            <BlueRedRandomObstacleModal
              isOpen={modalIsOpenBlueRedRandomObstacle}
              onRequestClose={closeModalBlueRedRandomObstacle}
            ></BlueRedRandomObstacleModal>
          </div>
          <div>
            <div className="h-1 w-full bg-neutral-200  rounded-full">
              <div
                className="h-1 bg-secondary rounded-full"
                style={{
                  width: `${
                    randomObstacleData?.length
                      ? Math.ceil(
                          ((300 - randomObstacleData[0]?.remainingTime) / 300) *
                            100,
                          2
                        )
                      : 0
                  }%`,
                }}
              ></div>
            </div>
            <div>
              <button
                disabled={randomObstacleData[0]?.remainingTime < 1}
                className="bg-[#7367F0] py-3 px-6 rounded-md mx-auto w-fit block my-5 hover:scale-105 duration-500 hover:bg-[rgb(111,99,244)] disabled:bg-green-100 disabled:hover:scale-100"
                onClick={openModalRandomObstacle}
              >
                {randomObstacleData[0]?.remainingTime ||
                randomObstacleData?.length === 0 ? (
                  <img className="w-6" src={emoji} alt="glass" />
                ) : (
                  <img className="w-6" src={done} alt="glass" />
                )}
              </button>
              <ModalRandomObstacle
                isOpen={modalIsOpenRandomObstacle}
                onRequestClose={closeModalRandomObstacle}
              ></ModalRandomObstacle>
            </div>
          </div>
        </div>
      </div>
    </>,
    <>
      <div className="bg-white shadow-md p-5 rounded-lg">
        {/* first */}
        <div className="grid grid-cols-2 gap-5 items-center">
          <img
            className="w-18 mx-auto"
            src={questsearch}
            alt="Random
Obstacle"
          />
          <h2 className="text-2xl font-medium">Search Quest</h2>
        </div>
        {/* second */}
        <div className="grid grid-cols-2 gap-5 items-center mt-10">
          <div>
            <div className="h-1 w-full bg-neutral-200  rounded-full">
              <div
                className="h-1 bg-secondary rounded-full"
                style={{
                  width: `${
                    redBlueSearchQuestData?.length
                      ? Math.ceil(
                          ((300 - redBlueSearchQuestData[0]?.remainingTime) /
                            300) *
                            100,
                          2
                        )
                      : 0
                  }%`,
                }}
              ></div>
            </div>
            <button
              disabled={redBlueSearchQuestData[0]?.remainingTime < 1}
              onClick={openModalRedBlueSearchQuest}
              className="bg-gray-50 border border-secondary py-2.5 px-6 rounded-md mx-auto w-fit block my-5 hover:scale-105 duration-500  disabled:bg-green-100 disabled:hover:scale-100"
            >
              {redBlueSearchQuestData[0]?.remainingTime ||
              redBlueSearchQuestData?.length === 0 ? (
                <img className="w-7" src={glass} alt="glass" />
              ) : (
                <img className="w-6" src={done} alt="glass" />
              )}
            </button>

            <BlueRedSearchQuestModal
              isOpen={modalIsOpenRedBlueSearchQuest}
              onRequestClose={closeModalRedBlueSearchQuest}
            ></BlueRedSearchQuestModal>
          </div>
          <div>
            <div className="h-1 w-full bg-neutral-200  rounded-full">
              <div
                className="h-1 bg-secondary rounded-full"
                style={{
                  width: `${
                    searchQuestData?.length
                      ? Math.ceil(
                          ((300 - searchQuestData[0]?.remainingTime) / 300) *
                            100,
                          2
                        )
                      : 0
                  }%`,
                }}
              ></div>
            </div>

            <div>
              <button
                disabled={searchQuestData[0]?.remainingTime < 1}
                className="bg-[#7367F0] py-3 px-6 rounded-md mx-auto w-fit block my-5 hover:scale-105 duration-500 hover:bg-[rgb(111,99,244)] disabled:bg-green-100 disabled:hover:scale-100"
                onClick={openModalSearchQuest}
              >
                {searchQuestData[0]?.remainingTime ||
                searchQuestData?.length === 0 ? (
                  <img className="w-6" src={emoji} alt="glass" />
                ) : (
                  <img className="w-6" src={done} alt="glass" />
                )}
              </button>
              <ModalSearchQuest
                isOpen={modalIsOpenSearchQuest}
                onRequestClose={closeModalSearchQuest}
              ></ModalSearchQuest>
            </div>
          </div>
        </div>
      </div>
    </>,
  ];

  const filterOddCard = gameCard?.filter((card, i) => i % 2 !== 0);
  const filterEvenCard = gameCard?.filter((card, i) => i % 2 === 0);

  return (
    <div className="grid md:grid-cols-3 gird-cols-2 gap-x-7 gap-y-10 my-10">
      {/* the shooter */}
      <div className="bg-white shadow-md p-5 rounded-lg">
        {/* first */}
        <div className="grid grid-cols-2 gap-5 items-center">
          <img
            className="w-18 mx-auto"
            src={TheShooter}
            alt="Random
Obstacle"
          />
          <h2 className="text-2xl font-medium">The Shooter</h2>
        </div>
        {/* second */}
        <div className="grid grid-cols-2 gap-5 items-center mt-10">
          <div>
            <div className="h-1 w-full bg-neutral-200  rounded-full">
              <div
                className="h-1 bg-secondary rounded-full"
                style={{
                  width: `${
                    redBlueTheShooterData?.length
                      ? Math.ceil(
                          ((300 - redBlueTheShooterData[0]?.remainingTime) /
                            300) *
                            100,
                          2
                        )
                      : 0
                  }%`,
                }}
              ></div>
            </div>
            <button
              disabled={redBlueTheShooterData[0]?.remainingTime < 1}
              onClick={openModalBlueRedTheShooter}
              className="bg-gray-50 border border-secondary py-2.5 px-6 rounded-md mx-auto w-fit block my-5 hover:scale-105 duration-500  disabled:bg-green-100 disabled:hover:scale-100"
            >
              {redBlueTheShooterData[0]?.remainingTime ||
              redBlueTheShooterData?.length === 0 ? (
                <img className="w-7" src={glass} alt="glass" />
              ) : (
                <img className="w-6" src={done} alt="glass" />
              )}
            </button>
            <BlueRedTheShooterModal
              isOpen={modalIsOpenBlueRedTheShooter}
              onRequestClose={closeModalBlueRedTheShooter}
            ></BlueRedTheShooterModal>
          </div>
          <div>
            <div className="h-1 w-full bg-neutral-200  rounded-full">
              <div
                className="h-1 bg-secondary rounded-full"
                style={{
                  width: `${
                    theShooterData?.length
                      ? Math.ceil(
                          ((300 - theShooterData[0]?.remainingTime) / 300) *
                            100,
                          2
                        )
                      : 0
                  }%`,
                }}
              ></div>
            </div>

            <div>
              <button
                disabled={theShooterData[0]?.remainingTime < 1}
                className="bg-[#7367F0] py-3 px-6 rounded-md mx-auto w-fit block my-5 hover:scale-105 duration-500 hover:bg-[rgb(111,99,244)] disabled:bg-green-100 disabled:hover:scale-100"
                onClick={openModalTheShooter}
              >
                {theShooterData[0]?.remainingTime ||
                theShooterData?.length === 0 ? (
                  <img className="w-6" src={emoji} alt="glass" />
                ) : (
                  <img className="w-6" src={done} alt="glass" />
                )}
              </button>
              <ModalTheShooter
                isOpen={modalIsOpenTheShooter}
                onRequestClose={closeModalTheShooter}
              ></ModalTheShooter>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md p-5 rounded-lg">
        {/* first */}
        <div className="grid grid-cols-2 gap-5 items-center">
          <img className="w-18 mx-auto" src={rain} alt="rain" />
          <h2 className="text-2xl font-medium">Rain Drop</h2>
        </div>
        {/* second */}
        <div className="grid grid-cols-2 gap-5 items-center mt-10">
          <div>
            <div className="h-1 w-full bg-neutral-200  rounded-full">
              <div
                className="h-1 bg-secondary rounded-full"
                style={{
                  width: `${
                    redBlueRainDropData?.length
                      ? Math.ceil(
                          ((300 - redBlueRainDropData[0]?.remainingTime) /
                            300) *
                            100,
                          2
                        )
                      : 0
                  }%`,
                }}
              ></div>
            </div>
            <button
              disabled={redBlueRainDropData[0]?.remainingTime < 1}
              onClick={openModalRedBlueRainDrop}
              className="bg-gray-50 border border-secondary py-2.5 px-6 rounded-md mx-auto w-fit block my-5 hover:scale-105 duration-500  disabled:bg-green-100 disabled:hover:scale-100"
            >
              {redBlueRainDropData[0]?.remainingTime ||
              redBlueRainDropData?.length === 0 ? (
                <img className="w-7" src={glass} alt="glass" />
              ) : (
                <img className="w-6" src={done} alt="glass" />
              )}
            </button>

            <BlueRedRainDropModal
              isOpen={modalIsOpenRedBlueRainDrop}
              onRequestClose={closeModalRedBlueRainDrop}
            ></BlueRedRainDropModal>
          </div>
          <div>
            <div className="h-1 w-full bg-neutral-200  rounded-full">
              <div
                className="h-1 bg-secondary rounded-full"
                style={{
                  width: `${
                    rainDropData?.length
                      ? Math.ceil(
                          ((300 - rainDropData[0]?.remainingTime) / 300) * 100,
                          2
                        )
                      : 0
                  }%`,
                }}
              ></div>
            </div>

            <div>
              <button
                disabled={rainDropData[0]?.remainingTime < 1}
                className="bg-[#7367F0] py-3 px-6 rounded-md mx-auto w-fit block my-5 hover:scale-105 duration-500 hover:bg-[rgb(111,99,244)] disabled:bg-green-100 disabled:hover:scale-100"
                onClick={openModalRainDrop}
              >
                {rainDropData[0]?.remainingTime ||
                rainDropData?.length === 0 ? (
                  <img className="w-6" src={emoji} alt="glass" />
                ) : (
                  <img className="w-6" src={done} alt="glass" />
                )}
              </button>
              <ModalRainDrop
                isOpen={modalIsOpenRainDrop}
                onRequestClose={closeModalRainDrop}
              ></ModalRainDrop>
            </div>
          </div>
        </div>
      </div>

      {show === 0 ? filterOddCard : filterEvenCard}

      {/* Match Gabor game */}
      <div className="bg-white shadow-md p-5 rounded-lg">
        {/* first */}
        <div className="grid grid-cols-2 gap-5 items-center">
          <img className="w-18 mx-auto" src={match} alt="Match Gabor " />
          <h2 className="text-2xl font-medium">Match Gabor </h2>
        </div>
        {/* second */}
        <div className="grid grid-cols-2 gap-5 items-center mt-10">
          <div>
            <div className="h-1 w-full bg-neutral-200  rounded-full">
              <div
                className="h-1 bg-secondary rounded-full"
                style={{
                  width: `${
                    matchGaborData?.length
                      ? Math.ceil(
                          ((300 - matchGaborData[0]?.remainingTime) / 300) *
                            100,
                          2
                        )
                      : 0
                  }%`,
                }}
              ></div>
            </div>
            <div>
              <button
                disabled={matchGaborData[0]?.remainingTime < 1}
                className=" border border-[#7367F0] py-3 px-6 rounded-md mx-auto w-fit block my-5 hover:scale-105 duration-500  disabled:bg-green-100 disabled:hover:scale-100"
                onClick={openModalMatchGabor}
              >
                {matchGaborData[0]?.remainingTime ||
                matchGaborData?.length === 0 ? (
                  // <img className="w-6" src={emoji} alt="glass" />
                  <Icon className="text-2xl" icon="ph:play-thin"></Icon>
                ) : (
                  <img className="w-6" src={done} alt="glass" />
                )}
              </button>

              <ModalMatchGabor
                isOpen={modalIsOpenMatchGabor}
                onRequestClose={closeModalMatchGabor}
              ></ModalMatchGabor>
            </div>
          </div>
        </div>
      </div>

      {/* color trap Game */}
      <div className="bg-white shadow-md p-5 rounded-lg">
        {/* first */}
        <div className="grid grid-cols-2 gap-5 items-center">
          <img
            className="w-18 mx-auto"
            src={Colortrap}
            alt="Random
Obstacle"
          />
          <h2 className="text-2xl font-medium">Color Trap</h2>
        </div>
        {/* second */}
        <div className="grid grid-cols-2 gap-5 items-center mt-10">
          <div>
            <div className="h-1 w-full bg-neutral-200  rounded-full">
              <div
                className="h-1 bg-secondary rounded-full"
                style={{
                  width: `${
                    colorTrapData?.length
                      ? Math.ceil(
                          ((300 - colorTrapData[0]?.remainingTime) / 300) * 100,
                          2
                        )
                      : 0
                  }%`,
                }}
              ></div>
            </div>

            <div>
              <button
                disabled={colorTrapData[0]?.remainingTime < 1}
                className="bg-[#7367F0] py-3 px-6 rounded-md mx-auto w-fit block my-5 hover:scale-105 duration-500 hover:bg-[rgb(111,99,244)] disabled:bg-green-100 disabled:hover:scale-100"
                onClick={openModalColorTrap}
              >
                {colorTrapData[0]?.remainingTime ||
                colorTrapData?.length === 0 ? (
                  <img className="w-6" src={emoji} alt="glass" />
                ) : (
                  <img className="w-6" src={done} alt="glass" />
                )}
              </button>

              <ModalColorTrap
                isOpen={modalIsOpenColorTrap}
                onRequestClose={closeModalColorTrap}
              ></ModalColorTrap>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardGameCard;
