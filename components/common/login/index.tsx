import { Button } from "@heroui/button";
import { Modal, ModalContent } from "@heroui/modal";

export default function LoginButton() {
  return (
    <>
      <Button color="primary" variant="solid">
        Login
      </Button>
      <Modal>
        <ModalContent>{(onClose) => <Button onPress={onClose} />}</ModalContent>
      </Modal>
    </>
  );
}
