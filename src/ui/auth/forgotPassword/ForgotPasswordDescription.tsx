import { getTranslations } from "next-intl/server";

async function ForgotPasswordDescription() {
  const au = await getTranslations("Auth");
  return (
    <p className="text-center text-sm-base text-ink-400">
      {au("forgotPasswordDescription")}
    </p>
  );
}

export default ForgotPasswordDescription;
