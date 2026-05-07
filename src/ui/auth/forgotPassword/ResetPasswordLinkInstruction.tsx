import { getTranslations } from "next-intl/server";

async function ResetPasswordLinkInstruction() {
  const au = await getTranslations("Auth");
  return (
    <div className="text-center text-sm-base w-full text-ink-400 ">
      {au("resetPasswordLinkSuccessContent")}
    </div>
  );
}

export default ResetPasswordLinkInstruction;
