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
export const columns = [
  { key: "property_id", label: "Mã BĐS" },
  { key: "name", label: "Tên Bất Động Sản" },
  { key: "address", label: "Địa Chỉ" },
  { key: "public_price", label: "Giá Công Khai" },
  { key: "area", label: "Diện Tích (m²)" },
  { key: "status", label: "Trạng Thái" },
  { key: "number_of_bedrooms", label: "Số Phòng Ngủ" },
  { key: "number_of_bathrooms", label: "Số Phòng Tắm" },
  { key: "legal_status", label: "Tình Trạng Pháp Lý" },
  { key: "province", label: "Tỉnh/Thành Phố" },
  { key: "created_at", label: "Ngày Tạo" },
];
