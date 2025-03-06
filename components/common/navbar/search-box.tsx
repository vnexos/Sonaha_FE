"use client";
import { Button } from "@heroui/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import { Input } from "@heroui/input";
import { Kbd } from "@heroui/kbd";
import { cn } from "@heroui/theme";
import { Icon } from "@iconify/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { useBackdrop } from "../backdrop";

import { useGetAllProvinceQuery } from "@/store/queries/provinces";
import { Province } from "@/types";

interface SearchBoxProps {
  isMobile?: boolean;
}

function SearchBox({ isMobile = false }: Readonly<SearchBoxProps>) {
  const searchRef = useRef<HTMLInputElement>(null);
  const [backdrop, setBackdrop] = useBackdrop();
  const { provinces, isFetching } = useGetAllProvinceQuery(undefined, {
    selectFromResult: ({ data, isFetching }) => ({
      isFetching,
      provinces: (data as Province[]) ?? [],
    }),
  });

  const [selectedProvince, setSelectedProvince] = useState<Province>();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "k") {
        event.preventDefault();
        searchRef.current?.focus();
      } else if (event.key === "Escape") {
        searchRef.current?.blur();
        handleFocus(false)();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleFocus = useCallback(
    (focusState: boolean) => () => {
      window.scrollTo({ behavior: "instant", top: 0 });
      isMobile || setBackdrop(focusState);
    },
    [setBackdrop],
  );

  const locationNav = useMemo(
    () => (
      <div className="flex align-middle">
        <Button isIconOnly>
          <Icon fontSize={25} icon="solar:arrow-left-outline" />
        </Button>
        <p className="align-middle">{selectedProvince?.name}</p>
      </div>
    ),
    [selectedProvince],
  );

  return (
    <>
      <button
        className={cn(
          backdrop &&
            "fixed w-screen h-screen bg-white/50 backdrop-blur-lg top-0 left-0 z-40",
        )}
        onMouseDown={handleFocus(false)}
      />
      <Input
        ref={searchRef}
        aria-label="Search"
        className="outline-none h-[50px]"
        classNames={{
          inputWrapper: cn(
            "bg-default-100 group-data-[focus-visible=true]:ring-0 group-data-[focus-visible=true]:ring-offset-0",
            backdrop && "h-full",
          ),
          input: cn("text-sm outline-none top-10", backdrop && "text-xl"),
          base: cn(
            "transition-all duration-500 ease-in-out mt-10",
            backdrop
              ? "fixed top-[100px] left-[50%] -translate-x-[50%] w-[90vw] sm:w-[50vw] z-50 max-w-[750px]"
              : "w-[90vw] sm:w-[25vw] top-[10px] -mt-[20px] max-w-[300px]",
          ),
          mainWrapper: backdrop && "h-full",
          helperWrapper: "hidden",
        }}
        endContent={
          backdrop ? (
            <Dropdown>
              <DropdownTrigger>
                <Button
                  isDisabled={isFetching}
                  isLoading={isFetching}
                  startContent={
                    <Icon fontSize={100} icon="material-symbols:add-location" />
                  }
                  variant="bordered"
                >
                  Địa điểm
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Chọn địa điểm"
                className="h-[250px] overflow-x-auto"
                classNames={{
                  list: "overflow-x-auto",
                }}
                closeOnSelect={false}
                topContent={selectedProvince ? <>{locationNav}</> : <></>}
              >
                {provinces.map((data) => (
                  <DropdownItem
                    key={data.code}
                    onPress={() => setSelectedProvince(data)}
                  >
                    {data.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          ) : (
            <Kbd className="hidden lg:inline-block" keys={["ctrl"]}>
              K
            </Kbd>
          )
        }
        placeholder="Search..."
        startContent={
          <Icon color="#444444" fontSize={25} icon="hugeicons:search-02" />
        }
        type="search"
        onFocus={handleFocus(true)}
      />
    </>
  );
}

export default SearchBox;
