"use client";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Modal,
  ModalContent,
} from "@heroui/react";
import { Sidebar } from "flowbite-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";

import { useGetProvincesQuery } from "@/store/queries/province";

interface Province {
  code: string;
  name: string;
  full_name: string;
  full_name_en: string;
  code_name: string;
}

export default function SidebarNav() {
  const router = useRouter();
  const [inputValue, setInputValue] = useState<string>("");
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const { dataProvince } = useGetProvincesQuery(null, {
    selectFromResult: (res: any) => ({
      dataProvince: (res.data as Province[]) ?? [],
    }),
  });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const matchedProvince = dataProvince.find((province) =>
        province.name.toLowerCase().includes(inputValue.toLowerCase()),
      );

      if (matchedProvince) handleChangeProvince(matchedProvince.name);
    }
  };

  const handleChangeProvince = (province: string) => {
    setSelectedProvince(province);
    router.push(`/du-an?province=${province}`);
    if (isMobile) setIsOpen(false);
  };

  const renderAutocomplete = () => (
    <Autocomplete
      className=""
      defaultItems={dataProvince}
      placeholder="LỌC THEO TỈNH"
      value={inputValue}
      onInputChange={setInputValue}
      onKeyDown={handleKeyDown}
    >
      {(item: Province) => (
        <AutocompleteItem
          key={item.code}
          onClick={() => handleChangeProvince(item.name)}
        >
          {item.name}
        </AutocompleteItem>
      )}
    </Autocomplete>
  );

  return (
    <>
      {/* Desktop View */}
      {!isMobile && (
        <Sidebar
          aria-label="Sidebar with provinces"
          className="hidden md:block"
          style={{ width: "100%" }}
        >
          {renderAutocomplete()}
        </Sidebar>
      )}

      {/* Mobile View */}
      {isMobile && (
        <>
          <Button className="md:hidden m-4" onClick={() => setIsOpen(true)}>
            Lọc theo tỉnh
          </Button>

          <Modal isOpen={isOpen} size="full" onClose={() => setIsOpen(false)}>
            <ModalContent className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">Lọc theo tỉnh</h3>
                <Button variant="light" onClick={() => setIsOpen(false)}>
                  Đóng
                </Button>
              </div>
              {renderAutocomplete()}
            </ModalContent>
          </Modal>
        </>
      )}
    </>
  );
}
