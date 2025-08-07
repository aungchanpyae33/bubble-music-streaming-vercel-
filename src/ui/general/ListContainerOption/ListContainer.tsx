import { ReactNode } from "react";

function ListContainer({ children }: { children: ReactNode }) {
  return (
    <div className=" border my-3 rounded border-gray-200/20 w-fit gap-x-6 p-3 h-[80px] flex items-center ">
      {children}
    </div>
  );
}

export default ListContainer;
