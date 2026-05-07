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
    title: meta("termsPage.title"),
    description: meta("termsPage.description"),
    metadataBase: outputBaseUrl(),
    openGraph: {
      ...parentOg,
      url: "/terms",
    },
  };
}

async function TermsContent() {
  const t = await getTranslations("Terms");

  const renderList = (text: string) => {
    if (!text) return null;
    return text.split("\n").map((line, idx) => (
      <li key={idx} className="mt-1">
        {line.replace(/^•\s*/, "")}
      </li>
    ));
  };

  return (
    <>
      <header>
        <h1 className="text-2xl font-semibold mb-2">{t("title")}</h1>
        <p className="text-ink-400 text-sm">
          {t("lastUpdated")}
          {t("date")}
        </p>
      </header>

      <section className="mt-4">
        <p>{t("intro")}</p>
      </section>

      {/* 1. Project Nature */}
      <section className="mt-6">
        <h2 className="text-lg font-medium">{t("section1.title")}</h2>
        <p className="mt-1">{t("section1.desc")}</p>
        <p className="mt-2 text-sm text-ink-500 italic border-l-2 border-ink-200 pl-3">
          {t("section1.demo")}
        </p>
      </section>

      {/* 2. Copyright Disclaimer - Highlighted UI */}
      <section className="mt-6">
        <h2 className="font-semibold mb-1">{t("section2.title")}</h2>
        <div className="bg-section p-3 rounded-lg border border-borderFull text-sm">
          <p>{t("section2.warning")}</p>
        </div>
      </section>

      {/* 3. Usage & Downloads */}
      <section className="mt-6">
        <h2 className="text-lg font-medium">{t("section3.title")}</h2>
        <ul className="list-disc ml-6 mt-2 space-y-1">
          {renderList(t("section3.items"))}
        </ul>
      </section>

      {/* 4. User Accounts */}
      <section className="mt-6">
        <h2 className="text-lg font-medium">{t("section4.title")}</h2>
        <ul className="list-disc ml-6 mt-2 space-y-1">
          {renderList(t("section4.items"))}
        </ul>
      </section>

      {/* 5. Limitation of Liability */}
      <section className="mt-6">
        <h2 className="text-lg font-medium">{t("section5.title")}</h2>
        <p className="mt-1">{t("section5.desc")}</p>
      </section>

      {/* 6. Contact */}
      <section className="mt-8 pb-12 border-t pt-6">
        <h2 className="text-lg font-medium">{t("section6.title")}</h2>
        <p className="mt-1">
          {t("section6.contact")}
          <a
            className="text-blue-600 underline font-medium"
            href={`mailto:${t("section6.email")}`}
          >
            {t("section6.email")}
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
          <TermsContent />
        </Suspense>
      </div>
    </div>
  );
}

export default page;
