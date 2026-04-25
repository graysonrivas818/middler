import Link from "next/link";

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

export default function StateSupplementarySections({ sections }) {
  if (!sections?.length) {
    return null;
  }

  return (
    <section className="px-5 py-14 lg:px-10 lg:py-20">
      <div className="container max-w-5xl">
        <div className="flex flex-col gap-14">
          {sections.map((section, index) => (
            <section key={`${section.heading}-${index}`} className="flex flex-col gap-6">
              <h2 className="text-3xl font-bold leading-tight text-gray-900 lg:text-5xl">
                {section.heading}
              </h2>
              <div className="flex flex-col gap-4">
                {renderSectionLines(section.lines, `supplementary-${index}`)}
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}