const ProjectImages = ({ images = [], onClose}) => {
    return (
        <div className="relative flex flex-wrap justify-center items-center gap-4 w-3/4 h-2/3 bg-white p-4 rounded-lg shadow-md overflow-auto">
            <button
                onClick={onClose}
                className="sticky top-0 z-20 w-full p-2 flex justify-end text-gray-500 hover:text-gray-700 cursor-pointer"
            >
                ✕
            </button>
            {images.length > 0 ? images.map((image, index) => (
                <img
                    key={index}
                    src={image}
                    alt={`Project ${index + 1}`}
                    className="w-3/4 h-1/2 md:w-1/3 lg:w-1/4 p-2 rounded-lg shadow-lg"
                />
            )) : (
                <p className="text-gray-500 text-center w-full">
                    No images available for this project.
                </p>
            )}
            <div className="w-3/4 h-1/2 md:w-1/3 lg:w-1/4 p-2 rounded-lg shadow-lg flex flex-col justify-center items-center cursor-pointer">
            <p className="text-xl">+</p>
            <p className="text-xl">Tambah Gambar</p>
            </div>
        </div>
    );
};

export default ProjectImages;
