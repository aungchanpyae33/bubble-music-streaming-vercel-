import { useUserInfoContext } from "@/Context/ContextUserInfo";
import IconWrapper from "@/ui/general/IconWrapper";

import { LockKeyhole } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import OptionItem from "../OptionUI/OptionItem";
import OptionButton from "../OptionUI/OptionButton";
import OptionIconEl from "../OptionUI/OptionIconEl";
import OptionText from "../OptionUI/OptionText";

function PasswordChange() {
  const { userInfo } = useUserInfoContext();
  const b = useTranslations("block");

  if (userInfo?.app_metadata?.provider !== "email") {
    return null;
  }
  function handleClick() {}

  return (
    <Link href={`/auth/update-password`} className="block ">
      <OptionItem>
        <OptionButton action={handleClick}>
          <OptionIconEl>
            <IconWrapper size="small" Icon={LockKeyhole} />
          </OptionIconEl>
          <OptionText>{b("updatePassword")}</OptionText>
        </OptionButton>
      </OptionItem>
    </Link>
  );
}

export default PasswordChange;
