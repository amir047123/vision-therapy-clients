import { server_url } from "../Config/API";

export const singleImageUpload = async (formData, setMyImageUrl) => {
  const imageBaseUrl = `${server_url}/upload/single-image-upload`;

  console.log("LE", formData);
  console.log("LE 2", setMyImageUrl);

  fetch(imageBaseUrl, {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Data: ", data);
      if (data.status === "success") {
        console.log("Response:", data);
        setMyImageUrl(data.url);
      }
    });
};
