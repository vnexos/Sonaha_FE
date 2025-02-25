"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface BackdropProviderProps {
  children: ReactNode;
}

const BackdropContext = createContext<
  [boolean, Dispatch<SetStateAction<boolean>>]
>([false, () => {}]);

export function BackdropProvider({
  children,
}: Readonly<BackdropProviderProps>) {
  const [showBackdrop, setShowBackdrop] = useState<boolean>(false);

  useEffect(() => {
    if (showBackdrop) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [showBackdrop]);

  const backdrop = useMemo(
    () =>
      [showBackdrop, setShowBackdrop] as [
        boolean,
        Dispatch<SetStateAction<boolean>>,
      ],
    [showBackdrop, setShowBackdrop],
  );

  return (
    <BackdropContext.Provider value={backdrop}>
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
