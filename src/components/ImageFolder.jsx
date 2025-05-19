import React from "react";

const ImageFolder = ({ onClick }) => {
    return (
        <>
            <section className="relative group flex flex-col items-center justify-center w-full h-full" onClick={onClick}>
                <div className="file relative w-10 h-7 cursor-pointer origin-bottom [perspective:1500px] z-30">
                    <div className="work-5 bg-amber-600 w-full h-full origin-top rounded-lg rounded-tl-none group-hover:shadow-[0_5px_10px_rgba(0,0,0,.2)] transition-all ease duration-300 relative after:absolute after:content-[''] after:bottom-[99%] after:left-0 after:w-3.5 after:h-0.75 after:bg-amber-600 after:rounded-t-lg before:absolute before:content-[''] before:-top-[3px] before:left-[12.5px] before:w-0.75 before:h-0.75 before:bg-amber-600 before:[clip-path:polygon(0_35%,0%_100%,50%_100%);]"></div>
                    <div className="work-4 absolute inset-0.5 bg-zinc-400 rounded-lg transition-all ease duration-300 origin-bottom select-none group-hover:[transform:rotateX(-20deg)]"></div>
                    <div className="work-3 absolute inset-0.5 bg-zinc-300 rounded-lg transition-all ease duration-300 origin-bottom group-hover:[transform:rotateX(-30deg)]"></div>
                    <div className="work-2 absolute inset-0.5 bg-zinc-200 rounded-lg transition-all ease duration-300 origin-bottom group-hover:[transform:rotateX(-38deg)]"></div>
                    <div className="work-1 absolute bottom-0 bg-gradient-to-t from-amber-500 to-amber-400 w-full h-[27.5px] rounded-lg rounded-tr-none after:absolute after:content-[''] after:bottom-[99%] after:right-0 after:w-[25px] after:h-[3px] after:bg-amber-400 after:rounded-t-lg before:absolute before:content-[''] before:-top-[2px] before:right-[24.5px] before:size-0.5 before:bg-amber-400 before:[clip-path:polygon(100%_14%,50%_100%,100%_100%);] transition-all ease duration-300 origin-bottom flex items-end group-hover:shadow-[inset_0_4px_7px_#fbbf24,_inset_0_-4px_7px_#d97706] group-hover:[transform:rotateX(-46deg)_translateY(0.25px)]"></div>
                </div>
            </section>
        </>
    );
};

export default ImageFolder;