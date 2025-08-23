import { twMerge } from "tailwind-merge";

const baseStyle = "bg-[#222222] rounded-lg p-5 md:px-6 sm:px-3 px-0";
interface SearchContainerProps extends React.ComponentProps<"div"> {}
function SearchContainer({ className, children }: SearchContainerProps) {
  return <div className={twMerge(baseStyle, className)}>{children}</div>;
}

export default SearchContainer;
