import React, { useState } from "react";
import ImageCard from "./ImageCard";
import "./../tailwind.css";

const About = () => {
  return (
    <>
      <div
        className="home min-h-screen bg-gray-100 flex justify-center items-center"
        id="about"
      >
        <div className="w-[1320px] max-w-[1320px] px-3 py-12 inline-flex flex-col justify-start items-center gap-12">
          <div className="w-[900px] h-36 max-w-[900px] relative">
            <div className="w-[900px] px-80 left-0 top-[32px] absolute inline-flex flex-col justify-start items-center">
              <div className="text-center justify-center text-color-blue-10 text-4xl font-medium font-['Poppins'] leading-[48px]">
                ABOUT US
              </div>
            </div>
            <div className="w-[900px] px-2.5 left-0 top-[104px] absolute inline-flex flex-col justify-start items-center">
              <div className="text-center justify-center text-color-grey-46 text-base font-normal font-['Poppins'] leading-normal">
                We takes pride in its successful our project portfolio, with
                each project reflecting their our commitment to quality,
                timeliness,
                <br />
                and client satisfaction. Here are some notable projects they
                have we completed.
              </div>
            </div>
            <div className="w-52 h-6 px-4 left-[349.67px] top-[-0.50px] absolute" />
          </div>
          <div className="self-stretch flex flex-col justify-center items-center gap-6">
            <div className="w-full max-w-[1320px] flex flex-wrap justify-center gap-6">
              <ImageCard
                imagePath="https://indokontraktor.com/uploads/0000/1/2020/04/04/thumbnail2.png"
                variant="1"
              />
              <ImageCard
                imagePath="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhBAxEWU4n6s52hNJOW7tkLVNkBgMCRbU3AA&s"
                variant="2"
              />
              <ImageCard
                imagePath="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTurx-nMXRQz_tFgev_BzMgLs0z1PIEL49W6OiggbuHcOtgzF2WR6Qh6i-GiUl__eh3qu4&usqp=CAU"
                variant="3"
              />
              <ImageCard
                imagePath="https://www.autodesk.com/blogs/construction/wp-content/uploads/2024/07/140-Common-Construction-Terms-to-Know.jpg"
                variant="4"
              />
              <ImageCard
                imagePath="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8pJwY-IjmLU-5MgKBJmtELnlLtlvnpX4tDw&s"
                variant="5"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
