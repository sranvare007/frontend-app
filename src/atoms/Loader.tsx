import React from "react";

type LoaderProps = {
  height: string;
  width: string;
};

function Loader({ height, width }: LoaderProps) {
  return (
    <div
      className={`h-[${height}] w-[${width}] rounded-full border-b-2 border-l-2 border-gray-600 animate-spin`}
    ></div>
  );
}

export default Loader;
