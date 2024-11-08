import swal from "sweetalert";

const UpdateHooks = async (url, data, on = false, message = "") => {
  fetch(url, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("from Data", data);
      if (data.status === "success") {
        if (on) swal("Success", message, "success");
      } else if (data.status === "fail") {
        swal(
          "Error",
          `${
            data.message
              ? data.message
              : data.error.split(":").slice(2).join(":")
          }`,
          "error"
        );
      }
    })
    .catch((err) => {
      console.log("from nid update", err);
    });
};

export default UpdateHooks;
