import useScreenSize from "@/lib/CustomHooks/ScreenSizeDetecter";
import { useEffect, useState } from "react";
import SearchToggleButton from "./SearchToggleButton";
import FormWrapper from "./FormWrapper";
import InputComponent from "./InputComponent";
function FormContainer({
  children,
  inputRef,
  setValue,
}: {
  children: React.ReactNode;
  inputRef: React.RefObject<HTMLInputElement | null>;
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
    <div className="w-[100%] sm:max-w-[500px] lg:max-w-[600px] mx-auto">
      <SearchToggleButton show={show} setShow={setShow} />
      <FormWrapper show={show} inputRef={inputRef}>
        <div className=" relative  w-full  ">
          <label>
            <span className="sr-only">Search</span>
            <div className="flex items-stretch">
              <SearchToggleButton show={show} setShow={setShow} />
              <InputComponent
                inputRef={inputRef}
                setValue={setValue}
                setShow={setShow}
              />
              <button
                className=" bg-black px-2"
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
      </FormWrapper>
    </div>
  );
}

export default FormContainer;
