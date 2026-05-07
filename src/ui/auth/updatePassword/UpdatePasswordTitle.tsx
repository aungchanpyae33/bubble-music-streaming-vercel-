import IconWrapper from "@/ui/general/IconWrapper";
import { LockKeyhole } from "lucide-react";
import { getTranslations } from "next-intl/server";

async function UpdatePasswordTitle() {
  const au = await getTranslations("Auth");
  return (
    <h3 className=" font-semibold text-center flex items-center justify-center gap-2 text-lg ">
      <div className=" p-2 border border-bordersoft rounded-md">
        <IconWrapper Icon={LockKeyhole} size="medium" />
      </div>
      <span>{au("updatePassword")}</span>
    </h3>
  );
}

export default UpdatePasswordTitle;
