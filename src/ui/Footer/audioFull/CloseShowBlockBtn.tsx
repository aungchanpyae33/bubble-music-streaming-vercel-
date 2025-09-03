import { ShowBlockAction, useShowBlock } from "@/lib/zustand";
import IconWrapper from "@/ui/general/IconWrapper";
import { ChevronDown } from "lucide-react";

function CloseShowBlockBtn() {
  const setShowBlock = useShowBlock(
    (state: ShowBlockAction) => state.setShowBlock
  );
  return (
    <button
      className=" absolute px-2 border-b border-l border-gray-100/65 py-1 right-0 "
      onClick={() => setShowBlock(undefined)}
    >
      <IconWrapper Icon={ChevronDown} size="medium" />
    </button>
  );
}

export default CloseShowBlockBtn;
