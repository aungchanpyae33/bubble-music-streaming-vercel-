import { BadgeCheck } from "lucide-react";
import IconWrapper from "../general/IconWrapper";

function OfficialBadgeName() {
  return (
    <div title="official">
      <IconWrapper
        Icon={BadgeCheck}
        className=" mr-1 fill-[#3664ba] hover:scale-100 active:scale-100 "
      />
    </div>
  );
}

export default OfficialBadgeName;
