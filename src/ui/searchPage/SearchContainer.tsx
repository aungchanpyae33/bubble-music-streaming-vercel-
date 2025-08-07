import { twMerge } from "tailwind-merge";

const baseStyle = "bg-[#222222] p-5 lg:px-10 md:px-6 sm:px-3 px-0";
interface SearchContainerProps extends React.ComponentProps<"div"> {}
function SearchContainer({ className, children }: SearchContainerProps) {
  return <div className={twMerge(baseStyle, className)}>{children}</div>;
}

export default SearchContainer;
