import { Image } from "@heroui/image";
import { cn } from "@heroui/theme";

interface LogoProps {
  size?: number;
}

function Logo({ size }: Readonly<LogoProps>) {
  return (
    <Image
      classNames={{
        img: cn("transition-all duration-300 ease-in-out"),
        wrapper: "transition-all duration-300 ease-in-out",
      }}
      src="/sonaha.jpg"
      width={size}
    />
  );
}

export default Logo;
