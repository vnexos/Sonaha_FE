"use client";
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import { useGetProvinceQuery } from "@/store/queries/province";

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

  const { dataProvince } = useGetProvinceQuery(undefined, {
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
    router.push(`/du-an?province=${province}`);
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
          onPress={() => handleChangeProvince(item.name)}
        >
          {item.name}
        </AutocompleteItem>
      )}
    </Autocomplete>
  );

  return (
    <>
      {/* Desktop View */}
      <div
        aria-label="Sidebar with provinces"
        className="hidden md:block w-full"
      >
        {renderAutocomplete()}
      </div>
    </>
  );
}
