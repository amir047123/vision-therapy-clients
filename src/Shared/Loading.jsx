import React from "react";
import { Dna } from "react-loader-spinner";

const Loading = () => {
  return (
    <div
      className="h-screen flex justify-center items-center w-full
    "
    >
      <Dna
        visible={true}
        height="80"
        width="80"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperclassName="dna-wrapper"
      />
    </div>
  );
};

export default Loading;
