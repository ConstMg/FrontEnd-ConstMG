import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Right from "../assets/right.svg";
import Left from "../assets/left.svg";

export default function ImageGallery({ images, initialIndex, onClose }) {
    const [current, setCurrent] = useState(initialIndex);
    const [direction, setDirection] = useState(0); // -1 = kiri, 1 = kanan

    useEffect(() => {
        setCurrent(initialIndex);
    }, [initialIndex]);

    const variants = {
        enter: (direction) => ({
            x: direction > 0 ? 100 : -100,
            opacity: 0,
            position: "absolute",
        }),
        center: {
            x: 0,
            opacity: 1,
            position: "relative",
        },
        exit: (direction) => ({
            x: direction > 0 ? -100 : 100,
            opacity: 0,
            position: "absolute",
        }),
    };

    const handlePrev = (e) => {
        e.stopPropagation();
        if (current > 0) {
            setDirection(-1);
            setCurrent((prev) => prev - 1);
        }
    };

    const handleNext = (e) => {
        e.stopPropagation();
        if (current < images.length - 1) {
            setDirection(1);
            setCurrent((prev) => prev + 1);
        }
    };

    return (
        <div
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
            className="fixed inset-0 backdrop-blur-sm bg-black/30 z-10 flex flex-col items-center justify-center p-6"
        >
            <div className="relative md:w-[810px] h-[430px] mb-4 flex items-center justify-center overflow-hidden rounded-lg">
                {/* Tombol kiri */}
                <button
                    onClick={handlePrev}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/50 px-2 py-1 rounded-full shadow-md z-10"
                >
                    <img src={Left} alt="Left" className="w-20 h-20" />
                </button>

                {/* Gambar utama dengan animasi slide */}
                <AnimatePresence custom={direction} mode="wait">
                    <motion.img
                        key={images[current]}
                        src={images[current]}
                        className="w-full h-full object-cover rounded-lg"
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 },
                        }}
                    />
                </AnimatePresence>

                {/* Tombol kanan */}
                <button
                    onClick={handleNext}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/50 px-2 py-1 rounded-full shadow-md z-10"
                >
                    <img src={Right} alt="Right" className="w-20" />
                </button>
            </div>

            {/* Thumbnail */}
            <div className="flex gap-2 overflow-x-auto max-w-[700px] pt-4">
                {images.map((img, index) => (
                    <img
                        key={index}
                        src={img}
                        onClick={(e) => {
                            e.stopPropagation();
                            setDirection(index > current ? 1 : -1);
                            setCurrent(index);
                        }}
                        className={`w-20 h-14 object-cover cursor-pointer rounded-md border-2 ${
                            current === index
                                ? "border-white"
                                : "border-transparent"
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}
