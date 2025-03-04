"use client";
import { FC, useEffect, useState } from "react";
import {
  HomeIcon,
  UsersIcon,
  NewspaperIcon,
  VideoCameraIcon,
  PowerIcon,
  FolderIcon,
  MegaphoneIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

interface ItemProps {
  title: string;
  to: string;
  icon: JSX.Element;
  selected: string;
  setSelected: (title: string) => void;
  className?: string;
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
            <HomeIcon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          }
          selected={selected}
          setSelected={setSelected}
          title="Trang Chủ"
          to="/admin"
        />
        <Item
          icon={
            <NewspaperIcon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          }
          selected={selected}
          setSelected={setSelected}
          title="Quản Lý Banner"
          to="/admin/banner"
        />
        <Item
          icon={
            <FolderIcon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          }
          selected={selected}
          setSelected={setSelected}
          title="Dự Án"
          to="/admin/proprities"
        />
        <Item
          icon={
            <InformationCircleIcon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          }
          selected={selected}
          setSelected={setSelected}
          title="Giới thiệu"
          to="/admin/intro"
        />
        <Item
          icon={
            <MegaphoneIcon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          }
          selected={selected}
          setSelected={setSelected}
          title="Tin Tức"
          to="/admin/news"
        />
        <Item
          icon={
            <UsersIcon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          }
          selected={selected}
          setSelected={setSelected}
          title="Người dùng"
          to="/admin/users"
        />
        <Item
          icon={
            <VideoCameraIcon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          }
          selected={selected}
          setSelected={setSelected}
          title="Media"
          to="/admin/album"
        />
        <li className="mt-6">
          <Item
            className="flex items-center space-x-3 px-4 py-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900 rounded-md"
            icon={<PowerIcon className="w-6 h-6" />}
            selected={selected}
            setSelected={setSelected}
            title="Đăng Xuất"
            to="/"
          />
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
