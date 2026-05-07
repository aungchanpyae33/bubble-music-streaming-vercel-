import BackToHomePage from "@/ui/NotFoundPage/BackToHomePage";
import { getTranslations } from "next-intl/server";
import AuthErrorText from "./AuthErrorText";
import Logo from "@/ui/NavtopBar/Logo";

async function AuthErrorUI() {
  const [b, e] = await Promise.all([
    getTranslations("block"),
    getTranslations("ErrorMsg"),
  ]);
  return (
    <>
      <AuthErrorText e={e} />
      <BackToHomePage b={b}>
        <Logo />
      </BackToHomePage>
    </>
  );
}

export default AuthErrorUI;
