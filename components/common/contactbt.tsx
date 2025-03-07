"use client";
import { Image } from "@heroui/image";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import { addToast } from "@heroui/toast";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";

import { useSendContactMutation } from "@/store/queries/contact";
import { ContactData, ContactErrors, ContactFields } from "@/types";

const Contact = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contactData, setcontactData] = useState<ContactData>({
    email: "",
    name: "",
    phone: "",
    content: "",
  });
  const [errors, setErrors] = useState<ContactErrors>({});

  const [sendContact, { isLoading }] = useSendContactMutation();

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const validateForm = () => {
    let isValid = true;
    const newErrors: ContactErrors = {};

    if (!contactData.name.trim()) {
      newErrors.name = "Tên không được để trống";
      isValid = false;
    }

    if (!contactData.email.trim()) {
      newErrors.email = "Email không được để trống";
      isValid = false;
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        contactData.email,
      )
    ) {
      newErrors.email = "Email không hợp lệ";
      isValid = false;
    }

    if (!contactData.phone.trim()) {
      newErrors.phone = "Số điện thoại không được để trống";
      isValid = false;
    } else if (!/^\d{10,11}$/.test(contactData.phone)) {
      newErrors.phone = "Số điện thoại phải là 10-11 số";
      isValid = false;
    }

    if (!contactData.content.trim()) {
      newErrors.content = "Nội dung không được để trống";
      isValid = false;
    } else if (contactData.content.length > 1000) {
      newErrors.content = "Nội dung không được vượt quá 1000 ký tự";
      isValid = false;
    }

    setErrors(newErrors);

    return isValid;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    const field = name as ContactFields;

    setcontactData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setcontactData({
      email: "",
      name: "",
      phone: "",
      content: "",
    });
    setErrors({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await sendContact(contactData).unwrap();
        addToast({
          title: "Đăng kí nhận tin thành công",
          description: "Chúng tôi sẽ sớm thông tin cho bạn",
          color: "success",
        });
        closeModal();
      } catch {}
    }
  };

  return (
    <div
      className={`
        fixed bottom-4 right-4 flex flex-col gap-4 z-50
        transition-all duration-300 ease-in-out
        ${scrollPosition > 0 ? " rounded-lg p-4" : ""}
      `}
    >
      <a
        aria-label="Liên hệ qua Zalo"
        className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 transition-colors"
        href="https://zalo.me/0853012003"
        rel="noopener noreferrer"
        target="_blank"
      >
        <Image
          alt="Zalo Icon"
          className="w-8 h-8 text-white rounded-full"
          src="https://sonagift.vn/upload/photo/images-1730705270.png"
        />
      </a>

      <a
        aria-label="Liên hệ qua Facebook"
        className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 transition-colors"
        href="https://www.facebook.com/Lyinsinc"
        rel="noopener noreferrer"
        target="_blank"
      >
        <Icon className="w-8 h-8 text-white" icon="ic:baseline-facebook" />
      </a>

      <button
        aria-label="Liên hệ qua Gmail"
        className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 transition-colors"
        onClick={openModal}
      >
        <Icon className="w-8 h-8 text-white" icon="ic:baseline-mail" />
      </button>

      <Modal
        className="max-w-md mx-auto p-2 bg-white shadow-lg border border-gray-300"
        isOpen={isModalOpen}
        onClose={closeModal}
      >
        <ModalContent>
          <ModalHeader className="text-lg font-semibold text-gray-800 p-2">
            Đăng ký nhận tin
          </ModalHeader>
          <ModalBody className="p-2 space-y-2">
            <form className="space-y-2" onSubmit={handleSubmit}>
              <div className="flex gap-2">
                <div className="w-1/2">
                  <input
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-none focus:ring-indigo-500 focus:border-indigo-500"
                    id={ContactFields.name}
                    name={ContactFields.name}
                    placeholder="Nhập tên của bạn"
                    type="text"
                    value={contactData.name}
                    onChange={handleChange}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                  )}
                </div>
                <div className="w-1/2">
                  <input
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-none focus:ring-indigo-500 focus:border-indigo-500"
                    id={ContactFields.phone}
                    name={ContactFields.phone}
                    placeholder="Nhập số điện thoại (10-11 số)"
                    type="tel"
                    value={contactData.phone}
                    onChange={handleChange}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                  )}
                </div>
              </div>
              <div>
                <input
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-none focus:ring-indigo-500 focus:border-indigo-500"
                  id={ContactFields.email}
                  name={ContactFields.email}
                  placeholder="Nhập email của bạn"
                  type="email"
                  value={contactData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>
              <div>
                <textarea
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-none focus:ring-indigo-500 focus:border-indigo-500"
                  id={ContactFields.content}
                  name={ContactFields.content}
                  placeholder="Nhập nội dung của bạn"
                  rows={2}
                  value={contactData.content}
                  onChange={handleChange}
                />
                {errors.content && (
                  <p className="mt-1 text-sm text-red-500">{errors.content}</p>
                )}
              </div>
            </form>
          </ModalBody>
          <ModalFooter className="p-2 flex flex-col gap-2">
            <button
              className="w-full bg-black text-white p-2 rounded-none hover:bg-gray-800 disabled:bg-gray-500"
              disabled={isLoading}
              onClick={handleSubmit}
            >
              {isLoading ? "Đang gửi..." : "Gửi"}
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Contact;
