import { LucideIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";
interface Props extends React.ComponentProps<"svg"> {
  Icon: LucideIcon;
  size?: "exLarge" | "large" | "medium" | "small";
}
const baseSize = {
  exLarge: "w-10 h-10",
  large: "w-8 h-8",
  medium: "w-7 h-7",
  small: "w-6 h-6",
};
function IconWrapper({ Icon, size, className, ...props }: Props) {
  const baseStyle = `text-icon-foreground stroke-[0.8]  hover:scale-105   active:scale-90 transition-transform duration-200 ${
    baseSize[size!]
  }`;

  return <Icon className={twMerge(baseStyle, className)} {...props} />;
}

export default IconWrapper;
