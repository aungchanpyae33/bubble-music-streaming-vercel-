import { twMerge } from "tailwind-merge";

interface OptionButtonProps extends React.ComponentProps<"button"> {
  children: React.ReactNode;
}
function OptionButton({ className, children, ...props }: OptionButtonProps) {
  const baseStyle = "flex w-full h-full items-center";
  return (
    <button className={twMerge(baseStyle, className)} {...props}>
      {children}
    </button>
  );
}

export default OptionButton;
