import { twMerge } from "tailwind-merge";

interface OptionButtonProps extends React.ComponentProps<"button"> {
  children: React.ReactNode;
}
const baseStyle = "flex w-full h-full items-center";
function OptionButton({ className, children, ...props }: OptionButtonProps) {
  return (
    <button className={twMerge(baseStyle, className)} {...props}>
      {children}
    </button>
  );
}

export default OptionButton;
