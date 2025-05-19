import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import CSS AOS
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
    useEffect(() => {
        AOS.init({ duration: 800, once: true }); // durasi animasi 800ms, sekali animasi saja
    }, []);
    const handleSave = (fieldName, newValue) => {
        const updated = { ...profileData, [fieldName]: newValue };
        updateProfileData(updated);
    };
    if (!profileData) return null;
    return (
        <>
            <div className="contact min-h-screen bg-gradient-to-b from-yellow-50 to-white flex justify-center items-center py-16 px-4 md:px-0">
                <div className="w-full max-w-6xl bg-white rounded-tl-[50px] rounded-tr-[50px] p-10 md:p-14 flex flex-col md:flex-row gap-12 shadow-lg">
                    {/* KIRI: Informasi kantor */}
                    <div
                        className="w-full md:w-1/2 space-y-8"
                        data-aos="fade-right"
                        data-aos-delay="200"
                    >
                        <h1 className="text-3xl font-extrabold font-poppins text-yellow-600">
                            PT MURGUNG
                        </h1>
                        <h2 className="text-2xl font-semibold mt-2 text-gray-800 border-b-2 border-yellow-400 pb-2">
                            {profileData?.nama_kantor}
                        </h2>

                        <div className="pl-6 space-y-6">
                            <EditableField
                                icon={
                                    <Building2
                                        size={22}
                                        className="text-yellow-600"
                                    />
                                }
                                value={profileData.nama_kantor}
                                name="nama_kantor"
                                onSave={handleSave}
                                isEditable={isEditable}
                            />
                            <EditableField
                                icon={
                                    <Phone
                                        size={22}
                                        className="text-yellow-600"
                                    />
                                }
                                value={profileData.nomor_hp}
                                name="nomor_hp"
                                onSave={handleSave}
                                isEditable={isEditable}
                            />
                            <EditableField
                                icon={
                                    <Mail
                                        size={22}
                                        className="text-yellow-600"
                                    />
                                }
                                value={profileData.email}
                                name="email"
                                onSave={handleSave}
                                isEditable={isEditable}
                            />
                            <EditableField
                                icon={
                                    <Globe
                                        size={22}
                                        className="text-yellow-600"
                                    />
                                }
                                value={profileData.website_url}
                                name="website_url"
                                onSave={handleSave}
                                isEditable={isEditable}
                            />
                        </div>
                    </div>

                    {/* KANAN: Form kontak */}
                    <div
                        className="w-full md:w-1/2 flex justify-center items-center"
                        data-aos="fade-left"
                        data-aos-delay="300"
                    >
                        <form className="flex flex-col gap-6 w-full max-w-[640px] px-6 md:px-0">
                            <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    className="flex-1 h-14 bg-yellow-50 rounded-3xl border border-yellow-300 p-4 text-base placeholder-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                                />
                                <input
                                    type="email"
                                    placeholder="Your Email"
                                    className="flex-1 h-14 bg-yellow-50 rounded-3xl border border-yellow-300 p-4 text-base placeholder-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                                />
                            </div>

                            <textarea
                                placeholder="Your Message"
                                rows="5"
                                className="w-full bg-yellow-50 rounded-3xl border border-yellow-300 p-5 text-base placeholder-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none transition"
                            ></textarea>

                            <button
                                type="submit"
                                className="w-full h-14  text-white font-bold rounded-3xl flex items-center justify-center gap-3 shadow-md cursor-pointer transition-all bg-amber-400 px-6 py-2 
  border-amber-500 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
  active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
                            >
                                <img
                                    src={Send}
                                    alt="Send"
                                    className="w-6 h-6"
                                />
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Contact;
