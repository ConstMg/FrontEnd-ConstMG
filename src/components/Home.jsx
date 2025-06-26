import { useEffect, useState } from "react";
import gambarBg from "./../assets/rumah-crop.png";
import "./../tailwind.css";
import EditableField from "./EditableField";
import Typewriter from "typewriter-effect";
import { useCtx } from "../context/Context";
import { Link } from "react-scroll";
import { motion } from "framer-motion";
const Home = () => {
    const { profileData, updateProfileData } = useCtx();
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const user = localStorage.getItem("userRole");
    const isEditable = user === "admin";

    const handleSave = (fieldName, newValue) => {
        const updated = { ...profileData, [fieldName]: newValue };
        // Jika headline adalah array, pastikan kita mengubahnya menjadi array
        console.log("handleSave called with:", updated);
        updateProfileData(updated);
    };

    // ⛳️ Pindahkan useEffect sebelum return apa pun
    useEffect(() => {
        const handleMouseMove = (e) => {
            const x = (e.clientX - window.innerWidth / 5) * 0.08;
            const y = (e.clientY - window.innerHeight / 2) * 0.06;
            setOffset({ x, y });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    // ⛔️ Hook sudah aman di atas, baru di sini boleh return null
    if (!profileData) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
            </div>
        );
    }

    return (
        <div className="home h-dvh relative" id="main">
            <motion.img
                src={gambarBg}
                className="absolute h-5/6 right-[-15px] bottom-0 pointer-events-none"
                initial={{ x: 500, opacity: 0 }}
                animate={{
                    x: offset.x,
                    y: offset.y,
                    opacity: 1,
                }}
                transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 90,
                    mass: 1,
                }}
                alt="rumah"
            />

            <motion.div
                className="text-space absolute h-full w-full md:w-1/2 flex flex-col justify-evenly items-start gap-4 px-6 py-12 md:p-20"
                initial={{ x: -500, opacity: 0 }} // dari kiri
                animate={{ x: 0, opacity: 1 }} // ke tengah
                transition={{
                    type: "spring",
                    stiffness: 70,
                    damping: 20,
                    mass: 0.5,
                    delay: 0.1, // cocokkan dengan gambar
                }}
            >
                {/* Semua konten kamu di sini */}
                {isEditable ? (
                    // <EditableField
                    //     value={profileData.headline}
                    //     name="headline"
                    //     onSave={handleSave}
                    //     isEditable={isEditable}
                    //     className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-amber-400 font-bold leading-tight"
                    // />
                    <EditableField
                        value={profileData.headline.join("\n")}
                        name="headline"
                        onSave={(name, value) => {
                            const newHeadline = value.split("\n");
                            console.log("New Headline:", newHeadline);
                            handleSave(name, newHeadline);
                        }}
                        isEditable={isEditable}
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-amber-400 font-bold leading-tight"
                    />
                ) : (
                    <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-amber-400 font-bold leading-tight">
                        <Typewriter
                            // options={{
                            //     strings: [
                            //         profileData?.headline,
                            //         "Kami fokus untuk anda.",
                            //         "Interior Design",
                            //     ],
                            //     autoStart: true,
                            //     loop: true,
                            // }}
                            options={{
                                strings: profileData.headline, // langsung pakai array dari backend
                                autoStart: true,
                                loop: true,
                            }}
                        />
                    </p>
                )}

                <EditableField
                    // icon={<Building2 size={18} />}
                    className="text-base sm:text-lg md:text-xl text-gray-700"
                    value={profileData?.main_description}
                    name="main_description"
                    onSave={handleSave}
                    isEditable={isEditable}
                />
                {/* <p className="text-base sm:text-lg md:text-xl text-gray-700">
          {profileData?.main_description}
        </p> */}

                <div className="h-[48px] inline-block">
                    <Link
                        to="visi-misi"
                        className="absolute cursor-pointer transition-all bg-amber-400 text-white px-6 py-2 rounded-lg border-amber-500 
          border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
          active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
                    >
                        Explore it
                    </Link>
                </div>
            </motion.div>
            {/* <div className="text-space absolute h-full w-full md:w-1/2 flex flex-col justify-evenly items-start gap-4 px-6 py-12 md:p-20"></div> */}
        </div>
    );
};

export default Home;
