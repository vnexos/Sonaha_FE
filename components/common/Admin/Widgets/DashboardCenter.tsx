"use client";

import { useState } from "react";
import DashboardHeader from "../DashboardHeader";
import { Icon } from "@iconify/react";
import { Item } from "../sidebar/AdminSidebar";
export default function Dashboard() {
    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-4">

                <div className="flex items-center space-x-4">
                    <input
                        type="text"
                        placeholder="Tìm kiếm..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-1/3 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                </div>
            </div>
        </div>
    );
}
