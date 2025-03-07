"use client";

import { Button } from "@heroui/button";
import {
  getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import { addToast } from "@heroui/toast";
import { useState } from "react";

import { PropertyType } from "../../../../types/admin/proprity-type";

import { CreateProperty } from "./_component/CreateProprity";
import PropertyDetail from "./_component/PropertyDetail";

import {
  useCreateTypePropertiesMutation,
  useDeletePropertyMutation,
  useGetPropritiesQuery,
  useUpdatePropertyMutation,
} from "@/store/queries/proprities";
import { columns } from "@/types";

const GetAllProperties = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<PropertyType | null>(
    null,
  );
  const [isTypeModalOpen, setIsTypeModalOpen] = useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState<number | null>(
    null,
  );
  const [selectedType, setSelectedType] = useState<string>("Apartment"); // Default type

  const {
    data: properties,
    isLoading,
    error,
    refetch,
  } = useGetPropritiesQuery();
  const [updateProperty] = useUpdatePropertyMutation();
  const [deleteProperty] = useDeletePropertyMutation();
  const [createTypeProperty] = useCreateTypePropertiesMutation();

  const handleSave = async (updatedProperty: PropertyType) => {
    try {
      await updateProperty(updatedProperty).unwrap();
      refetch();
      addToast({
        title: "Thông Báo",
        description: "Lưu thành công",
        color: "success",
      });
    } catch {
      addToast({
        title: "Lỗi",
        description: "Lưu không thành công",
        color: "danger",
      });
    }
  };

  const handleDelete = async (propertyId: number) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa không?")) {
      try {
        await deleteProperty(propertyId).unwrap();
        addToast({
          title: "Thông Báo",
          description: "Đã xóa Dự Án thành công",
          color: "success",
        });
        refetch();
      } catch {
        addToast({
          title: "Lỗi",
          description: "Xóa Dự Án không thành công",
          color: "danger",
        });
      }
    }
  };

  const handleCreateType = async () => {
    if (selectedPropertyId === null) return;
    try {
      await createTypeProperty({
        id: selectedPropertyId,
        nameType: selectedType,
      }).unwrap();
      setIsTypeModalOpen(false);
      refetch();
      addToast({
        title: "Thông Báo",
        description: "Đã tạo loại bất động sản",
        color: "success",
      });
    } catch {
      addToast({
        title: "Lỗi",
        description: "Tạo loại không thành công",
        color: "danger",
      });
    }
  };

  // Tách biểu thức ternary lồng ghép thành hàm riêng
  const renderTypePropertiesCell = (property: PropertyType) => {
    if (property.type_properties?.length > 0) {
      return property.type_properties[0].typePropertiesName; // Assuming typePropertiesName is a string or enum key
    }

    return (
      <Button
        color="primary"
        size="sm"
        onPress={() => {
          setSelectedPropertyId(property.property_id);
          setIsTypeModalOpen(true);
        }}
      >
        Tạo Loại
      </Button>
    );
  };

  const updatedColumns = [
    ...columns,
    {
      key: "typeProperties",
      label: "Loại bất động sản",
    },
  ];

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản Lý Bất Động Sản</h1>
        <Button color="primary" onPress={() => setIsCreateModalOpen(true)}>
          Thêm Mới +
        </Button>
      </div>

      {isLoading && (
        <div className="text-center text-gray-500">Đang tải...</div>
      )}
      {error && (
        <div className="text-center text-red-500">Lỗi khi tải dữ liệu</div>
      )}

      {selectedProperty ? (
        <PropertyDetail
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
          onDelete={handleDelete}
          onSave={handleSave}
        />
      ) : (
        <>
          <div className="overflow-x-auto">
            <Table
              aria-label="Bảng danh sách bất động sản"
              className="min-w-full"
            >
              <TableHeader>
                {updatedColumns.map((column) => (
                  <TableColumn
                    key={column.key}
                    className="bg-gray-50 font-semibold text-gray-700"
                  >
                    {column.label}
                  </TableColumn>
                ))}
              </TableHeader>
              <TableBody>
                {properties?.map((property: PropertyType) => (
                  <TableRow
                    key={property.property_id}
                    className="cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                    onClick={() => setSelectedProperty(property)}
                  >
                    {(columnKey) => (
                      <TableCell className="py-3 px-4">
                        {columnKey === "typeProperties"
                          ? renderTypePropertiesCell(property)
                          : getKeyValue(property, columnKey)}
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <CreateProperty
            isOpen={isCreateModalOpen}
            onClose={() => setIsCreateModalOpen(false)}
            onSubmit={() => {
              refetch();
            }}
          />

          {isTypeModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-lg font-bold mb-4 text-gray-800">
                  Chọn Loại Bất Động Sản
                </h2>
                <select
                  className="w-full p-3 border rounded-lg mb-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  <option value="Apartment">Căn hộ</option>
                  <option value="OfficeBuilding">Tòa nhà văn phòng</option>
                  <option value="ShoppingCenter">Trung tâm mua sắm</option>
                  <option value="NewUrbanArea">Khu đô thị mới</option>
                  <option value="MixedUseDevelopment">
                    Phát triển đa chức năng
                  </option>
                  <option value="SocialHousing">Nhà ở xã hội</option>
                  <option value="EcoResort">Khu nghỉ dưỡng sinh thái</option>
                  <option value="IndustrialPark">Khu công nghiệp</option>
                  <option value="SemiDetachedVilla">Biệt thự song lập</option>
                  <option value="Shophouse">Nhà phố thương mại</option>
                  <option value="Townhouse">Nhà phố</option>
                  <option value="OtherProject">Dự án khác</option>
                  <option value="BeachLand">Đất ven biển</option>
                  <option value="PerennialCropLand">
                    Đất trồng cây lâu năm
                  </option>
                  <option value="Villa">Biệt thự</option>
                  <option value="ResidentialPlot">Đất ở</option>
                  <option value="StreetHouse">Nhà mặt phố</option>
                  <option value="LuxuryApartment">Căn hộ cao cấp</option>
                </select>
                <div className="flex justify-end gap-2">
                  <Button color="primary" onPress={handleCreateType}>
                    Tạo
                  </Button>
                  <Button
                    color="danger"
                    onPress={() => setIsTypeModalOpen(false)}
                  >
                    Hủy
                  </Button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default GetAllProperties;
