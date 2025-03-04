import { Spinner } from "@heroui/spinner";

export default function LoadingPage() {
  return (
    <div className="z-[100000] absolute w-screen h-screen flex align-middle">
      <div className="w-fit h-fit m-auto">
        <Spinner color="primary" label="Đang tải trang..." size="lg" />
      </div>
    </div>
  );
}
