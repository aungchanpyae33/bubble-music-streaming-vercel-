import IconWrapper from "@/ui/general/IconWrapper";
import { ContextMoreOptionStack } from "@/ui/trackComponent/MoreOptionStackContext";
import { Plus } from "lucide-react";
import { useContext } from "react";

function InitCreateButton({ stackNum }: { stackNum: number }) {
  const { setStack } = useContext(ContextMoreOptionStack);
  return (
    <button
      className="mr-2"
      onClick={() => {
        setStack(stackNum);
      }}
    >
      <IconWrapper size="large" Icon={Plus} />
    </button>
  );
}

export default InitCreateButton;
