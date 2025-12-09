"use client";
import { ReactNode, useRef, useState } from "react";
import { clsx } from "clsx";
import CloseFunctoion from "@/lib/CloseFunction";
import OutterClick from "@/lib/OutterClick";

function UserProfile({
  name,
  children,
}: {
  name: string | null | undefined;
  children: ReactNode;
}) {
  const userName = name && name.slice(0, 1);
  const [userOpen, setUserOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  CloseFunctoion(userOpen, setUserOpen, buttonRef, false);
  OutterClick(userOpen, setUserOpen, buttonRef);
  return (
    <div className=" relative z-10">
      <button
        ref={buttonRef}
        className="bg-[#222222] hover:bg-[#333333] w-[40px] h-[40px] rounded-full flex items-center justify-center"
        onClick={() => setUserOpen(!userOpen)}
      >
        {userName}
      </button>
      <div
        className={clsx(
          "bg-[#222222]  absolute -bottom-4 border-opacity-15 border border-neutral-200 translate-y-full rounded-sm flex flex-col   right-0 w-[250px]",
          {
            hidden: !userOpen,
            block: userOpen,
          }
        )}
      >
        <div className="p-2 flex  gap-x-3  border-b-[1px] border-gray-700">
          <div>icon</div>
          <div className="truncate">
            <div className=" truncate select-all">{name}</div>
            <div className=" select-all truncate">@aungchanpyae3304</div>
          </div>
        </div>
        <div onClick={() => setUserOpen(false)}>{children}</div>
      </div>
    </div>
  );
}

export default UserProfile;
