"use client";
import { useRef, useState } from "react";
import { clsx } from "clsx";
import CloseFunctoion from "@/lib/CloseFunction";
function UserProfile({ name }: { name: string }) {
  const userName = name.slice(0, 1);
  const [userOpen, setUserOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  CloseFunctoion(userOpen, setUserOpen, buttonRef);

  return (
    <div className="">
      <button
        ref={buttonRef}
        className="bg-green-500 w-[40px] h-[40px] rounded-full flex items-center justify-center"
        onClick={() => setUserOpen(!userOpen)}
      >
        {userName}
      </button>
      <div
        className={clsx(
          "bg-green-500 absolute bottom-0 translate-y-full  right-0 w-[200px] p-2",
          {
            hidden: !userOpen,
            block: userOpen,
          }
        )}
      >
        <p>hi</p>
        <p>hi</p>
        <p>hi</p>
      </div>
    </div>
  );
}

export default UserProfile;
