"use client";

import {
  getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import { Button } from "@heroui/button";
import { useState } from "react";
import { toast } from "react-toastify";

import { PropertyType } from "../../../../types/admin/proprity-type";

import { CreateProperty } from "./_component/CreateProprity";
import PropertyDetail from "./_component/PropertyDetail";

import {
  useGetPropritiesQuery,
  useDeletePropertyMutation,
  useUpdatePropertyMutation,
} from "@/store/queries/proprities";

const GetAllProperties = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<PropertyType | null>(
    null,
  );
  const {
    data: properties,
    isLoading,
    error,
    refetch,
  } = useGetPropritiesQuery();
  const [updateProperty] = useUpdatePropertyMutation();
  const [deleteProperty] = useDeletePropertyMutation();

  const columns = [
    { key: "property_id", label: "Mã BĐS" },
    { key: "name", label: "Tên Bất Động Sản" },
    { key: "address", label: "Địa Chỉ" },
    { key: "public_price", label: "Giá Công Khai" },
    { key: "area", label: "Diện Tích (m²)" },
    { key: "status", label: "Trạng Thái" },
    { key: "number_of_bedrooms", label: "Số Phòng Ngủ" },
    { key: "number_of_bathrooms", label: "Số Phòng Tắm" },
    { key: "legal_status", label: "Tình Trạng Pháp Lý" },
    { key: "province", label: "Tỉnh/Thành Phố" },
    { key: "created_at", label: "Ngày Tạo" },
  ];
  const handleSave = async (updatedProperty: PropertyType) => {
    try {
      await updateProperty(updatedProperty).unwrap();
      refetch();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (propertyId: number) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa không?")) {
      try {
        await deleteProperty(propertyId).unwrap();
        toast.success("Đã xoá thành công");
        refetch();
      } catch (error: any) {
        toast.error(error.message);
      }
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản Lý Bất Động Sản</h1>
        <Button color="primary" onPress={() => setIsCreateModalOpen(true)}>
          Thêm Mới +
        </Button>
      </div>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error loading properties</div>}
      {selectedProperty ? (
        <PropertyDetail
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
          onDelete={handleDelete}
          onSave={handleSave}
        />
      ) : (
        <>
          <div>getReadableStatus(error, isLoading)</div>
          <div>
            <Table aria-label="Bảng danh sách bất động sản">
              <TableHeader>
                {columns.map((column) => (
                  <TableColumn key={column.key}>{column.label}</TableColumn>
                ))}
              </TableHeader>
              <TableBody>
                {properties?.map((property: PropertyType) => (
                  <TableRow
                    key={property.property_id}
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => setSelectedProperty(property)}
                  >
                    {(columnKey) => (
                      <TableCell>{getKeyValue(property, columnKey)}</TableCell>
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
        </>
      )}
    </>
  );
};

export default GetAllProperties;
