import React, { useState } from "react";
import gambarBg from "./../assets/rumah-crop.png";
import { Building2, Phone, Mail, Globe, Pencil, Save } from "lucide-react";
import EditableField from "./EditableField";
import "./../tailwind.css";
import Send from "./../assets/send.svg";
import { useCtx } from "../context/Context";
const Contact = () => {
    const user = localStorage.getItem("userRole");
    const isEditable = user === "admin";
    const { profileData, updateProfileData } = useCtx();
    const handleSave = (fieldName, newValue) => {
        const updated = { ...profileData, [fieldName]: newValue };
        updateProfileData(updated);
    };
    if (!profileData) return null;
    return (
        <>
            <div
                className="home min-h-screen bg-gray-100 flex justify-center items-center pt-10 md:pt-0"
                id="contact"
            >
                <div className="w-[80%] bg-white rounded-tl-[50px] rounded-tr-[50px] p-8 flex flex-col md:flex-row gap-10 ">
                    {/* KIRI: Informasi kantor */}
                    <div className="w-full md:w-1/2 space-y-10">
                        <h1 className="text-xl font-bold font-poppins">
                            PT MURGUNG
                        </h1>
                        <br />
                        <h2 className="text-lg font-semibold mt-2 pb-2">
                            {profileData?.nama_kantor}
                        </h2>

                        <div className="pl-6">
                            {/* {isEditable && (
                <EditableField
                  icon={null}
                  value={profileData.headline}
                  name="headline"
                  onSave={handleSave}
                  isEditable={isEditable}
                />
              )} */}
                            <EditableField
                                icon={<Building2 size={18} />}
                                value={profileData.nama_kantor}
                                name="nama_kantor"
                                onSave={handleSave}
                                isEditable={isEditable}
                            />
                            <EditableField
                                icon={<Phone size={18} />}
                                value={profileData.nomor_hp}
                                name="nomor_hp"
                                onSave={handleSave}
                                isEditable={isEditable}
                            />
                            <EditableField
                                icon={<Mail size={18} />}
                                value={profileData.email}
                                name="email"
                                onSave={handleSave}
                                isEditable={isEditable}
                            />
                            <EditableField
                                icon={<Globe size={18} />}
                                value={profileData.website_url}
                                name="website_url"
                                onSave={handleSave}
                                isEditable={isEditable}
                            />
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
                                <img
                                    src={Send}
                                    alt="Send"
                                    className="w-5 h-5"
                                />
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
