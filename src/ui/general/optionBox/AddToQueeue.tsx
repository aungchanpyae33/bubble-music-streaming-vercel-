import { ContextMoreOption } from "@/ui/trackComponent/MoreOptionContext";
import OptionButton from "./OptionButton";
import OptionItem from "./OptionItem";
import { useContext } from "react";
import { ListEnd } from "lucide-react";
import IconWrapper from "../IconWrapper";
import OptionIconEl from "./OptionIconEl";

function AddToQueeue() {
  const { setShow } = useContext(ContextMoreOption);
  return (
    <OptionItem>
      <OptionButton onClick={() => setShow(false)}>
        <OptionIconEl>
          <IconWrapper size="small" Icon={ListEnd} />
        </OptionIconEl>

        <span>add to the queeue </span>
      </OptionButton>
    </OptionItem>
  );
}

export default AddToQueeue;
