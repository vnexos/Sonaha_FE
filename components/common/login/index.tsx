import { Button } from "@heroui/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/modal";
import { addToast } from "@heroui/toast";
import { User as UserDisplay } from "@heroui/user";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { useLoginMutation } from "@/store/queries/auth";
import { clearLoginToken } from "@/store/slices/auth";
import { LoginRequest, User } from "@/types";
import { useAppDispatch, useAppSelector } from "@/utils/redux";

export default function LoginButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isVisible, setIsVisible] = useState(false);
  const user = useAppSelector((state) => state?.auth?.user as User);
  const dispatch = useAppDispatch();

  const toggleVisibility = () => setIsVisible(!isVisible);
  const { handleSubmit, control, reset, setValue } = useForm<LoginRequest>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [login, { isLoading }] = useLoginMutation();
  const onSubmit = async (data: LoginRequest) => {
    try {
      await login(data).unwrap();

      addToast({
        title: "Đăng nhập thành công",
        color: "success",
        classNames: {
          motionDiv: "z-[1000]",
        },
      });
      onClose();
      setValue("password", "");
    } catch {
      addToast({
        title: "Đăng nhập thất bại!",
        color: "danger",
        classNames: {
          motionDiv: "z-[1000]",
        },
      });
      reset();
    }
  };

  return user === undefined ? (
    <>
      <Button color="primary" variant="solid" onPress={onOpen}>
        Login
      </Button>
      <Modal
        backdrop="blur"
        classNames={{ backdrop: "z-20" }}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Đăng nhập</ModalHeader>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <ModalBody className="w-full">
                  <Controller
                    control={control}
                    name="email"
                    render={({
                      field: { name, value, onChange, onBlur, ref },
                      fieldState: { invalid, error },
                    }) => (
                      <Input
                        ref={ref}
                        isRequired
                        errorMessage={error?.message}
                        isInvalid={invalid}
                        label="Email"
                        labelPlacement="outside"
                        name={name}
                        validationBehavior="aria"
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="password"
                    render={({
                      field: { name, value, onChange, onBlur, ref },
                      fieldState: { invalid, error },
                    }) => (
                      <Input
                        ref={ref}
                        isRequired
                        endContent={
                          <button
                            aria-label="toggle password visibility"
                            className="focus:outline-none"
                            type="button"
                            onClick={toggleVisibility}
                          >
                            {isVisible ? (
                              <Icon
                                className="text-2xl text-default-400 pointer-events-none"
                                icon="solar:eye-linear"
                              />
                            ) : (
                              <Icon
                                className="text-2xl text-default-400 pointer-events-none"
                                icon="solar:eye-closed-linear"
                              />
                            )}
                          </button>
                        }
                        errorMessage={error?.message}
                        isInvalid={invalid}
                        label="Password"
                        labelPlacement="outside"
                        name={name}
                        type={isVisible ? "text" : "password"}
                        validationBehavior="aria"
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                      />
                    )}
                  />
                </ModalBody>
                <ModalFooter className="flex w-full items-end">
                  <Button variant="bordered" onPress={onClose}>
                    Hủy
                  </Button>
                  <Button color="primary" isLoading={isLoading} type="submit">
                    Đăng nhập
                  </Button>
                </ModalFooter>
              </Form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  ) : (
    <Dropdown classNames={{ base: "my-10" }} placement="bottom-start">
      <DropdownTrigger>
        <UserDisplay
          as="button"
          avatarProps={{
            isBordered: true,
            src: user.avartar_url,
          }}
          description={user.email}
          name={user.name}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="User Actions" variant="flat">
        {user.role_name === "admin" ? (
          <DropdownItem key="admin">
            <p className="font-bold">Xem trang admin</p>
          </DropdownItem>
        ) : (
          <></>
        )}
        <DropdownItem key="cai-dat">Cài đặt</DropdownItem>
        <DropdownItem
          key="logout"
          color="danger"
          onPress={() => dispatch(clearLoginToken())}
        >
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
