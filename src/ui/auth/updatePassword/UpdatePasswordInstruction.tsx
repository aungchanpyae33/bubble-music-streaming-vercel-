import { getTranslations } from "next-intl/server";

async function UpdatePasswordInstruction() {
  const au = await getTranslations("Auth");
  return (
    <p className="text-center text-sm-base text-ink-400">
      {au("updatePasswordInstruction")}
    </p>
  );
}

export default UpdatePasswordInstruction;
