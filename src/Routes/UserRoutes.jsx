import JumpAndRunGame from "../Component/Game/JumpAndRunGame";
import MatchGabor from "../Component/Game/MatchGabor/MatchGabor";
import PingPongGame from "../Component/Game/PingPongGame";
import RapidMovement from "../Component/Game/RapidMovement";
import RockChartGame from "../Component/Game/RockChartGame";
import SearchQuest from "../Component/Game/SearchQuest";
import SmoothMovement from "../Component/Game/SmoothMovement";
import TheShooter from "../Component/Game/TheShooter";
import UserDashboardFaq from "../Component/UserDashboard/UserDashboardFaq/UserDashboardFaq";
import UserDashboardIndex from "../Component/UserDashboard/UserDashboardIndex";
import UserDashboardReports from "../Component/UserDashboard/UserDashboardReports/UserDashboardReports";
import UserDashboardSettings from "../Component/UserDashboard/UserDashboardSettings/UserDashboardSettings";
import ChangePassword from "../Component/UserDashboard/UserDashboardEditProfile/ChangePassword";
import EditProfile from "../Component/UserDashboard/UserDashboardEditProfile/EditProfile";
import ColorTrap from "../Component/Game/ColorTrap";
import RaindropGame from "../Component/Game/RaindropGame";
import RedBlueSmoothMovement from "../Component/Game/GameRedBlue/RedBlueSmoothMovement";
import RedBlueRapidMovement from "../Component/Game/GameRedBlue/RedBlueRapidMovement";
import RedBluePingPong from "../Component/Game/GameRedBlue/RedBluePingPong";
import RedBlueRainDrop from "../Component/Game/GameRedBlue/RedBlueRainDrop";
import BlueRedRockChart from "../Component/Game/GameRedBlue/BlueRedRockChart";
import RedBlueSearchQuest from "../Component/Game/GameRedBlue/RedBlueSearchQuest";
import BlueRedTheShooter from "../Component/Game/GameRedBlue/BlueRedTheShooter";
import BlueRedRandomObstacle from "../Component/Game/GameRedBlue/BlueRedRandomObstacle";

const UserRoutes = [
  { path: "overview", Component: UserDashboardIndex },
  { path: "settings", Component: UserDashboardSettings },
  { path: "faq", Component: UserDashboardFaq },
  { path: "reports", Component: UserDashboardReports },
  { path: "game/search-latter", Component: SearchQuest },
  { path: "game/rock-chart", Component: RockChartGame },
  { path: "game/ping-pong", Component: PingPongGame },
  { path: "game/jump-run", Component: JumpAndRunGame },
  // { path: "game/jump-run", Component: RandomObstacle },
  // { path: "game/ping-pong", Component: PingPong },
  { path: "game/the-shooter", Component: TheShooter },
  { path: "game/smooth-movement", Component: SmoothMovement },
  { path: "game/rapid-movement", Component: RapidMovement },
  { path: "game/match-gabor", Component: MatchGabor },
  { path: "game/color-trap", Component: ColorTrap },
  { path: "game/rain-drop", Component: RaindropGame },

  //Red and blue Game
  {
    path: "game/red-and-blue-smoothMovement",
    Component: RedBlueSmoothMovement,
  },
  {
    path: "game/red-and-blue-rapidmovement",
    Component: RedBlueRapidMovement,
  },
  {
    path: "game/red-and-blue-pingpong",
    Component: RedBluePingPong,
  },
  {
    path: "game/red-and-blue-raindrop",
    Component: RedBlueRainDrop,
  },
  {
    path: "game/red-and-blue-rockchart",
    Component: BlueRedRockChart,
  },
  {
    path: "game/red-and-blue-searchquest",
    Component: RedBlueSearchQuest,
  },
  {
    path: "game/red-and-blue-theshooter",
    Component: BlueRedTheShooter,
  },
  {
    path: "game/red-and-blue-randomobstacle",
    Component: BlueRedRandomObstacle,
  },

  { path: "editProfile", Component: EditProfile },
  { path: "changePassword", Component: ChangePassword },
];

export default UserRoutes;
