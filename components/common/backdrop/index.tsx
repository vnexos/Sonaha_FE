"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

interface BackdropProviderProps {
  children: ReactNode;
}

var BackdropContext = createContext<
  [boolean, Dispatch<SetStateAction<boolean>>]
>([false, () => {}]);

export function BackdropProvider({ children }: BackdropProviderProps) {
  const showBackdrop = useState<boolean>(false);

  useEffect(() => {
    if (showBackdrop[0]) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [showBackdrop[0]]);

  return (
    <BackdropContext.Provider value={showBackdrop}>
      {/* <div
        className={cn(
          showBackdrop[0] || "hidden",
          "fixed w-screen h-screen z-40 bg-[#ffffff7f] backdrop-blur-md top-0 left-0",
        )}
      /> */}
      {children}
    </BackdropContext.Provider>
  );
}

export const useBackdrop = (): [boolean, Dispatch<SetStateAction<boolean>>] => {
  return useContext(BackdropContext);
};
