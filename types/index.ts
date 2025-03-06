import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type User = {
  user_id: string;
  name: string;
  email: string;
  phone: string;
  role_name: string;
  face_id: string;
  created_at: string;
  updated_at: string;
  avartar_url: string;
  reset_token: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  user: User;
};

export type Province = {
  code: string;
  name: string;
  full_name: string;
  full_name_end: string;
  code_name: string;
};
// Định nghĩa enum cho các field của form (không cần gán giá trị cụ thể)
export enum ContactFields {
  email = "email",
  name = "name",
  phone = "phone",
  content = "content",
}

// Định nghĩa type cho contact data và errors
export type ContactData = {
  email: string;
  name: string;
  phone: string;
  content: string;
};

export type ContactErrors = {
  email?: string;
  name?: string;
  phone?: string;
  content?: string;
};
