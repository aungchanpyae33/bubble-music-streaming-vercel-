import { twMerge } from "tailwind-merge";

interface LyricPaddingBlockProps extends React.ComponentProps<"div"> {}
function LyricPaddingBlock({ className, children }: LyricPaddingBlockProps) {
  return <div className={twMerge(className)}>{children}</div>;
}

export default LyricPaddingBlock;
