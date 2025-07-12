import { ContextMoreOption } from "@/ui/trackComponent/MoreOptionContext";
import OptionButton from "./OptionButton";
import OptionItem from "./OptionItem";
import { useContext } from "react";
import { ListStart } from "lucide-react";
import IconWrapper from "../IconWrapper";
import OptionIconEl from "./OptionIconEl";

function AddToQueeue() {
  const { setShow } = useContext(ContextMoreOption);
  return (
    <OptionItem>
      <OptionButton onClick={() => setShow(false)}>
        <OptionIconEl>
          <IconWrapper size="medium" Icon={ListStart} />
        </OptionIconEl>

        <span>add to the queeue </span>
      </OptionButton>
    </OptionItem>
  );
}

export default AddToQueeue;
