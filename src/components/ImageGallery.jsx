import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Right from "../assets/right.svg";
import Left from "../assets/left.svg";

export default function ImageGallery({ images, initialIndex, onClose }) {
    const [current, setCurrent] = useState(initialIndex);
    const [direction, setDirection] = useState(0);

    useEffect(() => {
        setCurrent(initialIndex);
    }, [initialIndex]);

    const variants = {
        enter: (direction) => ({
            x: direction > 0 ? 300 : -300,
            opacity: 0,
            position: "absolute",
        }),
        center: {
            x: 0,
            opacity: 1,
            position: "absolute",
        },
        exit: (direction) => ({
            x: direction > 0 ? -300 : 300,
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

    const isImageListValid = Array.isArray(images) && images.length > 0;

    return (
        <div
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
            className="fixed inset-0 z-[100] backdrop-blur-sm bg-black/30 flex flex-col items-center justify-center p-4"
        >
            {!isImageListValid ? (
                <div className="md:w-[30%] w-full bg-white p-6 rounded-lg shadow-md text-center text-gray-700">
                    <p className="text-lg font-semibold">
                        Gambar tidak tersedia
                    </p>
                    <button
                        onClick={onClose}
                        className="t-4 px-4 py-2 bg-amber-400 text-white rounded hover:bg-amber-200"
                    >
                        Tutup
                    </button>
                </div>
            ) : (
                <>
                    {/* Gambar utama */}
                    <div className="relative w-full max-w-[810px] aspect-[4/3] mb-4 flex items-center justify-center overflow-hidden rounded-lg">
                        <button
                            onClick={handlePrev}
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/50 p-2 rounded-full shadow-md z-10"
                        >
                            <img
                                src={Left}
                                alt="Left"
                                className="w-6 h-6 md:w-10 md:h-10"
                            />
                        </button>

                        <AnimatePresence
                            initial={false}
                            custom={direction}
                            mode="sync"
                        >
                            <motion.img
                                key={current}
                                src={images[current]}
                                className="w-full h-full object-contain rounded-lg absolute"
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{
                                    x: {
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 30,
                                    },
                                    opacity: { duration: 0.2 },
                                }}
                            />
                        </AnimatePresence>

                        <button
                            onClick={handleNext}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/50 p-2 rounded-full shadow-md z-10"
                        >
                            <img
                                src={Right}
                                alt="Right"
                                className="w-6 h-6 md:w-10 md:h-10"
                            />
                        </button>
                    </div>

                    {/* Thumbnail */}
                    <div className="flex gap-2 overflow-x-auto scrollbar-hide max-w-full md:max-w-[700px] pt-2 px-1">
                        {images.map((img, index) => (
                            <motion.img
                                key={index}
                                src={img}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setDirection(index > current ? 1 : -1);
                                    setCurrent(index);
                                }}
                                whileHover={{ scale: 1.05 }}
                                animate={{
                                    scale: current === index ? 1.1 : 1,
                                    borderColor:
                                        current === index
                                            ? "#ffffff"
                                            : "transparent",
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 20,
                                }}
                                className="w-16 h-12 md:w-20 md:h-14 object-cover cursor-pointer rounded-md border-2"
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
