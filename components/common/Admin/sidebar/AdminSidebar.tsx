"use client";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { FC, useEffect, useState } from "react";

interface ItemProps {
  title: string;
  to: string;
  icon: JSX.Element;
  selected: string;
  setSelected: (title: string) => void;
}

export const Item: FC<ItemProps> = ({
  title,
  to,
  icon,
  selected,
  setSelected,
}) => {
  return (
    <Link
      className={`flex items-center space-x-3 px-4 py-2 rounded-md transition-all ${selected === title ? "bg-gray-300 dark:bg-gray-600" : ""} text-gray-900 dark:text-gray-100 text-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 w-full`}
      href={to}
      onClick={() => setSelected(title)}
    >
      {icon}
      <span>{title}</span>
    </Link>
  );
};

const AdminSidebar = () => {
  const [isCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div
      className={`fixed top-0 left-0 h-screen z-50 transition-all ${isCollapsed ? "w-20" : "w-64"} bg-white dark:bg-gray-900 shadow-lg p-4`}
    >
      <div className="flex items-center justify-center py-4">
        {!isCollapsed && (
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            SONAHA
          </h1>
        )}
      </div>

      {/* Menu Items */}
      <ul className="space-y-3">
        <Item
          icon={
            <Icon
              className="w-6 h-6 text-gray-600 dark:text-gray-300"
              icon={"material-symbols:home"}
            />
          }
          selected={selected}
          setSelected={setSelected}
          title="Trang Chủ"
          to="/admin"
        />
        <Item
          icon={
            <Icon
              className="w-6 h-6 text-gray-600 dark:text-gray-300"
              icon={"material-symbols:wallpaper-slideshow"}
            />
          }
          selected={selected}
          setSelected={setSelected}
          title="Quản Lý Banner"
          to="/admin/banner"
        />
        <Item
          icon={
            <Icon
              className="w-6 h-6 text-gray-600 dark:text-gray-300"
              icon={"material-symbols:responsive-layout-outline"}
            />
          }
          selected={selected}
          setSelected={setSelected}
          title="Dự Án"
          to="/admin/proprities"
        />
        <Item
          icon={
            <Icon
              className="w-6 h-6 text-gray-600 dark:text-gray-300"
              icon={"material-symbols:ink-pen-rounded"}
            />
          }
          selected={selected}
          setSelected={setSelected}
          title="Giới thiệu"
          to="/admin/intro"
        />
        <Item
          icon={
            <Icon
              className="w-6 h-6 text-gray-600 dark:text-gray-300"
              icon={"material-symbols:newspaper"}
            />
          }
          selected={selected}
          setSelected={setSelected}
          title="Tin Tức"
          to="/admin/news"
        />
        <Item
          icon={
            <Icon
              className="w-6 h-6 text-gray-600 dark:text-gray-300"
              icon={"material-symbols:user-attributes-rounded"}
            />
          }
          selected={selected}
          setSelected={setSelected}
          title="Người dùng"
          to="/admin/users"
        />
        <Item
          icon={
            <Icon
              className="w-6 h-6 text-gray-600 dark:text-gray-300"
              icon={"material-symbols:animated-images"}
            />
          }
          selected={selected}
          setSelected={setSelected}
          title="Media"
          to="/admin/album"
        />
        <Item
          icon={
            <Icon
              className="w-6 h-6"
              icon={"material-symbols:logout-rounded"}
            />
          }
          selected={selected}
          setSelected={setSelected}
          title="Đăng Xuất"
          to="/"
        />
      </ul>
    </div>
  );
};

export default AdminSidebar;
