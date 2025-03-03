import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type District = {
  code: string;
  name: string;
  full_name: string;
  full_name_en: string;
  code_name: string;
}
export type Province  = {
    code: string;
    name: string;
    full_name: string;
    full_name_en: string;
    code_name: string;
  }