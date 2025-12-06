import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface OptionTextProps extends ComponentProps<"div"> {
  text: string;
}
const baseStyle = "flex-1 text-start max-w-[145px] truncate";
function OptionText({ text, className, ...props }: OptionTextProps) {
  return (
    <div className={twMerge(baseStyle, className)} {...props}>
      {text}
    </div>
  );
}

export default OptionText;
