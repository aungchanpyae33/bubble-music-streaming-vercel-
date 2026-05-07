import { getTranslations } from "next-intl/server";

async function SignUpInstruction() {
  const au = await getTranslations("Auth");
  return (
    <div className="text-center w-full text-sm-base text-ink-400">
      {au("signUpSuccessContent")}
    </div>
  );
}

export default SignUpInstruction;
