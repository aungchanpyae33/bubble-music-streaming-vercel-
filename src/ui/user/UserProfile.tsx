"use client";
import { ReactNode, useRef, useState } from "react";
import { clsx } from "clsx";
import CloseFunctoion from "@/lib/CloseFunction";
import OutterClick from "@/lib/OutterClick";

function UserProfile({
  name,
  children,
}: {
  name: string;
  children: ReactNode;
}) {
  const userName = name.slice(0, 1);
  const [userOpen, setUserOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const parentRef = useRef<HTMLDivElement | null>(null);
  CloseFunctoion(userOpen, setUserOpen, buttonRef);
  OutterClick(userOpen, setUserOpen, parentRef);
  return (
    <div className=" relative z-10" ref={parentRef}>
      <button
        ref={buttonRef}
        className="bg-green-500 w-[40px] h-[40px] rounded-full flex items-center justify-center"
        onClick={() => setUserOpen(!userOpen)}
      >
        {userName}
      </button>
      <div
        className={clsx(
          "bg-green-500 absolute bottom-0 translate-y-full flex flex-col   right-0 w-[200px]",
          {
            hidden: !userOpen,
            block: userOpen,
          }
        )}
      >
        {children}
      </div>
    </div>
  );
}

export default UserProfile;
