import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AuthUser() {
  const navigate = useNavigate();

  const getToken = () => {
    const tokenString = localStorage.getItem("medmyneAccess");
    const userToken = JSON.parse(tokenString);
    return userToken;
  };

  const getUser = () => {
    const userString = localStorage.getItem("medmynePhone");
    const user_detail = JSON.parse(userString);
    return user_detail;
  };

  const getUserRole = () => {
    const roleString = localStorage.getItem("medmyneRole");
    const role_name = JSON.parse(roleString);
    return role_name;
  };

  const userInfoString = localStorage.getItem("medmyne_user_info");
  const userInfo = JSON.parse(userInfoString);

  const [token, setToken] = useState(getToken());
  const [user, setUser] = useState(getUser());
  const [userRole, setUserRole] = useState(getUserRole());
  const [email, setEmail] = useState(getUser());
  // const [userInfo, setUserInfo] = useState([]);

  const saveToken = (email, access, role, userInfo, userIp) => {
    localStorage.setItem("medmyneAccess", JSON.stringify(access));
    localStorage.setItem("medmyneEmail", JSON.stringify(email));
    localStorage.setItem("medmyneRole", JSON.stringify(role));
    localStorage.setItem("medmyne_user_info", JSON.stringify(userInfo));
    localStorage.setItem("medmyne_user_ip", JSON.stringify(userIp));

    setEmail(email);
    setToken(token);
    // setUserInfo(userInfo);
    setUser(user);
    setUserRole(userRole);
    // setUserIp(userIp);
    navigate("/");
  };

  const logout = () => {
    localStorage.clear();
    fetch(`http://localhost:5000/api/v1/user/delete-ip/${userInfo?._id}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.modifiedCount === 1) {
          toast.success("Successfully LogOut");
          navigate(`/`);
          window.location.reload();
        }
      });
  };

  const http = axios.create({
    baseURL: "http://localhost:5000/api/v1",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return {
    setToken: saveToken,
    token,
    userRole,
    getToken,
    http,
    email,
    // getUserInfo,
    userInfo,
    logout,
    // userIp,
  };
}
