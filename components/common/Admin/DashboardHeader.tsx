"use client";

import React, { FC, useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { format } from "timeago.js";

import { ThemeSwitcher } from "@/utils/ThemeSwitcher";

type Props = {
  open?: boolean;
  setOpen?: any;
};

const DashboardHeader: FC<Props> = ({ open, setOpen }) => {
  const [notifications] = useState<any>([]);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setAudio(
        new Audio(
          "https://res.cloudinary.com/damk25wo5/video/upload/v1693465789/notification_vcetjn.mp3",
        ),
      );
    }
  }, []);

  useEffect(() => {
    if (audio && notifications.length > 0) {
      audio.play();
    }
  }, [notifications, audio]);

  return (
    <div className="w-full flex items-center justify-end p-6 fixed top-5 right-0 z-[9999999]">
      <ThemeSwitcher />
      <button
        className="relative cursor-pointer m-2"
        onClick={() => setOpen(!open)}
      >
        <Icon height="25" icon="ion:notifications-outline" width="25" />
        <span className="absolute -top-2 -right-2 bg-[#3ccba0] rounded-full w-[20px] h-[20px] text-[12px] flex items-center justify-center text-white">
          {notifications.length}
        </span>
      </button>
      {open && (
        <div className="w-[350px] h-[60vh] overflow-y-scroll py-3 px-2 border border-[#ffffff0c] dark:bg-[#111C43] bg-white shadow-xl absolute top-16 z-[1000000000] rounded">
          <h5 className="text-center text-[20px] font-Poppins text-black dark:text-white p-3">
            Notifications
          </h5>
          {notifications.map((item: any, index: number) => (
            <div
              key={index}
              className="dark:bg-[#2d3a4e] bg-[#00000013] font-Poppins border-b dark:border-b-[#ffffff47] border-b-[#0000000f]"
            >
              <div className="w-full flex items-center justify-between p-2">
                <p className="text-black dark:text-white">{item.title}</p>
                <p className="text-black dark:text-white cursor-pointer">
                  Mark as read
                </p>
              </div>
              <p className="px-2 text-black dark:text-white">{item.message}</p>
              <p className="p-2 text-black dark:text-white text-[14px]">
                {format(item.createdAt)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;
