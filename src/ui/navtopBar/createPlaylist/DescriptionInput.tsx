import { focusStateAction, useNotInputFocus } from "@/lib/zustand";
import { useState } from "react";

function DescriptionInput({ initValue }: { initValue?: string }) {
  const [textValue, setTextValue] = useState(initValue ? initValue : "");
  const setIsInputFocus = useNotInputFocus(
    (state: focusStateAction) => state.setIsInputFocus
  );
  return (
    <>
      <label htmlFor="playlistDescription" className="leading-relaxed">
        အကြောင်းအရာ( မဖြည့်လည်းရပါသည် )
      </label>
      <span className=" w-full relative">
        <textarea
          value={textValue}
          onChange={(e) => setTextValue(e.currentTarget.value)}
          onFocus={() => setIsInputFocus(true)}
          onBlur={() => setIsInputFocus(false)}
          maxLength={300}
          className="p-2 bg-blue w-full h-[150px] resize-none text-base bg-[#222222]
                          invalid:outline invalid:outline-red-900  border border-neutral-200 border-opacity-25 rounded"
          id="playlistDescription "
        />
        <span className=" text-zinc-400 absolute right-0 top-0 -translate-y-full">
          {`${textValue.length}/300`}
        </span>
      </span>
    </>
  );
}

export default DescriptionInput;
