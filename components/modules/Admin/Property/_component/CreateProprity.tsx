"use client";

import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import { Select, SelectItem } from "@heroui/select";
import { useState } from "react";
import { toast } from "react-toastify";

import { PropertyType } from "../../../../../types/admin/proprity-type";

import {
  useGetProvinceQuery,
  useGetDistrictsQuery,
  useGetWardsQuery,
} from "@/store/queries/province";
import { useCreateProprityMutation } from "@/store/queries/proprities";

interface CreatePropertyProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<PropertyType>) => void;
}

export const CreateProperty = ({
  isOpen,
  onClose,
  onSubmit,
}: CreatePropertyProps) => {
  const [formData, setFormData] = useState<Partial<PropertyType>>({
    name: "",
    description: "",
    public_price: 0,
    area: 0,
    status: "",
    province: "",
    district: "",
    ward: "",
    img: undefined,
    house_direction: "",
    number_of_bedrooms: 0,
    legal_status: "",
    balcony_direction: "",
    number_of_bathrooms: 0,
    furniture: "",
    house_number: "",
    description_detail: "",
    cost_price: 0,
  });

  const [province, setProvince] = useState<string>("");
  const [district, setDistrict] = useState<string>("");
  const [ward, setWard] = useState<string>("");

  const { data: provinces, isLoading: loadingProvince } = useGetProvinceQuery();
  const { data: districts, isLoading: loadingDistrict } = useGetDistrictsQuery(
    province,
    { skip: !province },
  );
  const { data: wards, isLoading: loadingWard } = useGetWardsQuery(district, {
    skip: !district,
  });
  const balconyDirectionMap: Record<string, string> = {
    Bắc: "North",
    "Đông Bắc": "Northeast",
    Đông: "East",
    "Đông Nam": "Southeast",
    Nam: "South",
    "Tây Nam": "Southwest",
    Tây: "West",
    "Tây Bắc": "Northwest",
  };

  const houseDirectionMap: Record<string, string> = {
    Bắc: "North",
    "Đông Bắc": "Northeast",
    Đông: "East",
    "Đông Nam": "Southeast",
    Nam: "South",
    "Tây Nam": "Southwest",
    Tây: "West",
    "Tây Bắc": "Northwest",
  };
  const statusMap: Record<string, string> = {
    "Có sẵn": "available",
    "Đã bán": "sold",
    "Đang chờ": "pending",
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name.includes("number_of") || name.includes("price") || name === "area"
          ? Number(value)
          : value,
    }));
  };
  const [createProperty, {}] = useCreateProprityMutation();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setFormData((prev) => ({
        ...prev,
        img: file,
      }));
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formDataInEnglish = {
      ...formData,
      status: statusMap[formData.status ?? ""] || formData.status,
      balcony_direction:
        balconyDirectionMap[formData.balcony_direction ?? ""] ||
        formData.balcony_direction,
      house_direction:
        houseDirectionMap[formData.house_direction ?? ""] ||
        formData.house_direction,
    };

    // ✅ Chuyển đổi sang FormData
    const formDataToSend = new FormData();

    Object.entries(formDataInEnglish).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (value instanceof File) {
          formDataToSend.append(key, value);
        } else if (Array.isArray(value)) {
          formDataToSend.append(key, JSON.stringify(value));
        } else {
          formDataToSend.append(key, value.toString());
        }
      }
    });

    try {
      await createProperty(formDataToSend).unwrap();
      toast.success("Tạo mới dự án thành công");
      onSubmit(formDataInEnglish);
      onClose();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} size="4xl" onClose={onClose}>
        <ModalContent>
          <form onSubmit={handleSubmit}>
            <ModalHeader>Create New Property</ModalHeader>
            <ModalBody>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  required
                  label="Tên"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
                <Input
                  required
                  label="Giá công khai"
                  name="public_price"
                  type="number"
                  value={formData.public_price?.toString() ?? "0"}
                  onChange={handleChange}
                />

                <Input
                  required
                  label="Giá vốn"
                  name="cost_price"
                  type="number"
                  value={formData.cost_price?.toString() ?? "0"}
                  onChange={handleChange}
                />

                <Input
                  required
                  label="Diện tích (m²)"
                  name="area"
                  type="number"
                  value={formData.area?.toString() ?? "0"}
                  onChange={handleChange}
                />

                <Select
                  required
                  label="Trạng thái"
                  name="status"
                  selectedKeys={formData.status ? [formData.status] : []}
                  onSelectionChange={(keys) => {
                    const selectedKey = Array.from(keys)[0] as string;

                    setFormData({ ...formData, status: selectedKey });
                  }}
                >
                  {["Có sẵn", "Đã bán", "Đang chờ"].map((status) => (
                    <SelectItem key={status}>{status}</SelectItem>
                  ))}
                </Select>

                <Select
                  required
                  label="Hướng ban công"
                  name="balcony_direction"
                  selectedKeys={
                    formData.balcony_direction
                      ? [formData.balcony_direction]
                      : []
                  }
                  onSelectionChange={(keys) => {
                    const selectedKey = Array.from(keys)[0] as string;

                    setFormData({
                      ...formData,
                      balcony_direction: selectedKey,
                    });
                  }}
                >
                  {[
                    "Bắc",
                    "Đông Bắc",
                    "Đông",
                    "Đông Nam",
                    "Nam",
                    "Tây Nam",
                    "Tây",
                    "Tây Bắc",
                  ].map((direction) => (
                    <SelectItem key={direction}>{direction}</SelectItem>
                  ))}
                </Select>

                <Select
                  required
                  label="Giấy tờ pháp lý"
                  name="legal_status"
                  selectedKeys={
                    formData.legal_status ? [formData.legal_status] : []
                  }
                  onSelectionChange={(keys) => {
                    const selectedKey = Array.from(keys)[0] as string;

                    setFormData({ ...formData, legal_status: selectedKey });
                  }}
                >
                  {["Có sổ đổ", "Không có sổ đỏ"].map((legal_status) => (
                    <SelectItem key={legal_status}>{legal_status}</SelectItem>
                  ))}
                </Select>
                <Select
                  required
                  label="Nội Thất"
                  name="furniture"
                  selectedKeys={formData.furniture ? [formData.furniture] : []}
                  onSelectionChange={(keys) => {
                    const selectedKey = Array.from(keys)[0] as string;

                    setFormData({ ...formData, furniture: selectedKey });
                  }}
                >
                  {["Đầy đủ nổi thất", "Trang Trí ", "Chưa Nội Thất"].map(
                    (furniture) => (
                      <SelectItem key={furniture}>{furniture}</SelectItem>
                    ),
                  )}
                </Select>
                <Select
                  required
                  label="Hướng nhà"
                  name="house_direction"
                  selectedKeys={
                    formData.house_direction ? [formData.house_direction] : []
                  }
                  onSelectionChange={(keys) => {
                    const selectedKey = Array.from(keys)[0] as string;

                    setFormData({
                      ...formData,
                      house_direction: selectedKey,
                    });
                  }}
                >
                  {[
                    "Bắc",
                    "Đông Bắc",
                    "Đông",
                    "Đông Nam",
                    "Nam",
                    "Tây Nam",
                    "Tây",
                    "Tây Bắc",
                  ].map((direction) => (
                    <SelectItem key={direction}>{direction}</SelectItem>
                  ))}
                </Select>
                <Select
                  required
                  isLoading={loadingProvince}
                  label="Tỉnh/Thành phố"
                  selectedKeys={[province]}
                  onSelectionChange={(keys) => {
                    const selectedKey = Array.from(keys)[0] as string;

                    const selectedProvince = provinces?.find(
                      (item: any) => item.code === selectedKey,
                    );

                    if (selectedProvince) {
                      const selectedName = selectedProvince.name;

                      setProvince(selectedKey);
                      setDistrict("");
                      setWard("");
                      setFormData({ ...formData, province: selectedName });
                    }
                  }}
                >
                  {provinces?.map((item: any) => (
                    <SelectItem key={item.code}>{item.name}</SelectItem>
                  ))}
                </Select>

                {/* Chọn Huyện */}
                <Select
                  required
                  isDisabled={!province} // Vô hiệu hóa nếu chưa chọn tỉnh
                  isLoading={loadingDistrict}
                  label="Quận/Huyện"
                  selectedKeys={[district]}
                  onSelectionChange={(keys) => {
                    const selectedKey = Array.from(keys)[0] as string;
                    const selectedDis = districts?.find(
                      (item: any) => item.code === selectedKey,
                    );
                    const selectedName = selectedDis.name;

                    setDistrict(selectedKey);
                    setWard(""); // Reset xã khi chọn huyện mới
                    setFormData({ ...formData, district: selectedName });
                  }}
                >
                  {districts?.map((item: any) => (
                    <SelectItem key={item.code}>{item.name}</SelectItem>
                  ))}
                </Select>

                {/* Chọn Xã */}
                <Select
                  required
                  isDisabled={!district} // Vô hiệu hóa nếu chưa chọn huyện
                  isLoading={loadingWard}
                  label="Phường/Xã"
                  selectedKeys={[ward]}
                  onSelectionChange={(keys) => {
                    const selectedKey = Array.from(keys)[0] as string;
                    const selectedward = wards?.find(
                      (item: any) => item.code === selectedKey,
                    );

                    setWard(selectedKey);
                    setFormData({ ...formData, ward: selectedward.name });
                  }}
                >
                  {wards?.map((item: any) => (
                    <SelectItem key={item.code}>{item.name}</SelectItem>
                  ))}
                </Select>
              </div>
              <div className="mt-4">
                <textarea
                  required
                  className="w-full p-2 border rounded-md"
                  name="house_number"
                  placeholder="Số Nhà"
                  rows={1}
                  value={formData.house_number}
                  onChange={handleChange}
                />
              </div>
              <div className="mt-4">
                <input
                  accept="image/*"
                  className="w-full p-2 border rounded-md"
                  type="file"
                  onChange={handleFileChange}
                />
              </div>
              <div className="mt-4">
                <textarea
                  required
                  className="w-full p-2 border rounded-md"
                  name="description"
                  placeholder="Mô tả bất động sản"
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>

              <div className="mt-4">
                <textarea
                  required
                  className="w-full p-2 border rounded-md"
                  name="description_detail"
                  placeholder="Mô tả chi tiết"
                  rows={4}
                  value={formData.description_detail}
                  onChange={handleChange}
                />
              </div>
            </ModalBody>

            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button color="primary" type="submit">
                Create Property
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};
