import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

const PostHooks = (url, data, successMsg) => {
  fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.status === "success") {
        return swal(successMsg ? successMsg : "Success");
      } else {
        return swal(
          "Oops",
          `${data.error.split(":").slice(2).join(":")}`,
          "error"
        );
      }
    });
};

export default PostHooks;
