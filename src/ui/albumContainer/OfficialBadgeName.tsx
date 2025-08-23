import { BadgeCheck } from "lucide-react";
import IconWrapper from "../general/IconWrapper";

function OfficialBadgeName() {
  return (
    <span title="official">
      <IconWrapper
        Icon={BadgeCheck}
        className=" ml-1 inline fill-[#3664ba] hover:scale-100 active:scale-100 "
      />
    </span>
  );
}

export default OfficialBadgeName;
