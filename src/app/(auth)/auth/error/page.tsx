import { outputBaseUrl } from "@/lib/outputBaseUrl";
import AuthErrorUI from "@/ui/auth/authError/AuthErrorUI";
import { AuthErrorIcon } from "@/ui/CustomIcon/Icon";
import AppWrapper from "@/ui/general/SideEffectPageWrapper/AppWrapper";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const meta = await getTranslations("MetaData");
  return {
    title: meta("authError.title"),
    description: meta("authError.description"),
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
    <AppWrapper>
      <AuthErrorIcon className="text-ink-400" />
      <AuthErrorUI />
    </AppWrapper>
  );
}

export default page;
