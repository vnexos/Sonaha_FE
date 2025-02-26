"use client";
import { FC, useEffect, useState } from "react";
import { HomeIcon, UsersIcon, NewspaperIcon, VideoCameraIcon, ArrowLeftIcon, ArrowRightIcon, ReceiptPercentIcon, PowerIcon, FolderIcon, MegaphoneIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

interface ItemProps {
    title: string;
    to: string;
    icon: JSX.Element;
    selected: string;
    setSelected: (title: string) => void;
    className?: string;
}

export const Item: FC<ItemProps> = ({ title, to, icon, selected, setSelected }) => {
    return (
        <li className={`flex items-center space-x-3 px-4 py-2 rounded-md cursor-pointer transition-all hover:bg-gray-200 dark:hover:bg-gray-700 ${selected === title ? "bg-gray-300 dark:bg-gray-600" : ""}`}
            onClick={() => setSelected(title)}
        >
            {icon}
            <Link href={to} className="text-gray-900 dark:text-gray-100 text-lg">{title}</Link>
        </li>
    );
};

const AdminSidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("Dashboard");
    const [mounted, setMounted] = useState(false);
    const { theme } = useTheme();
    // const { router } = useRouter();

    useEffect(() => setMounted(true), []);
    if (!mounted) return null;

    return (
        <div className={`fixed top-0 left-0 h-screen z-50 transition-all ${isCollapsed ? "w-20" : "w-64"} bg-white dark:bg-gray-900 shadow-lg p-4`}>
            {/* Toggle Sidebar */}
            <button onClick={() => {
                setIsCollapsed(!isCollapsed);
                console.log("isCollapsed", isCollapsed);
            }} className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700">
                {isCollapsed ? <ArrowRightIcon className="w-6 h-6 text-gray-600 dark:text-gray-300" /> : <ArrowLeftIcon className="w-6 h-6 text-gray-600 dark:text-gray-300" />}
            </button>

            {/* Logo */}
            <div className="flex items-center justify-center py-4">
                {!isCollapsed && <h1 className="text-2xl font-bold text-gray-900 dark:text-white">SONAHA</h1>}
            </div>

            {/* Menu Items */}
            <ul className="space-y-3">
                <Item title="Trang Chủ" to="/admin" icon={<HomeIcon className="w-6 h-6 text-gray-600 dark:text-gray-300" />} selected={selected} setSelected={setSelected} />
                <Item title="Quản Lý Banner" to="/admin/banner" icon={<NewspaperIcon className="w-6 h-6 text-gray-600 dark:text-gray-300" />} selected={selected} setSelected={setSelected} />
                <Item title="Dự Án" to="/admin/proprities" icon={<FolderIcon className="w-6 h-6 text-gray-600 dark:text-gray-300" />} selected={selected} setSelected={setSelected} />
                <Item title="Giới thiệu" to="/admin/intro" icon={<InformationCircleIcon className="w-6 h-6 text-gray-600 dark:text-gray-300" />} selected={selected} setSelected={setSelected} />
                <Item title="Tin Tức" to="/admin/news" icon={<MegaphoneIcon className="w-6 h-6 text-gray-600 dark:text-gray-300" />} selected={selected} setSelected={setSelected} />
                <Item title="Người dùng" to="/admin/users" icon={<UsersIcon className="w-6 h-6 text-gray-600 dark:text-gray-300" />} selected={selected} setSelected={setSelected} />
                <li className="mt-6">
                    <Item
                        className="flex items-center space-x-3 px-4 py-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900 rounded-md"
                        title="Đăng Xuất"
                        to="/"
                        icon={<PowerIcon className="w-6 h-6" />}
                        selected={selected}
                        setSelected={setSelected}
                    />
                </li>
            </ul>
        </div>
    );
};

export default AdminSidebar;
