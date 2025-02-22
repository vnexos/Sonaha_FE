"use client";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Kbd } from "@heroui/kbd";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/modal";
import { cn } from "@heroui/theme";
import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";

interface SearchBoxProps {
  isForMobile?: boolean;
}

function SearchBox({ isForMobile = false }: Readonly<SearchBoxProps>) {
  const searchRef = useRef<HTMLInputElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "k") {
        event.preventDefault();
        isOpen || onOpen();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // clean up
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <Modal
        classNames={{
          backdrop: "z-50",
        }}
        isOpen={isOpen}
        size="5xl"
        onClose={() => {
          onClose();
          searchRef.current?.blur();
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <p className="text-2xl">Tìm kiếm</p>
              </ModalHeader>
              <ModalBody>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Magna exercitation reprehenderit magna aute tempor cupidatat
                  consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex
                  incididunt cillum quis. Velit duis sit officia eiusmod Lorem
                  aliqua enim laboris do dolor eiusmod.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {isForMobile ? (
        <Input
          ref={searchRef}
          aria-label="Search"
          classNames={{
            inputWrapper:
              "bg-default-100 transition-all duration-300 ease-in-out",
            input: "text-sm transition-all duration-300 ease-in-out",
            base: cn(
              "transition-all duration-300 ease-in-out",
              isOpen && "z-[100]",
            ),
            mainWrapper: "transition-all duration-300 ease-in-out",
            innerWrapper: "transition-all duration-300 ease-in-out",
          }}
          endContent={
            isOpen || (
              <Kbd className="hidden lg:inline-block" keys={["ctrl"]}>
                K
              </Kbd>
            )
          }
          labelPlacement="outside"
          placeholder="Search..."
          startContent={
            <Icon color="#444444" fontSize={25} icon="hugeicons:search-02" />
          }
          type="search"
          onClick={() => isOpen || onOpen()}
        />
      ) : (
        <div className="relative flex items-center">
          {/* Text that appears on hover */}
          <span
            className={cn(
              "absolute right-full mr-2 text-md text-[#444444] font-bold transition-opacity duration-300 ease-in-out",
              isHovered ? "opacity-100" : "opacity-0",
            )}
          >
            Tìm kiếm
          </span>

          <Button
            isIconOnly
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onPress={onOpen}
          >
            <Icon color="#444444" fontSize={25} icon="hugeicons:search-02" />
          </Button>
        </div>
      )}
    </>
  );
}

export default SearchBox;
