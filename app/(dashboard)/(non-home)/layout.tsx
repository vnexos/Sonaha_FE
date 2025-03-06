import { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return <div className="m-24">{children}</div>;
}
