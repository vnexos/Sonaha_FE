import { Button } from "@heroui/button";
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
import { Controller, useForm } from "react-hook-form";

export default function LoginButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleSubmit, control } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <>
      <Button color="primary" variant="solid" onPress={onOpen}>
        Login
      </Button>
      <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
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
                        errorMessage={error?.message}
                        isInvalid={invalid}
                        label="Password"
                        labelPlacement="outside"
                        name={name}
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
                  <Button color="primary" type="submit">
                    Đăng nhập
                  </Button>
                </ModalFooter>
              </Form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
