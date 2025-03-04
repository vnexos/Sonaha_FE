"use client";

import type { ThemeProviderProps } from "next-themes";

import { HeroUIProvider } from "@heroui/system";
import { ToastProvider } from "@heroui/toast";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useRouter } from "next/navigation";
import * as React from "react";
import { Provider } from "react-redux";

import AuthProvider from "@/components/common/auth-provider";
import { BackdropProvider } from "@/components/common/backdrop";
import { store } from "@/store";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>["push"]>[1]
    >;
  }
}

export function Providers({ children, themeProps }: Readonly<ProvidersProps>) {
  const router = useRouter();

  return (
    <HeroUIProvider navigate={router.push}>
      <NextThemesProvider {...themeProps}>
        <BackdropProvider>
          <Provider store={store}>
            <AuthProvider>{children}</AuthProvider>
          </Provider>
        </BackdropProvider>
        <ToastProvider placement="top-right" />
      </NextThemesProvider>
    </HeroUIProvider>
  );
}
