import { useState } from "react";
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

  return (
    <div className="w-[80%]  sm:max-w-[500px] lg:max-w-[600px] mx-auto">
      <SearchToggleButton show={show} setShow={setShow} />
      <FormWrapper show={show} inputRef={inputRef}>
        <div className=" relative  w-full  ">
          <label>
            <span className="sr-only">Search</span>
            <div className="flex items-stretch border border-neutral-200 border-opacity-25 focus-within:border-[3px] focus-within:border-opacity-100 focus-within:border-neutral-200 rounded-md overflow-hidden  ">
              <SearchToggleButton show={show} setShow={setShow} />
              <InputComponent
                inputRef={inputRef}
                setValue={setValue}
                setShow={setShow}
              />
              <button
                className="bg-[#222222]   px-2"
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
