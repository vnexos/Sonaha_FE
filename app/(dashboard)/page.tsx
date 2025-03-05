import { Metadata } from "next";

import HomePage from "@/components/modules/HomePage";
import { Navbar } from "@/components/common/navbar";

export const metadata: Metadata = {
  title: "Trang chủ",
};

export default function Home() {
  return (
    <section className="h-full w-full">
      <Navbar />
      <HomePage />
    </section>
  );
}
