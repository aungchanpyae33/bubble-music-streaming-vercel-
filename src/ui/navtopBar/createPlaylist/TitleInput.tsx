import { focusStateAction, useNotInputFocus } from "@/lib/zustand";
import clsx from "clsx";
import { useState } from "react";

function TitleInput({ initValue }: { initValue?: string }) {
  const [value, setValue] = useState(initValue ? initValue : "");
  const setIsInputFocus = useNotInputFocus(
    (state: focusStateAction) => state.setIsInputFocus
  );
  const [shake, setShake] = useState({
    setUp: false,
    setUpShake: false,
  });

  return (
    <>
      <div className=" flex w-full justify-between">
        <label htmlFor="playlistname" className="leading-relaxed">
          ခေါင်းစဉ်
        </label>
        <span
          onAnimationStart={() => {
            setShake({ setUpShake: true, setUp: true });
          }}
          onAnimationEnd={() => {
            setShake({ setUpShake: false, setUp: false });
          }}
          className={clsx("text-zinc-400", {
            "animate-headshake text-zinc-100": shake.setUpShake,
          })}
        >
          {`${value.length}/100`}
        </span>
      </div>

      <span className=" w-full relative">
        <input
          type="text"
          name="playlistname"
          id="playlistname"
          required
          autoComplete="off"
          spellCheck="false"
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
          onBeforeInput={() => {
            if (value.length === 100) {
              if (!shake.setUp) {
                // to stop immediate fill up true in press hold key
                setShake((pre) => ({ ...pre, setUpShake: true })); // trigger animation
              }
            } else {
              setShake((pre) => ({ ...pre, setUpShake: false }));
            }
          }}
          onFocus={() => setIsInputFocus(true)}
          onBlur={() => setIsInputFocus(false)}
          maxLength={100}
          className="h-[40px]  bg-blue w-full p-2 text-base rounded bg-[#222222] border border-neutral-200 border-opacity-25"
        />
      </span>
    </>
  );
}

export default TitleInput;
