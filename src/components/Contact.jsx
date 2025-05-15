import React, { useState } from "react";
import gambarBg from "./../assets/rumah-crop.png";
import "./../tailwind.css";
import Send from "./../assets/send.svg";

const Contact = () => {
  return (
    <>
      <div
        className="home min-h-screen bg-gray-100 flex justify-center items-center pt-10 md:pt-0"
        id="contact"
      >
        <div className="w-[80%] bg-white rounded-tl-[50px] rounded-tr-[50px] p-8 flex flex-col md:flex-row gap-10 ">
          {/* KIRI: Informasi kantor */}
          <div className="w-full md:w-1/2 space-y-10">
            <h1 className="text-xl font-bold font-poppins">PT MURGUNG</h1>
            <br />
            <h2 className="text-lg font-semibold mt-2 pb-2">HEAD OFFICE</h2>

            <div className="pl-6">
              <p className="pb-2">
                🏢 Jl. Apa No. 1-10 Kota 123456 Kota - Indonesia
              </p>
              <p className="pb-2">📞 +62 123456789</p>
              <p className="pb-2">📧 email@email.com</p>
              <p className="pb-2">🌐 www.murgung.com</p>
            </div>
            <br />
          </div>

          {/* KANAN: Form kontak */}
          <div className="w-full md:w-1/2 flex justify-center items-center">
            <div className="flex flex-col items-center gap-8 w-full max-w-[640px] px-4">
              <div className="flex flex-col gap-4 w-full">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full h-14 bg-white rounded-[20px] border border-neutral-300 p-3 text-sm md:text-base"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full h-14 bg-white rounded-[20px] border border-neutral-300 p-3 text-sm md:text-base"
                />
              </div>

              <textarea
                placeholder="Your Message"
                rows="4"
                className="w-full h-28 bg-white rounded-[20px] border border-neutral-300 p-4 text-sm md:text-base"
              ></textarea>

              <button className="w-full h-14 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-3 px-6 rounded-[20px] flex items-center justify-center gap-2 transition">
                <img src={Send} alt="Send" className="w-5 h-5" />
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
