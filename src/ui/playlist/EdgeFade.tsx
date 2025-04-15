import { twMerge } from "tailwind-merge";
interface EdgeFadeProp extends React.ComponentProps<"span"> {}
function EdgeFade({ className }: EdgeFadeProp) {
  const baseStyle = "absolute pointer-events-none w-[40px] h-full z-10";
  return <span className={twMerge(baseStyle, className)}></span>;
}

export default EdgeFade;
