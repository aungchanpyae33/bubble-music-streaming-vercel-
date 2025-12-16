import { twMerge } from "tailwind-merge";
type EdgeFadeProp = React.ComponentProps<"span">;
const baseStyle = "absolute pointer-events-none w-[40px] h-full z-10";
function EdgeFade({ className }: EdgeFadeProp) {
  return <span className={twMerge(baseStyle, className)}></span>;
}

export default EdgeFade;
