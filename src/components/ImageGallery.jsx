import { useState, useEffect } from "react";
import Right from "../assets/right.svg";
import Left from "../assets/left.svg";
export default function ImageGallery({ images, initialIndex, onClose }) {
  const [current, setCurrent] = useState(initialIndex);

  useEffect(() => {
    setCurrent(initialIndex);
  }, [initialIndex]);

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      className="fixed inset-0 backdrop-blur-sm bg-black/30 z-10 flex flex-col items-center justify-center p-6"
    >
      <div className="relative md:w-[810px] h-[430px] mb-4 flex items-center justify-center">
        {/* Tombol kiri */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setCurrent((prev) => Math.max(prev - 1, 0));
          }}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/50 px-2 py-1 rounded-full shadow-md"
        >
          <img src={Left} alt="Left" className="w-20 h-20" />
        </button>

        {/* Gambar utama */}
        <img
          src={images[current]}
          className="w-full h-full object-cover rounded-lg"
        />

        {/* Tombol kanan */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setCurrent((prev) => Math.min(prev + 1, images.length - 1));
          }}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/50 px-2 py-1 rounded-full shadow-md"
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
              setCurrent(index);
            }}
            className={`w-20 h-14 object-cover cursor-pointer rounded-md border-2 ${
              current === index ? "border-white" : "border-transparent"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
