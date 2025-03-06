import { ReactNode } from "react";

import { Navbar } from "@/components/common/navbar";
import Contact from "@/components/common/contactbt";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Contact/>
    </div>
  );
}
