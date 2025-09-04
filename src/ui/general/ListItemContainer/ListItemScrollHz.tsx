import React from "react";

function ListItemScrollHz({
  children,
  description,
}: {
  children: React.ReactNode;
  description: string;
}) {
  return (
    <div className="">
      <h3 className=" px-4"> {description}</h3>
      <div className="flex overflow-auto no-scrollbar  p-4 gap-5 will-change-scroll ">
        {children}
      </div>
    </div>
  );
}

export default ListItemScrollHz;
