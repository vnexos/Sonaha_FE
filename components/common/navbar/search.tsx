"use client";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  useDisclosure,
} from "@heroui/modal";
import { Autocomplete, AutocompleteItem, Button, Slider } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { useGetDistricMutation } from "@/store/queries/distric";
import { useGetProvincesQuery } from "@/store/queries/province";
import { District, Province } from "@/types";
import { projectMenuItems } from "@/constants";



export default function SearchBox() {
  const router = useRouter();
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  // Select location
  const [selectedProvince, setSelectedProvince] = useState<string>();
  const [selectedDistrict, setSelectedDistrict] = useState<string>();

  const [key, setKey] = useState<string>();
  const [values, setValues] = useState<[number, number]>([0, 0]);

  const formatCurrency = useCallback((value: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  }, []);

  // Fetch
  const { provinceData, isFetching } = useGetProvincesQuery(null, {
    selectFromResult: (res) => ({
      provinceData: (res.data as Province[]) ?? [],
      isFetching: res.isFetching,
    }),
  });
  const [districts, setDistricts] = useState<District[]>([]);
  const [getDistrics, { isLoading: districtLoading }] = useGetDistricMutation();

  const getDistricsFunc = async () => {
    const res = await getDistrics(selectedProvince as string).unwrap();

    setDistricts(res);
  };

  useEffect(() => {
    if (selectedProvince) getDistricsFunc();
  }, [selectedProvince]);

  const handleApply = () => {
    const queryParams = new URLSearchParams();

    if (key) {
      queryParams.set("type", key);
    }
    if (selectedProvince) {
      const selectedProvinceName = provinceData.find(
        (province: any) => province.code === selectedProvince,
      )?.name;

      if (selectedProvinceName) {
        queryParams.set("province", selectedProvinceName);
      }
    }
    if (selectedDistrict) {
      const selectedDistrictName = districts.find(
        (district) => district.code === selectedDistrict,
      )?.name;

      if (selectedDistrictName) {
        queryParams.set("district", selectedDistrictName);
      }
    }

    // Thêm khoảng giá vào query parameters nếu có
    if (values[0] !== 0 || values[1] !== 0) {
      queryParams.set("price", `${values[0]}-${values[1]}`);
    }

    // Thêm phân trang vào query parameters
    queryParams.set("page", "1"); // Bắt đầu từ trang 1
    const path =
      "/du-an" + (queryParams.toString() ? "?" + queryParams.toString() : "");

    // Đóng modal và chuyển hướng
    onClose();
    router.push(path);
  };

  return (
    <>
      <Button isIconOnly onPress={onOpen}>
        <Icon fontSize={20} icon="material-symbols:search-rounded" />
      </Button>
      <Modal
        backdrop="opaque"
        classNames={{
          body: "py-6",
          backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
          base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
          header: "border-b-[1px] border-[#292f46]",
          footer: "border-t-[1px] border-[#292f46]",
          closeButton: "hover:bg-white/5 active:bg-white/10",
        }}
        isDismissable={false} // Không cho phép đóng modal bằng cách click bên ngoài
        isOpen={isOpen}
        radius="lg"
        size="5xl" // Thêm kích thước modal
        onClose={onClose}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody className="modal-css flex-row">
                <Autocomplete
                  className="max-w-xs"
                  defaultItems={projectMenuItems}
                  placeholder="Loại bất động sản"
                  selectedKey={key}
                  onClose={() => {
                    // Không gọi setTouched hoặc đóng khi chọn
                  }}
                  onSelectionChange={(newKey) => {
                    if (newKey !== null) {
                      setKey(newKey.toString());
                    }
                  }}
                >
                  {(item) => (
                    <AutocompleteItem
                      key={item.href}
                      className=""
                      onClick={(e) => e.stopPropagation()}
                    >
                      {item.label}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
                <Autocomplete
                  className="max-w-xs"
                  defaultItems={provinceData}
                  isLoading={isFetching}
                  placeholder="Tỉnh thành"
                  selectedKey={selectedProvince}
                  onSelectionChange={(newKey) => {
                    if (newKey !== null) {
                      setSelectedProvince(newKey as string);
                    }
                  }}
                >
                  {provinceData.map((province) => (
                    <AutocompleteItem
                      key={province.code}
                      data-value={province.code}
                    >
                      {province.name}
                    </AutocompleteItem>
                  ))}
                </Autocomplete>
                {selectedProvince && (
                  <Autocomplete
                    className="max-w-xs"
                    isLoading={districtLoading}
                    placeholder="Quận/huyện"
                    selectedKey={selectedDistrict}
                    onSelectionChange={(newKey) => {
                      if (newKey !== null) {
                        setSelectedDistrict(newKey as string);
                      }
                    }}
                  >
                    {districts.map((district) => (
                      <AutocompleteItem
                        key={district.code}
                        data-value={district.code}
                      >
                        {district.name}
                      </AutocompleteItem>
                    ))}
                  </Autocomplete>
                )}

                <div className="space-y-4">
                  {/* Slider */}
                  <Slider
                    className="max-w-md"
                    defaultValue={[0, 30000000000]}
                    maxValue={30000000000}
                    minValue={0}
                    step={100000000}
                    onChange={(value) => setValues(value as [number, number])}
                  />

                  {/* Giá trị đầu và cuối hiển thị phía dưới */}
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Khoảng giá:</span>
                    <span>
                      `vnd{formatCurrency(values[0])} - vnd
                      {formatCurrency(values[1])}`
                    </span>
                  </div>
                </div>
              </ModalBody>

              {/* Thêm nút Thoát và Áp dụng ở góc dưới bên phải */}
              <ModalFooter className="flex justify-end">
                <Button color="danger" variant="light" onPress={onClose}>
                  Thoát
                </Button>
                <Button color="primary" variant="light" onPress={handleApply}>
                  Áp dụng
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
