import { useContext } from "react";
import { ContextToggle } from "./ToggleContext";
interface InputComponentProps {
  inputRef: React.RefObject<HTMLInputElement | null>;
  setValue: React.Dispatch<React.SetStateAction<string | null>>;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}
function InputComponent({ inputRef, setShow, setValue }: InputComponentProps) {
  const { setOpen } = useContext(ContextToggle);
  return (
    <input
      className="placeholder:text-slate-400 block bg-blue w-full h-[40px] pl-2 shadow-sm focus:outline-none sm:text-sm bg-black"
      placeholder="Search for song and artist"
      type="search"
      name="query"
      required
      autoComplete="off"
      spellCheck="false"
      ref={inputRef}
      onBlur={() => {
        setOpen(false);
        setShow(false);
      }}
      onFocus={() => {
        setOpen(true);
        setShow(true);
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          const inputElement = e.currentTarget;
          e.preventDefault();
          if (inputElement.selectionStart !== inputElement.value.length) {
            const goToEndValue = inputElement.value.length;
            inputElement.setSelectionRange(goToEndValue, goToEndValue);
            return;
          }
          e.currentTarget.blur();
        }
        if (e.key === "ArrowUp") {
          e.preventDefault();
        }
      }}
      onChange={(e) => {
        setOpen(true);
        setValue(e.currentTarget.value);
      }}
    />
  );
}

export default InputComponent;
