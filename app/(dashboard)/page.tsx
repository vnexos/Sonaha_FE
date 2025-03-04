import { Metadata } from "next";

import HomePage from "@/components/modules/HomePage";

export const metadata: Metadata = {
  title: "Trang chủ",
};

export default function Home() {
  return <HomePage />;
}
