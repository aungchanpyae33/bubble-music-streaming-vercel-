"use client";
import CloseFunctoion from "@/lib/CloseFunction";
import { useRef, useState } from "react";

function Too() {
  const [open, setOpen] = useState(false);

  const closeElement = useRef<HTMLButtonElement | null>(null);
  CloseFunctoion(open, setOpen, closeElement);

  return (
    <div>
      <button onClick={() => setOpen(!open)} ref={closeElement}>
        open
      </button>
      {open && (
        <div>
          <button>go</button>
          <button>go</button>
          <button>go</button>
          <button>go</button>
          <button>go</button>
        </div>
      )}
    </div>
  );
}

export default Too;
