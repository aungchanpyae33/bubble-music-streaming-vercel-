import { useState } from "react";

function TitleInput() {
  const [value, setValue] = useState("");
  return (
    <>
      <label htmlFor="playlistname" className="leading-relaxed">
        ခေါင်းစဉ်
      </label>
      <span className=" w-full relative">
        <input
          type="text"
          name="playlistname"
          id="playlistname"
          required
          autoComplete="off"
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
          maxLength={100}
          className="h-[40px]  bg-blue w-full p-2 text-base rounded bg-[#222222] border border-neutral-200 border-opacity-25"
        />
        <span className=" text-zinc-400 absolute right-0 top-0 -translate-y-full">
          {`${value.length}/100`}
        </span>
      </span>
    </>
  );
}

export default TitleInput;
