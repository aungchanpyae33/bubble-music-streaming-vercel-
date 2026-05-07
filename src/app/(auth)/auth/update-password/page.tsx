import { outputBaseUrl } from "@/lib/outputBaseUrl";
import AuthContainer from "@/ui/auth/AuthContainer";
import BrandTitle from "@/ui/auth/BrandTitle";
import UpdatePasswordFromContainer from "@/ui/auth/updatePassword/UpdatePasswordFromContainer";
import UpdatePasswordInstruction from "@/ui/auth/updatePassword/UpdatePasswordInstruction";
import UpdatePasswordTitle from "@/ui/auth/updatePassword/UpdatePasswordTitle";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
export async function generateMetadata(): Promise<Metadata> {
  const meta = await getTranslations("MetaData");
  return {
    title: meta("updatePassword.title"),
    description: meta("updatePassword.description"),
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
      <UpdatePasswordTitle />
      <UpdatePasswordInstruction />
      <UpdatePasswordFromContainer />
    </AuthContainer>
  );
}

export default page;
