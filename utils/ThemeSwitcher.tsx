"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Icon } from "@iconify/react";

export const ThemeSwitcher = () => {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => setMounted(true), []);

    if (!mounted) {
        return null;
    }

    return (
        <div className="flex items-center justify-center mx-4">
            {theme === "light" ? (
                <Icon
                    icon="mdi:weather-night"
                    width="25"
                    height="25"
                    className="cursor-pointer"
                    color="black"
                    onClick={() => setTheme("dark")}
                />
            ) : (
                <Icon
                    icon="mdi:white-balance-sunny"
                    width="25"
                    height="25"
                    className="cursor-pointer"
                    color="white"
                    onClick={() => setTheme("light")}
                />
            )}
        </div>
    );
};
