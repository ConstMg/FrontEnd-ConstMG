import { useState } from "react";
import { PencilIcon, SaveIcon } from "lucide-react";

const EditableField = ({ icon, value, name, onSave, isEditable }) => {
    const [editing, setEditing] = useState(false);
    const [tempValue, setTempValue] = useState(value);

    const handleSave = () => {
        onSave(name, tempValue);
        setEditing(false);
    };

    return (
        <div
            className={`w-full flex items-center rounded-lg gap-3 ${
                isEditable ? "border" : ""
            }`}
        >
            <span>{icon}</span>

            <div className="flex-1">
                {editing ? (
                    <textarea
                        className="w-full outline-none bg-transparent text-lg md:text-xl resize-none"
                        rows={
                            name === "about_desc" ||
                            name === "recent_project_desc"
                                ? 10
                                : 2
                        }
                        value={tempValue}
                        onChange={(e) => setTempValue(e.target.value)}
                    />
                ) : (
                    <div className="text-base font-medium overflow-y-auto h-full py-4 whitespace-pre-line md:text-xl">
                        {value}
                    </div>
                )}
            </div>

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
