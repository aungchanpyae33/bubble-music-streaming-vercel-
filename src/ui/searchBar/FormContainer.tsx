import { useState } from "react";
import SearchToggleButton from "./SearchToggleButton";
import FormWrapper from "./FormWrapper";
import InputComponent from "./InputComponent";
import { X } from "lucide-react";
import IconWrapper from "../general/IconWrapper";
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
            <div
              className="flex items-stretch border border-neutral-200 border-opacity-25 focus-within:outline
            focus-within:outline-2 focus-within:outline-neutral-200 rounded-md overflow-hidden"
            >
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
                <IconWrapper
                  size="large"
                  Icon={X}
                  className="rounded-full scale-100 text-zinc-400 hover:text-white hover:scale-105  active:bg-[#333333]"
                />
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
