import { outputBaseUrl } from "@/lib/outputBaseUrl";
import AuthContainer from "@/ui/auth/AuthContainer";
import BrandTitle from "@/ui/auth/BrandTitle";
import CheckEmailTitle from "@/ui/auth/forgotPassword/CheckEmailTitle";
import ResetPasswordLinkInstruction from "@/ui/auth/forgotPassword/ResetPasswordLinkInstruction";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
export async function generateMetadata(): Promise<Metadata> {
  const meta = await getTranslations("MetaData");
  return {
    title: meta("checkResetLinkEmail.title"),
    description: meta("checkResetLinkEmail.description"),
    metadataBase: outputBaseUrl(),
    robots: {
      index: false,
      follow: false,
    },
    openGraph: {
      images: [],
    },
    twitter: {
      images: [],
    },
  };
}

function page() {
  return (
    <AuthContainer>
      <BrandTitle />
      <CheckEmailTitle />
      <ResetPasswordLinkInstruction />
    </AuthContainer>
  );
}

export default page;
