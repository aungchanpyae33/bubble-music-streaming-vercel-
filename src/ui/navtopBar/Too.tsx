"use client";
import CloseFunctoion from "@/lib/CloseFunction";
import { useRef, useState } from "react";

function Too() {
  const [open, setopen] = useState(false);

  const closeElement = useRef<HTMLButtonElement | null>(null);
  CloseFunctoion(open, setopen, closeElement);

  return (
    <div>
      <button onClick={() => setopen(!open)} ref={closeElement}>
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
