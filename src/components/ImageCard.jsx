import React from "react";

const ImageCard = ({ imagePath, variant }) => {
  return (
    <div className="w-96 h-64 max-w-[1320px] pt-6 flex flex-col justify-center items-start">
      <div className="w-full h-60 max-w-[1320px] px-3 flex flex-col justify-start items-start">
        <div
          data-:hover="false"
          data-variant={variant}
          className="self-stretch relative rounded-[10px] flex flex-col justify-center items-center overflow-hidden"
        >
          <img
            className="w-96 h-60 max-w-96 relative rounded-[10px]"
            src={imagePath}
            alt={`image-${variant}`}
          />
          <div className="w-96 h-60 pr-5 pt-5 left-0 top-0 absolute bg-color-black--10%/10 rounded-[10px] inline-flex justify-end items-start">
            <div className="w-14 self-stretch" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
