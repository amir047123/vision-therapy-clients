import { Route, Routes } from "react-router-dom";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Main from "./Pages/Home/Main/Main";
import PublicRoutes from "./Routes/PublicRoutes";
import UserRoutes from "./Routes/UserRoutes";
import UserDashboard from "./Pages/UserDashboard/UserDashboard";
import UserDashboardIndex from "./Component/UserDashboard/UserDashboardIndex";
import { ToastContainer } from "react-toastify";
import SuperAdminDashboard from "./Pages/SuperAdminDashboard/SuperAdminDashboard";
import SuperAdminDashboardIndex from "./Component/SuperAdminDashboard/SuperAdminDashboardIndex";
import SuperAdminRoute from "./Routes/SuperAdminRoute";
import Notfound from "./Shared/Notfound";
import PrivateRoute from "./Routes/PrivateRoute";

function App() {
  return (
    <div className="App max-w-[1400px] mx-auto">
      <Routes>
        <Route path="*" element={<Notfound />} />
        <Route
          path="/"
          element={
            <>
              <Main />
            </>
          }
        >
          {PublicRoutes.map(({ path, Component }, index) => (
            <Route key={index + 45} path={path} element={<Component />} />
          ))}
        </Route>

        <Route
          path="/superAdminDashboard"
          element={
            <PrivateRoute allowedRoles={["superAdmin"]}>
              <SuperAdminDashboard />
            </PrivateRoute>
          }
        >
          <Route index element={<SuperAdminDashboardIndex />} />
          {SuperAdminRoute.map(({ path, Component }, index) => (
            <Route key={index} path={path} element={<Component />} />
          ))}
        </Route>

        <Route
          path="/userDashboard"
          element={
            <PrivateRoute allowedRoles={["user"]}>
              <UserDashboard />
            </PrivateRoute>
          }
        >
          <Route index element={<UserDashboardIndex />} />
          {UserRoutes.map(({ path, Component }, index) => (
            <Route key={index} path={path} element={<Component />} />
          ))}
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
