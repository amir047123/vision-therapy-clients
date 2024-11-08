import AuthHome from "../Component/LoginSingup/AuthHome";
import SignUp from "../Component/LoginSingup/SignUp";
import AboutUs from "../Pages/AboutUs/AboutUs";
import Home from "../Pages/Home/Home";
import ResetPassword from "../Component/ResetPassword/ResetPassword";
import InsertOtp from "../Component/ResetPassword/InsertOtp";
import SetNewPassword from "../Component/ResetPassword/SetNewPassword";
import ContactUs from "../Pages/ContactUs/ContactUs";
import Pricing from "../Component/Pricing/Pricing";
import PaymentSuccess from "../Pages/PaymentSuccess/PaymentSuccess";
import PaymentFail from "../Pages/PaymentFail/PaymentFail";
import PaymentCancel from "../Pages/PaymentCancel/PaymentCancel";
import Login from "../Component/LoginSingup/Login";

const PublicRoutes = [
  { path: "/", Component: Home },
  { path: "/home", Component: Home },
  { path: "/pricing", Component: Pricing },
  { path: "/aboutUs", Component: AboutUs },
  { path: "/contactUs", Component: ContactUs },
  { path: "/login", Component: AuthHome },
  { path: "/login/user", Component: Login },
  { path: "/signUp", Component: SignUp },
  { path: "/resetPassword", Component: ResetPassword },
  { path: "/insert-token", Component: InsertOtp },
  { path: "/setNewPassword", Component: SetNewPassword },
  { path: "/payment/success/:tran_id", Component: PaymentSuccess },
  { path: "/payment/fail/:tran_id", Component: PaymentFail },
  { path: "/payment/cancel/:tran_id", Component: PaymentCancel },
];

export default PublicRoutes;
