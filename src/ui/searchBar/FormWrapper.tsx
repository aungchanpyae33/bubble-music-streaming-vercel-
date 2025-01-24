import useScreenSize from "@/lib/CustomHooks/ScreenSizeDetecter";
import clsx from "clsx";
import { useEffect, useState } from "react";
import Form from "next/form";
import SearchToggleButton from "./SearchToggleButton";
function FormWrapper({
  children,
  inputRef,
  open,
  setopen,
  setValue,
}: {
  children: React.ReactNode;
  inputRef: React.RefObject<HTMLInputElement | null>;
  open: boolean;
  setopen: React.Dispatch<React.SetStateAction<boolean>>;
  setValue: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  const [show, setShow] = useState(false);
  const isSmallScreen = useScreenSize("(max-width: 640px)");
  useEffect(() => {
    if (!isSmallScreen && document.activeElement !== inputRef.current) {
      setShow(false);
    }
  }, [isSmallScreen, inputRef]);

  return (
    <div>
      <button
        className={clsx(" sm:hidden bg-white h-[40px] px-3 ", {
          "inline-block ": open,
        })}
        onClick={() => {
          setShow(!show);
        }}
      >
        {show ? "Close" : "Open"}
      </button>

      <Form
        action="/test"
        onSubmit={() => {
          setopen(false);
          inputRef.current?.blur();
        }}
        className={clsx(
          "w-full hidden gap-1  sm:flex    h-[50px] bg-black top-0 left-0 z-50 absolute  items-center  sm:w-auto md:bg-transparent sm:h-auto sm:static sm:z-auto sm:flex-none sm:items-start",
          {
            unhide: show,
          }
        )}
      >
        <button
          className={clsx(" sm:hidden bg-white h-[40px] px-3 ", {
            "inline-block ": open,
          })}
          onClick={() => {
            setShow(!show);
          }}
        >
          {show ? "Close" : "Open"}
        </button>

        <div className="w-[100%] sm:max-w-[500px] lg:max-w-[600px] relative mx-auto">
          <label>
            <span className="sr-only">Search</span>
            <div className="flex items-stretch bg-white">
              <input
                className="placeholder:text-slate-400 block bg-blue w-full h-[40px] pl-9 shadow-sm focus:outline-none sm:text-sm bg-transparent"
                placeholder="Search for song and artist"
                type="search"
                name="query"
                required
                autoComplete="off"
                spellCheck="false"
                ref={inputRef}
                onBlur={() => {
                  setopen(false);
                  setShow(false);
                }}
                onFocus={() => {
                  setopen(true);
                  setShow(true);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Escape") {
                    e.preventDefault();
                    inputRef.current?.blur();
                  }
                }}
                onChange={(e) => {
                  setopen(true);
                  setValue(e.currentTarget.value);
                }}
              />
              <button
                className="border-l border-gray-300 px-2"
                type="reset"
                onClick={() => {
                  inputRef.current?.focus();
                  setopen(false);
                }}
              >
                Reset
              </button>
            </div>
            {children}
          </label>
        </div>
      </Form>
    </div>
  );
}

export default FormWrapper;
