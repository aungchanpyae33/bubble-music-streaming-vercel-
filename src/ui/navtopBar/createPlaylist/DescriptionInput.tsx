import { focusStateAction, useNotInputFocus } from "@/lib/zustand";
import clsx from "clsx";
import { useState } from "react";

function DescriptionInput({ initValue }: { initValue?: string }) {
  const [textValue, setTextValue] = useState(initValue ? initValue : "");
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
        <label htmlFor="playlistDescription " className="leading-relaxed">
          အကြောင်းအရာ( မဖြည့်လည်းရပါသည် )
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
          {`${textValue.length}/300`}
        </span>
      </div>

      <span className=" w-full relative">
        <textarea
          value={textValue}
          onChange={(e) => setTextValue(e.currentTarget.value)}
          onBeforeInput={() => {
            if (textValue.length === 300) {
              if (!shake.setUp) {
                // to stop immediate fill up true in press hold key
                setShake((pre) => ({ ...pre, setUpShake: true })); // trigger animation
              }
            } else {
              setShake((pre) => ({ ...pre, setUpShake: false }));
            }
          }}
          autoComplete="off"
          spellCheck="false"
          onFocus={() => setIsInputFocus(true)}
          onBlur={() => setIsInputFocus(false)}
          maxLength={300}
          className="p-2 bg-blue w-full h-[150px] resize-none text-base bg-[#222222]
                          invalid:outline invalid:outline-red-900  border border-neutral-200 border-opacity-25 rounded"
          id="playlistDescription"
        />
      </span>
    </>
  );
}

export default DescriptionInput;
