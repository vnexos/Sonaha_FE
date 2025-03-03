"use client";
import { Listbox, ListboxItem } from "@heroui/listbox";
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuToggle,
} from "@heroui/navbar";
import { cn } from "@heroui/react";
import { link as linkStyles } from "@heroui/theme";
import clsx from "clsx";
import NextLink from "next/link";

import Logo from "./logo";
import SearchBox from "./search";

import { useGetProvincesQuery } from "@/store/queries/province";
import { projectMenuItems } from "@/constants";

export const Navbar = () => {

  const { provinceData } = useGetProvincesQuery(null, {
    selectFromResult: (result) => ({
      provinceData: result.data, // Extracting data from the query result
      isFetching: result.isFetching, // Current fetching state of the query
      isSuccess: result.isSuccess, // Query success state
    }),
  });

  console.log(provinceData);

  return (
    <div>
      <HeroUINavbar
        className={cn(`fixed transition-all duration-300 ease-in-out z-10`)}
        maxWidth="xl"
      >
        <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
          <NavbarBrand as="li" className="gap-3 max-w-fit">
            <NextLink
              className="flex justify-start items-center gap-1"
              href="/"
            >
              <Logo size={50} />

              <p className="font-bold text-inherit">SONAHA</p>
            </NextLink>
          </NavbarBrand>
          <NextLink
            passHref
            className={clsx(
              linkStyles({ color: "foreground" }),
              "data-[active=true]:text-primary data-[active=true]:font-medium",
            )}
            color="foreground"
            href="/gioithieu"
          >
            GIỚI THIỆU
          </NextLink>
          <NextLink
            className={clsx(
              linkStyles({ color: "foreground" }),
              "data-[active=true]:text-primary data-[active=true]:font-medium",
            )}
            color="foreground"
            href="/du-an" // Đường dẫn bạn muốn chuyển đến
          >
            DỰ ÁN
          </NextLink>

          <NextLink
            passHref
            className={clsx(
              linkStyles({ color: "foreground" }),
              "data-[active=true]:text-primary data-[active=true]:font-medium",
            )}
            color="foreground"
            href="/tintuc"
          >
            TIN TỨC
          </NextLink>
        </NavbarContent>

        <NavbarContent
          className="hidden sm:flex basis-1/5 sm:basis-full"
          justify="end"
        >
          <NavbarItem className="hidden sm:flex">
            <SearchBox />
          </NavbarItem>
        </NavbarContent>

        {/* search bắt đầu từ loại, tỉnh thành, cho tới khoảng giá, còn page với limit chắc quẳng vô page */}

        <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
          <NavbarMenuToggle />
        </NavbarContent>
        <NavbarMenu>
          <SearchBox />
          <div className="mx-4 mt-2 flex flex-col gap-2">
            <Listbox aria-label="Project List" className="lisbox">
              {projectMenuItems.map((item) => (
                <ListboxItem key={item.href} href={`/du-an?type=${item.href}`}>
                  {item.label}
                </ListboxItem>
              ))}
            </Listbox>
          </div>
        </NavbarMenu>
      </HeroUINavbar>
    </div>
  );
};
