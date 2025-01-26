import useScreenSize from "@/lib/CustomHooks/ScreenSizeDetecter";
import clsx from "clsx";
import { useEffect, useState } from "react";
import Form from "next/form";
import SearchToggleButton from "./SearchToggleButton";
function FormWrapper({
  children,
  inputRef,
  setopen,
  setValue,
}: {
  children: React.ReactNode;
  inputRef: React.RefObject<HTMLInputElement | null>;
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
      <SearchToggleButton show={show} setShow={setShow} />

      <Form
        action="/test"
        onSubmit={() => {
          setopen(false);
          inputRef.current?.blur();
        }}
        className={clsx(
          "w-full hidden sm:flex h-[50px] bg-black top-0 left-0 z-50 absolute  items-center  sm:w-auto md:bg-transparent sm:h-auto sm:static sm:z-auto sm:flex-none sm:items-start",
          {
            unhide: show,
          }
        )}
      >
        <div className="w-[100%] sm:max-w-[500px] lg:max-w-[600px] relative mx-auto ">
          <label>
            <span className="sr-only">Search</span>
            <div className="flex items-stretch gap-1 bg-white">
              <SearchToggleButton show={show} setShow={setShow} />
              <input
                className="placeholder:text-slate-400 block bg-blue w-full h-[40px] pl-2 shadow-sm focus:outline-none sm:text-sm bg-transparent "
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
                    const inputElement = e.currentTarget;
                    e.preventDefault();
                    if (
                      inputElement.selectionStart !== inputElement.value.length
                    ) {
                      const goToEndValue = inputElement.value.length;
                      inputElement.setSelectionRange(
                        goToEndValue,
                        goToEndValue
                      );
                      return;
                    }
                    e.currentTarget.blur();
                  }
                  if (e.key === "ArrowUp") {
                    e.preventDefault();
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
                onTouchStart={(e) => {
                  e.preventDefault(); // Prevent focus loss
                }}
                onMouseDown={(e) => {
                  e.preventDefault(); // Prevent focus loss
                }}
                onClick={() => {
                  setValue("");
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
