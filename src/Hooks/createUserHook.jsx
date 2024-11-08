import swal from "sweetalert";
import { server_url } from "../Config/API";

const CreateUserHook = async (userInfo, navigate) => {
  fetch(`${server_url}/user/signup`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(userInfo),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "success") {
        navigate("/login");
        return swal(
          "Good job!",
          "Account Created ! Now you can login your account!",
          "success"
        );
      } else if (data.error.includes("duplicate key error")) {
        return swal("Oops", `${data.error}`, "error");
      } else if (data.error.includes("This email already exists")) {
        return swal(
          "Oops",
          `${data.error.split(":").slice(2).join(":")}`,
          "error"
        );
      } else {
        swal("Oops", `${data.error}`, "error");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export default CreateUserHook;
