import React from "react";

const ConfirmationCard = ({ 
  variant = "delete", 
  onConfirm, 
  onCancel,
  itemname = "item"
}) => {
    // Configuration based on variant
    const config = {
        delete: {
            bgColor: "bg-white",
            borderColor: "border-gray-50",
            iconFill: "fill-red-500",
            title: "Kamu yakin?",
            message: `Yakin ingin menghapus ${itemname}?`,
            confirmBtnClass: "bg-red-500 hover:bg-transparent border-red-500 hover:text-red-500",
            confirmText: "Delete"
        },
        update: {
            bgColor: "bg-gray-800",
            borderColor: "border-gray-800",
            iconFill: "fill-amber-500",
            title: "Confirm Update",
            message: `Do you want to update this ${itemname}? Please make sure all information is correct.`,
            confirmBtnClass: "bg-amber-500 hover:bg-transparent border-amber-500 hover:text-amber-500",
            confirmText: "Update"
        },
        add: {
            bgColor: "bg-gray-800",
            borderColor: "border-gray-800",
            iconFill: "fill-green-500",
            title: "Confirm Addition",
            message: `Do you want to add this new ${itemname}? Please verify all information before continuing.`,
            confirmBtnClass: "bg-green-500 hover:bg-transparent border-green-500 hover:text-green-500",
            confirmText: "Add"
        }
    };

    const currentConfig = config[variant] || config.delete;

    // Icons based on variant
    const renderIcon = () => {
        switch(variant) {
            case "delete":
                return (
                    <svg
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        className={`group-hover:animate-bounce w-12 h-12 flex items-center text-gray-600 ${currentConfig.iconFill} mx-auto`}
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            clipRule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            fillRule="evenodd"
                        ></path>
                    </svg>
                );
            case "update":
                return (
                    <svg 
                        fill="currentColor" 
                        viewBox="0 0 20 20" 
                        className={`group-hover:animate-bounce w-12 h-12 flex items-center text-gray-600 ${currentConfig.iconFill} mx-auto`}
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path 
                            d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" 
                        />
                    </svg>
                );
            case "add":
                return (
                    <svg 
                        fill="currentColor" 
                        viewBox="0 0 20 20" 
                        className={`group-hover:animate-bounce w-12 h-12 flex items-center text-gray-600 ${currentConfig.iconFill} mx-auto`}
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path 
                            fillRule="evenodd" 
                            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" 
                            clipRule="evenodd" 
                        />
                    </svg>
                );
            default:
                return null;
        }
    };

    return (
        <div className={`group select-none w-[280px] flex flex-col p-4 relative items-center justify-center ${currentConfig.bgColor} border ${currentConfig.borderColor} shadow-lg rounded-2xl`}>
            <div className="w-full">
                <div className="text-center p-3 flex-auto justify-center items-center">
                    <div className="flex justify-center">
                        {renderIcon()}
                    </div>
                    <h2 className="text-xl font-bold py-4">
                        {currentConfig.title}
                    </h2>
                    <p className="font-bold text-sm text-gray-500 px-2">
                        {currentConfig.message}
                    </p>
                </div>
                <div className="p-2 mt-2 text-center space-x-1 md:block">
                    <button 
                        onClick={onCancel}
                        className="mb-2 md:mb-0 bg-gray-700 px-5 py-2 text-sm shadow-sm font-medium tracking-wider border-2 border-gray-600 hover:border-gray-700 text-gray-300 rounded-full hover:shadow-lg hover:bg-gray-800 transition ease-in duration-300"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={onConfirm}
                        className={`${currentConfig.confirmBtnClass} px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 text-white rounded-full transition ease-in duration-300`}
                    >
                        {currentConfig.confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationCard;
