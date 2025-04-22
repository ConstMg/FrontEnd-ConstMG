import React, { useState } from "react";
import gambarBg from "./../assets/rumah-crop.png";
import "./../tailwind.css";

const Contact = () => {
  return (
    <>
      <div
        className="home min-h-screen bg-gray-100 flex justify-center items-center"
        id="contact"
      >
        <div className="w-[90%] bg-white rounded-tl-[50px] rounded-tr-[50px] p-8 flex flex-col md:flex-row gap-10">
          {/* KIRI: Informasi kantor */}
          <div className="w-full md:w-1/2 space-y-10">
            <h1 className="text-xl font-bold font-poppins">PT MURGUNG</h1>
            <h2 className="text-lg font-semibold mt-2">HEAD OFFICE</h2>
            <div className="pl-6">
              <p className="mt-1">
                🏢 Jl. Apa No. 1-10 Kota 123456
                <br />
                Kota - Indonesia
              </p>
              <p>📞 +62 123456789</p>
              <p>📧 email@email.com</p>
              <p>🌐 www.murgung.com</p>
            </div>

            <h2 className="text-lg font-semibold">REPRESENTATIVE OFFICE</h2>
            <div className="pl-6">
              <p className="mt-1">
                🏢 Jl. Apa No. 1-10 Kota 123456
                <br />
                Kota - Indonesia
              </p>
            </div>
            <h2 className="text-lg font-semibold">WORKSHOP</h2>
            <div className="pl-6">
              <p className="mt-1">
                🏢 Jl. Apa No. 1-10 Kota 123456
                <br />
                Kota - Indonesia
              </p>
              <p>📞 +62 123456789</p>
            </div>
          </div>

          {/* KANAN: Form kontak */}
          <div className="w-full md:w-1/2 flex justify-center items-center">
            <div className="flex flex-col items-center gap-10 w-full max-w-[640px]">
              <div className="flex flex-col md:flex-row gap-4 w-full justify-center">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full md:w-80 h-14 bg-white rounded-[20px] border border-neutral-300 p-2"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full md:w-80 h-14 bg-white rounded-[20px] border border-neutral-300 p-2"
                />
              </div>

              <textarea
                placeholder="Your Message"
                rows="4"
                className="w-full h-28 bg-white rounded-[20px] border border-neutral-300 p-4"
              ></textarea>

              <button className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-3 px-6 rounded-full flex items-center justify-center gap-2 transition">
                ✉️ Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
