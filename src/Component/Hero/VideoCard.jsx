import React from "react";

const VideoCard = ({ lecture }) => {
  return (
    <div className="block rounded-lg p-4 shadow-sm shadow-primary/20 bg-white">
      <iframe
        className="rounded-lg"
        width="100%"
        height="200"
        src={lecture?.videoUrl}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
        allowfullscreen
      ></iframe>

      <div className="mt-2">
        <dl>
          <div>
            <dt className="sr-only">lectures name</dt>
            <dd className="text-sm text-gray-500">{lecture?.lecturersName}</dd>
          </div>

          <div>
            <dt className="sr-only">title</dt>
            <dd className="font-medium">{lecture?.videoTitle}</dd>
          </div>
        </dl>

        <div className="mt-6 flex items-center gap-8 text-sm">
          <p>{lecture?.videoDes}</p>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
