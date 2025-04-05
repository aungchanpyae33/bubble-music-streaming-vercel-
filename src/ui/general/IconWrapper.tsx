import { LucideIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";
interface Props extends React.ComponentProps<"svg"> {
  Icon: LucideIcon;
  size?: "large" | "medium" | "small";
}
function IconWrapper({ Icon, size, className, ...props }: Props) {
  const baseSize = {
    large: "w-8 h-8",
    medium: "w-7 h-7",
    small: "w-6 h-6",
  };
  const baseStyle = `stroke-[0.8] ${baseSize[size!]}`;

  return <Icon className={twMerge(baseStyle, className)} {...props} />;
}

export default IconWrapper;
