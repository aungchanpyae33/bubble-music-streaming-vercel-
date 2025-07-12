import { ContextMoreOption } from "@/ui/trackComponent/MoreOptionContext";
import OptionButton from "./OptionButton";
import OptionItem from "./OptionItem";
import { useContext } from "react";

function AddToQueeue({ iconEl }: { iconEl: React.ReactNode }) {
  const { setShow } = useContext(ContextMoreOption);
  return (
    <OptionItem>
      <OptionButton onClick={() => setShow(false)}>
        {iconEl}

        <span>add to the queeue </span>
      </OptionButton>
    </OptionItem>
  );
}

export default AddToQueeue;
