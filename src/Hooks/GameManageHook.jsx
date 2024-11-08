import AuthUser from "./authUser";
import { server_url } from "../Config/API";
import moment from "moment";
import UpdateHooks from "./UpdateHooks";
import PostHooks from "./PostHooks";

const GameManageHook = async ({
  setSmoothData,
  smoothData,
  setTimeLeft,
  timeLeft,
  score,
  setScore,
}) => {
  let date = moment().format("YYYY-MM-D");
  let time = moment().format("h:mm a");
  const { userInfo } = AuthUser();

  // fetch data
  await fetch(
    `${server_url}/smoothMovement/specific?fieldName=${"userId"}&&fieldValue=${
      userInfo?._id
    }&&fieldName2=${"date"}&&fieldValue2=${date}`
  )
    .then((res) => res.json())
    .then((data) => {
      setSmoothData(data?.data);
      if (data?.data.length) {
        setTimeLeft(data?.data[0]?.remainingTime);
        setScore(data?.data[0]?.score);
      }
    });

  //  if  exist data then update
  if (smoothData?.length) {
    await UpdateHooks(
      `${server_url}/smoothMovement/updateSmoothMovement/${smoothData[0]?._id}`,
      { date: date, score: score, remainingTime: timeLeft }
    );
  } else {
    //  if  doesn't exist data then Post
    PostHooks(
      `${server_url}/smoothMovement/addSmoothMovement`,
      {
        userId: userInfo?._id,
        userName: userInfo?.name,
        date: date,
        score: score,
        remainingTime: timeLeft,
      },
      "Smooth movement score updated !"
    );
  }
};

export default GameManageHook;
