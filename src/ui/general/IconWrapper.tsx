import { LucideIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";
interface Props extends React.ComponentProps<"svg"> {
  Icon: LucideIcon;
  size?: "large" | "medium" | "small";
}
const baseSize = {
  large: "w-8 h-8",
  medium: "w-7 h-7",
  small: "w-6 h-6",
};
function IconWrapper({ Icon, size, className, ...props }: Props) {
  const baseStyle = `stroke-[0.8]  active:scale-90 transition-[scale] duration-200 ${
    baseSize[size!]
  }`;

  return <Icon className={twMerge(baseStyle, className)} {...props} />;
}

export default IconWrapper;
