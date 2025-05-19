import { useEffect, useState } from "react";
import gambarBg from "./../assets/rumah-crop.png";
import "./../tailwind.css";
import EditableField from "./EditableField";
import Typewriter from "typewriter-effect";
import { useCtx } from "../context/Context";
import { Link } from "react-scroll";

const Home = () => {
    const { profileData, updateProfileData } = useCtx();
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const user = localStorage.getItem("userRole");
    const isEditable = user === "admin";

    const handleSave = (fieldName, newValue) => {
        const updated = { ...profileData, [fieldName]: newValue };
        updateProfileData(updated);
    };

    // ⛳️ Pindahkan useEffect sebelum return apa pun
    useEffect(() => {
        const handleMouseMove = (e) => {
            const x = (e.clientX - window.innerWidth / 2) * 0.02;
            const y = (e.clientY - window.innerHeight / 2) * 0.02;
            setOffset({ x, y });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    // ⛔️ Hook sudah aman di atas, baru di sini boleh return null
    if (!profileData) return null;

    return (
        <div className="home h-dvh relative" id="main">
            <img
                src={gambarBg}
                className="absolute h-5/6 right-[-15px] bottom-0  transition-transform duration-75 ease-out pointer-events-none"
                style={{
                    transform: `translate(${offset.x}px, ${offset.y}px)`,
                }}
                alt="rumah"
            />
            <div className="text-space absolute h-full w-full md:w-1/2 flex flex-col justify-evenly items-start gap-4 px-6 py-12 md:p-20">
                {isEditable ? (
                    <EditableField
                        value={profileData.headline}
                        name="headline"
                        onSave={handleSave}
                        isEditable={isEditable}
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-amber-400 font-bold leading-tight"
                    />
                ) : (
                    <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-amber-400 font-bold leading-tight">
                        <Typewriter
                            options={{
                                strings: [profileData?.headline],
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
                    name="main_desciption"
                    onSave={handleSave}
                    isEditable={isEditable}
                />
                {/* <p className="text-base sm:text-lg md:text-xl text-gray-700">
          {profileData?.main_description}
        </p> */}

                <div className="h-[48px] inline-block">
                    <Link
                        to="project"
                        className="absolute cursor-pointer transition-all bg-amber-400 text-white px-6 py-2 rounded-lg border-amber-500 
          border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
          active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
                    >
                        Explore it
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
