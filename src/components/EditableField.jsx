import { useState, useEffect } from "react";
import { PencilIcon, SaveIcon } from "lucide-react";

// Utility sederhana untuk deteksi URL
const isUrl = (str) => {
    try {
        new URL(str);
        return true;
    } catch {
        return false;
    }
};

const EditableField = ({ icon, value, name, onSave, isEditable }) => {
    const [editing, setEditing] = useState(false);
    const [tempValue, setTempValue] = useState(value || "Data tidak tersedia");

    useEffect(() => {
        setTempValue(value || "Data tidak tersedia");
    }, [value]);

    const handleSave = () => {
        onSave(name, tempValue);
        setEditing(false);
    };

    const handleOpenLink = () => {
        if (isUrl(value)) {
            window.open(
                value.startsWith("http") ? value : `https://${value}`,
                "_blank"
            );
        }
    };

    const isLinkField =
        ["facebook", "instagram", "website_url"].includes(name) && isUrl(value);

    return (
        <div
            className={`w-full flex items-center rounded-lg gap-3 ${
                isEditable ? "border" : ""
            }`}
        >
            {/* ICON (klik hanya jika link) */}
            <span
                onClick={isLinkField ? handleOpenLink : undefined}
                className={isLinkField ? "cursor-pointer" : ""}
            >
                {icon}
            </span>

            {/* VALUE */}
            <div
                className={`flex-1 ${
                    isLinkField
                        ? "cursor-pointer hover:underline text-blue-700"
                        : ""
                }`}
                onClick={isLinkField ? handleOpenLink : undefined}
            >
                {editing ? (
                    <textarea
                        className="w-full outline-none bg-transparent text-sm md:text-base resize-none break-words break-all"
                        rows={
                            name === "about_desc" ||
                            name === "recent_project_desc" ||
                            name === "visi" ||
                            name === "misi"
                                ? 8
                                : 4
                        }
                        value={tempValue}
                        onChange={(e) => setTempValue(e.target.value)}
                    />
                ) : (
                    <div className="text-sm font-medium overflow-y-auto h-full py-4 break-words whitespace-pre-line md:text-base">
                        {value}
                    </div>
                )}
            </div>

            {/* BUTTON EDIT / SAVE */}
            {isEditable && (
                <button onClick={editing ? handleSave : () => setEditing(true)}>
                    {editing ? (
                        <SaveIcon size={16} />
                    ) : (
                        <PencilIcon size={16} />
                    )}
                </button>
            )}
        </div>
    );
};

export default EditableField;
