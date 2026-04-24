import Link from "next/link";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import { getStateHousePaintingDoc } from "@/app/_libs/stateHousePaintingDocs";

function isSubheading(line) {
  return line.endsWith(":") && line.length < 90;
}

function isParagraph(line) {
  return line.length > 90 || /[.!]$/.test(line) || /\$\d/.test(line) || /^\[/.test(line) || /^👉/.test(line);
}

function renderSectionLines(lines, keyPrefix) {
  const blocks = [];
  let listItems = [];

  const flushList = () => {
    if (!listItems.length) {
      return;
    }

    blocks.push(
      <ul key={`${keyPrefix}-list-${blocks.length}`} className="list-disc space-y-2 pl-6 text-base leading-7 text-gray-700 lg:text-lg">
        {listItems.map((item, index) => (
          <li key={`${keyPrefix}-item-${index}`}>{item}</li>
        ))}
      </ul>
    );

    listItems = [];
  };

  lines.forEach((line, index) => {
    if (/^\[.*\/paint-estimator/i.test(line) || /^👉\s*Get/i.test(line)) {
      flushList();
      blocks.push(
        <div key={`${keyPrefix}-cta-${index}`}>
          <Link
            href="/paint-estimator"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-700 lg:text-base"
          >
            {line.replace(/^👉\s*/, "").replace(/^\[/, "").replace(/\]\s*\(.*$/, "").trim()}
          </Link>
        </div>
      );
      return;
    }

    if (isSubheading(line)) {
      flushList();
      blocks.push(
        <h3 key={`${keyPrefix}-subheading-${index}`} className="text-xl font-semibold text-gray-900 lg:text-2xl">
          {line}
        </h3>
      );
      return;
    }

    if (isParagraph(line)) {
      flushList();
      blocks.push(
        <p key={`${keyPrefix}-paragraph-${index}`} className="text-base leading-7 text-gray-700 lg:text-lg">
          {line}
        </p>
      );
      return;
    }

    listItems.push(line);
  });

  flushList();
  return blocks;
}

export default function StateHousePaintingPage({ slug }) {
  const doc = getStateHousePaintingDoc(slug);

  return (
    <>
      <Header />
      <main>
        <section className="relative mt-14 bg-[#f8fafc] px-5 pb-14 pt-24 lg:mt-20 lg:px-10 lg:pb-20 lg:pt-28">
          <div className="container max-w-5xl">
            <div className="flex flex-col gap-6 text-center lg:text-left">
              <h1 className="text-4xl font-bold leading-tight text-gray-900 lg:text-6xl">
                {doc.h1}
              </h1>
              {doc.intro && (
                <p className="max-w-4xl text-base leading-7 text-gray-700 lg:text-xl lg:leading-9">
                  {doc.intro}
                </p>
              )}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/paint-estimator"
                  className="inline-flex w-full items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-700 sm:w-auto lg:text-base"
                >
                  {doc.heroCtaText}
                </Link>
                {doc.heroNote && (
                  <p className="text-sm text-gray-600 lg:text-base">{doc.heroNote}</p>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 py-14 lg:px-10 lg:py-20">
          <div className="container max-w-5xl">
            <div className="flex flex-col gap-14">
              {doc.sections.map((section, index) => (
                <section key={`${section.heading}-${index}`} className="flex flex-col gap-6">
                  <h2 className="text-3xl font-bold leading-tight text-gray-900 lg:text-5xl">
                    {section.heading}
                  </h2>
                  <div className="flex flex-col gap-4">
                    {renderSectionLines(section.lines, `${slug}-${index}`)}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </section>

        {doc.faqs.length > 0 && (
          <section className="bg-[#f8fafc] px-5 py-14 lg:px-10 lg:py-20">
            <div className="container max-w-4xl">
              <div className="flex flex-col gap-8">
                <h2 className="text-3xl font-bold text-gray-900 lg:text-5xl">Frequently Asked Questions</h2>
                <div className="flex flex-col gap-4">
                  {doc.faqs.map((faq, index) => (
                    <details key={`${faq.question}-${index}`} className="rounded-xl border border-gray-200 bg-white p-5">
                      <summary className="cursor-pointer text-lg font-semibold text-gray-900 lg:text-xl">
                        {faq.question}
                      </summary>
                      <p className="mt-4 text-base leading-7 text-gray-700 lg:text-lg">{faq.answer}</p>
                    </details>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}