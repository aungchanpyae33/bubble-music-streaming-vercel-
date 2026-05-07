import { outputBaseUrl } from "@/lib/outputBaseUrl";
import ContextTextBoxLoading from "@/ui/loading/ContextTextBoxLoading";
import type { Metadata, ResolvingMetadata } from "next";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";

export async function generateMetadata(
  _: unknown,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const [meta, parentMeta] = await Promise.all([
    getTranslations("MetaData"),
    parent,
  ]);
  const parentOg = parentMeta.openGraph;
  return {
    title: meta("privacyPage.title"),
    description: meta("privacyPage.description"),
    metadataBase: outputBaseUrl(),
    openGraph: {
      ...parentOg,
      url: "/privacy",
    },
  };
}
async function PrivacyContent() {
  const t = await getTranslations("Privacy");

  // helper to split strings by newline into <li>
  const renderList = (text: string) => {
    if (!text) return null;
    return text.split("\n").map((line, idx) => <li key={idx}>{line}</li>);
  };

  return (
    <>
      <header>
        <h1 className="text-2xl font-semibold mb-4">{t("title")}</h1>
        <p className="text-ink-400 text-sm">
          {t("lastUpdated")}
          {t("date")}
        </p>
      </header>

      <section className="mt-4">
        <p>{t("intro")}</p>
      </section>

      {/* 1. Information We Collect */}
      <section className="mt-4">
        <h2 className="text-lg font-medium">{t("section1.title")}</h2>
        <p className="mt-1">{t("section1.desc")}</p>

        <ul className="list-disc ml-6 mt-2 space-y-1">
          <li>{t("section1.personal")}</li>
          <li>{t("section1.activity")}</li>
          <li>{t("section1.library")}</li>
        </ul>

        <p className="mt-3 text-sm italic text-ink-500">
          {t("section1.media")}
        </p>
      </section>

      {/* 2. How We Use Your Data */}
      <section className="mt-4">
        <h2 className="text-lg font-medium">{t("section2.title")}</h2>
        <ul className="list-disc ml-6 mt-1 space-y-1">
          {renderList(t("section2.use"))}
        </ul>

        <p className="font-semibold mt-3 italic">
          {t("section2.no").split("\n")[0]}
        </p>
        <ul className="list-disc ml-6">
          {t("section2.no")
            .split("\n")
            .slice(1)
            .map((line, idx) => (
              <li key={idx}>{line}</li>
            ))}
        </ul>
      </section>

      {/* 3. Data Storage & Tech */}
      <section className="mt-4">
        <h2 className="text-lg font-medium">{t("section3.title")}</h2>
        <p>{t("section3.desc")}</p>
        <div className="mt-2 space-y-1 border-l-2 border-gray-200 pl-4 py-1">
          <p className="text-sm"> {t("section3.cookies")}</p>
          <p className="text-sm"> {t("section3.local")}</p>
        </div>
      </section>

      {/* 4. Authentication */}
      <section className="mt-4">
        <h2 className="text-lg font-medium">{t("section4.title")}</h2>
        <p>{t("section4.desc")}</p>
      </section>

      {/* 5. Data Sharing */}
      <section className="mt-4">
        <h2 className="text-lg font-medium">{t("section5.title")}</h2>
        <p>{t("section5.desc")}</p>
      </section>

      {/* 6. User Control (Account Deletion) */}
      <section className="mt-4 p-4 bg-section rounded-lg border border-borderFull">
        <h2 className="text-lg font-medium">{t("section6.title")}</h2>
        <p className="text-ink-400 text-sm mt-1">{t("section6.desc")}</p>
      </section>

      {/* 7. Security */}
      <section className="mt-4">
        <h2 className="text-lg font-medium">{t("section7.title")}</h2>
        <p>{t("section7.desc")}</p>
      </section>

      {/* 8. Support */}
      <section className="mt-4 pb-12">
        <h2 className="text-lg font-medium">{t("section8.title")}</h2>
        <p>
          {t("section8.contact")}
          <a
            className="text-blue-600 underline font-medium"
            href={`mailto:${t("section8.email")}`}
          >
            {t("section8.email")}
          </a>
        </p>
      </section>
    </>
  );
}
function page() {
  return (
    <div className="p-2 sm:p-5 md:p-6 lg:p-8">
      <div className="mx-auto  max-w-3xl">
        <Suspense fallback={<ContextTextBoxLoading />}>
          <PrivacyContent />
        </Suspense>
      </div>
    </div>
  );
}

export default page;
