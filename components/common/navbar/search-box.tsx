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
import { useCallback, useEffect, useRef } from "react";

import { useBackdrop } from "../backdrop";

interface SearchBoxProps {
  isMobile?: boolean;
}

function SearchBox({ isMobile = false }: Readonly<SearchBoxProps>) {
  const searchRef = useRef<HTMLInputElement>(null);
  const [backdrop, setBackdrop] = useBackdrop();

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
      isMobile || setBackdrop(focusState);
    },
    [setBackdrop],
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
                className="h-[200px] overflow-x-auto"
                classNames={{
                  list: "overflow-x-auto",
                }}
              >
                <DropdownItem key="new">New file</DropdownItem>
                <DropdownItem key="copy">Copy link</DropdownItem>
                <DropdownItem key="edit">Edit file</DropdownItem>
                <DropdownItem key="1">Edit file</DropdownItem>
                <DropdownItem key="2">Edit file</DropdownItem>
                <DropdownItem key="3">Edit file</DropdownItem>
                <DropdownItem key="4">Edit file</DropdownItem>
                <DropdownItem key="5">Edit file</DropdownItem>
                <DropdownItem key="6">Edit file</DropdownItem>
                <DropdownItem key="7">Edit file</DropdownItem>
                <DropdownItem key="8">Edit file</DropdownItem>
                <DropdownItem key="9">Edit file</DropdownItem>
                <DropdownItem key="10">Edit file</DropdownItem>
                <DropdownItem key="11">Edit file</DropdownItem>
                <DropdownItem key="12">Edit file</DropdownItem>
                <DropdownItem key="13">Edit file</DropdownItem>
                <DropdownItem key="14">Edit file</DropdownItem>
                <DropdownItem key="15">Edit file</DropdownItem>
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
