import { ReactNode } from "react";

function OptionSubArrow({ children }: { children: ReactNode }) {
  return (
    <div className=" absolute flex items-center  h-full right-0">
      {children}
    </div>
  );
}

export default OptionSubArrow;
