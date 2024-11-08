import React from "react";
import img1 from "../../Assets/Media Gallery/Photo gallery.png";

const MediaGallery = () => {
  return (
    <div className=" py-10 lg:w-10/12 w-11/12  mx-auto">
      <img className="rounded-md w-full" src={img1} alt="" />
    </div>
  );
};

export default MediaGallery;
