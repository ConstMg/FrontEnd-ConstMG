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
            rows={2}
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
          />
        ) : (
          <span className="block w-full text-lg md:text-xl">{value}</span>
        )}
      </div>

      {isEditable && (
        <button onClick={editing ? handleSave : () => setEditing(true)}>
          {editing ? <SaveIcon size={16} /> : <PencilIcon size={16} />}
        </button>
      )}
    </div>
  );
};

export default EditableField;
