import React from "react";

type LoaderProps = {
  height: string;
  width: string;
};

function OverlayLoader({ height, width }: LoaderProps) {
  return (
    <div
      className={`w-screen h-screen fixed top-0 left-0 bottom-0 right-0 bg-slate-500 bg-opacity-80 text-white font-rajdhani font-medium flex justify-center items-center`}
    >
      <div
        className={`w-1/3 h-1/2 bg-blue-400 rounded-md flex flex-col items-center justify-center border border-white`}
      >
        <div
          className={`h-8 w-8 rounded-full border-b-2 border-white animate-spin`}
        ></div>
        <p className={`mt-6 text-2xl`}>Loading...</p>
      </div>
    </div>
  );
}

export default OverlayLoader;
