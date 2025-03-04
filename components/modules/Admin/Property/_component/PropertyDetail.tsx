import { useState } from "react";
import { Icon } from "@iconify/react";
import { Input } from "@heroui/input";
import { Image } from "@heroui/image";

import { PropertyType } from "../../../../../types/admin/proprity-type";

type PropertyDetailProps = {
  property: PropertyType;
  onClose: () => void;
  onSave: (updatedProperty: PropertyType) => void;
  onDelete: (propertyId: number) => void;
};

const PropertyDetail: React.FC<PropertyDetailProps> = ({
  property,
  onClose,
  onSave,
  onDelete,
}) => {
  const [editableProperty, setEditableProperty] = useState<PropertyType>({
    ...property,
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setEditableProperty({ ...editableProperty, [name]: value });
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Chi Tiết Bất Động Sản</h1>

      <div className="grid grid-cols-2 gap-4">
        {Object.entries(editableProperty).map(([key, value]) => (
          <div key={key}>
            <strong>{key.replace(/_/g, " ")}:</strong>{" "}
            {isEditing ? (
              <Input name={key} value={String(value)} onChange={handleChange} />
            ) : (
              <span>{String(value)}</span>
            )}
          </div>
        ))}
      </div>

      {editableProperty.thumbnail_url && (
        <div className="mt-4">
          <Image
            alt="Bất Động Sản"
            className="w-full h-64 object-cover rounded-lg shadow"
            src={editableProperty.thumbnail_url}
          />
        </div>
      )}

      {/* Nút chức năng */}
      <div className="flex gap-2 mt-4">
        {isEditing ? (
          <button
            className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition"
            onClick={() => {
              onSave(editableProperty);
              setIsEditing(false);
            }}
          >
            <Icon className="w-5 h-5" icon="mdi:content-save" />
          </button>
        ) : (
          <button
            className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
            onClick={() => setIsEditing(true)}
          >
            <Icon className="w-5 h-5" icon="mdi:pencil" />
          </button>
        )}

        <button
          className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
          onClick={() => {
            onDelete(property.property_id);
            onClose();
          }}
        >
          <Icon className="w-5 h-5" icon="mdi:trash-can" />
        </button>

        <button
          className="p-2 bg-gray-400 text-white rounded-full hover:bg-gray-500 transition"
          onClick={onClose}
        >
          <Icon className="w-5 h-5" icon="mdi:arrow-left" />
        </button>
      </div>
    </div>
  );
};

export default PropertyDetail;
