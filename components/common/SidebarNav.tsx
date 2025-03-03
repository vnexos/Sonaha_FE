"use client";

import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Modal,
  ModalContent,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

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
  const [isOpen, setIsOpen] = useState(false);

  const { dataProvince } = useGetProvincesQuery(null, {
    selectFromResult: (res: any) => ({
      dataProvince: (res.data as Province[]) ?? [],
    }),
  });

  const handleChangeProvince = (province: string) => {
    router.push(`/du-an?province=${province}`);
  };

  const renderAutocomplete = useMemo(
    () => (
      <Autocomplete
        aria-label="Provice"
        defaultItems={dataProvince}
        placeholder="LỌC THEO TỈNH"
        value={inputValue}
        onInputChange={setInputValue}
        onSelectionChange={(e) => handleChangeProvince(e as string)}
      >
        {(item) => (
          <AutocompleteItem key={item.name}>{item.name}</AutocompleteItem>
        )}
      </Autocomplete>
    ),
    [dataProvince],
  );

  return (
    <>
      <div className="hidden sm:block">{renderAutocomplete}</div>
      <div className="block sm:hidden">
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
            {renderAutocomplete}
          </ModalContent>
        </Modal>
      </div>
    </>
  );
}
