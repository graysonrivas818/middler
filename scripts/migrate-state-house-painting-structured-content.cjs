const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");
const pagesDir = path.join(rootDir, "app", "constants", "stateHousePaintingPages");
const siteUrl = "https://middler.com";

function toTitleCase(value) {
  return value
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function getStateNameFromSlug(slug) {
  return toTitleCase(slug.replace(/^cost-to-paint-a-house-/, "").replace(/-/g, " "));
}

function cleanLine(line) {
  return String(line || "")
    .replace(/^👉\s*/, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/\[(.*?)\]/g, "$1")
    .replace(/^\d+\.\s+/, "")
    .trim();
}

function compactText(lines) {
  return lines.map(cleanLine).filter(Boolean).join(" ");
}

function deriveHighlight(heading) {
  if (/^How Much Does It Cost/i.test(heading)) return "How Much Does It Cost";
  if (/^How Much Will/i.test(heading)) return "How Much Will";
  if (/^Cost to Paint a House/i.test(heading)) return "Cost to Paint a House";
  if (/^Interior vs/i.test(heading)) return "Interior vs Exterior";
  if (/^What Factors Affect/i.test(heading)) return "What Factors Affect";
  if (/^Why painting costs more/i.test(heading)) return "Why painting costs more";
  if (/^How Do I Estimate/i.test(heading)) return "How Do I Estimate";
  if (/^How to Estimate/i.test(heading)) return "How to Estimate";
  if (/^Get an Accurate/i.test(heading)) return "Get an Accurate";
  if (/^Get a Free, Accurate/i.test(heading)) return "Get a Free, Accurate";
  if (/^Get Your Free/i.test(heading)) return "Get Your Free";
  if (/^Is It Cheaper/i.test(heading)) return "Is It Cheaper";
  return heading.split(/\s+/).slice(0, 3).join(" ");
}

function lineHasPrice(line) {
  return /\$|\d+\s*[–-]\s*\$?\d|\d+%|\d+\+|~\d/i.test(line);
}

function isLikelyBodyText(line) {
  return line.length > 70 || /[.!?]$/.test(line);
}

function isSizeLine(line) {
  return /^\d[\d,]*(?:\.\d+)?\+?\s*sq\s*ft/i.test(line);
}

function findSection(doc, matchers) {
  return (doc.sections || []).find((section) => matchers.some((matcher) => matcher.test(section.heading)));
}

function getSectionDescription(lines) {
  const cleanedLines = lines.map(cleanLine).filter(Boolean);

  if (
    cleanedLines.length >= 2
    && cleanedLines[0].length < 45
    && /^[A-Z][A-Za-z0-9'&,\- ]+:?$/i.test(cleanedLines[0])
    && isLikelyBodyText(cleanedLines[1])
  ) {
    return "";
  }

  const description = [];
  for (const line of cleanedLines) {
    if (!line) continue;
    if (description.length && /^[A-Z][A-Za-z0-9'&,\- ]+:?$/i.test(line)) {
      break;
    }
    if (/^Project Type$/i.test(line) || /^Project$/i.test(line) || /^Home Size$/i.test(line) || /^City$/i.test(line) || /^Tier$/i.test(line) || /^Interior/i.test(line) || /^Exterior/i.test(line) || /^DIY pros/i.test(line) || /^DIY cons/i.test(line)) {
      break;
    }
    description.push(line);
    if (description.length === 2) break;
  }

  return compactText(description);
}

function parseKeyValueTable(section, fallbackHeaders) {
  const lines = section.lines.map(cleanLine).filter(Boolean);
  const headerStart = lines.findIndex((line) => /^Project/i.test(line) || /^Typical /i.test(line) || /^Average /i.test(line));
  let headers = fallbackHeaders;
  let rowStart = 0;

  if (headerStart >= 0 && lines[headerStart + 1]) {
    headers = [lines[headerStart], lines[headerStart + 1]];
    rowStart = headerStart + 2;
  }

  const rows = [];
  let index = rowStart;
  while (index + 1 < lines.length) {
    const label = lines[index];
    const value = lines[index + 1];
    if (!label || !value || !lineHasPrice(value)) break;
    rows.push([label, value]);
    index += 2;
  }

  return {
    description: getSectionDescription(lines),
    headers,
    rows,
    footer: compactText(lines.slice(index)),
  };
}

function parseSquareFootageTable(section) {
  const lines = section.lines.map(cleanLine).filter(Boolean);
  const headerStart = lines.findIndex((line) => /^Home Size$/i.test(line));
  const firstRowIndex = lines.findIndex(isSizeLine);
  let headers = ["Home Size", "Interior Cost", "Exterior Cost"];
  let rowStart = 0;

  if (firstRowIndex > 0) {
    headers = lines.slice(headerStart >= 0 ? headerStart : 0, firstRowIndex);
    rowStart = firstRowIndex;
  }

  const rows = [];
  const columnCount = Math.max(headers.length, 2);
  let index = rowStart;
  while (index + columnCount - 1 < lines.length && isSizeLine(lines[index])) {
    rows.push(lines.slice(index, index + columnCount));
    index += columnCount;
  }

  return {
    description: getSectionDescription(lines),
    headers,
    rows,
    footer: compactText(lines.slice(index)),
  };
}

function parseFixedColumnTable(section, firstHeaderPattern, columnCount) {
  const lines = section.lines.map(cleanLine).filter(Boolean);
  const headerStart = lines.findIndex((line) => firstHeaderPattern.test(line));
  if (headerStart < 0 || !lines[headerStart + columnCount - 1]) return null;

  const headers = lines.slice(headerStart, headerStart + columnCount);
  const rows = [];
  let index = headerStart + columnCount;
  while (index + columnCount - 1 < lines.length) {
    rows.push(lines.slice(index, index + columnCount));
    index += columnCount;
  }

  return {
    description: compactText(lines.slice(0, headerStart)),
    headers,
    rows,
    footer: compactText(lines.slice(index)),
  };
}

function parseSupplementaryBenefits(section) {
  const lines = section.lines.map(cleanLine).filter(Boolean);
  return {
    heading: section.heading,
    headingHighlight: deriveHighlight(section.heading),
    description: lines[0] || "",
    points: lines.slice(1, 3),
    closingText: compactText(lines.slice(3)),
  };
}

function parseInteriorExteriorSection(section) {
  const lines = section.lines.map(cleanLine).filter(Boolean);
  const introLines = [];
  let interiorTitleIndex = -1;
  let exteriorTitleIndex = -1;

  for (let index = 0; index < lines.length; index += 1) {
    if (/^Interior/i.test(lines[index])) {
      interiorTitleIndex = index;
      break;
    }
    introLines.push(lines[index]);
  }

  if (interiorTitleIndex >= 0) {
    for (let index = interiorTitleIndex + 1; index < lines.length; index += 1) {
      if (/^Exterior/i.test(lines[index])) {
        exteriorTitleIndex = index;
        break;
      }
    }
  }

  const buildSubsection = (title, subsectionLines) => {
    if (!title || !subsectionLines.length) return null;

    const description = subsectionLines.find((line) => isLikelyBodyText(line) && !lineHasPrice(line)) || subsectionLines[0] || "";
    let costRange = subsectionLines.find((line) => /Average .*cost|\$.*sq\s*ft|\$.*per square foot/i.test(line)) || "";
    let points = subsectionLines.filter((line) => (
      line !== title
      && line !== description
      && line !== costRange
      && !/^Interior$/i.test(line)
      && !/^Exterior$/i.test(line)
      && (!isLikelyBodyText(line) || !lineHasPrice(line))
    ));

    if (!points.length) {
      const csvLine = subsectionLines.find((line) => /:/.test(line));
      if (csvLine) {
        points = csvLine.split(":").slice(1).join(":").split(/,|;| and /).map((item) => item.trim()).filter(Boolean);
      }
    }

    if (!costRange && /\$.*sq\s*ft/i.test(description)) {
      costRange = description;
    }

    return {
      title: /^Interior/i.test(title) ? "Interior Painting" : "Exterior Painting",
      description,
      points: points.slice(0, 5),
      costRange: costRange || description,
    };
  };

  return {
    description: compactText(introLines.filter((line) => !/^Interior vs Exterior$/i.test(line))),
    interiorSection: buildSubsection(lines[interiorTitleIndex], exteriorTitleIndex >= 0 ? lines.slice(interiorTitleIndex + 1, exteriorTitleIndex) : []),
    exteriorSection: buildSubsection(lines[exteriorTitleIndex], exteriorTitleIndex >= 0 ? lines.slice(exteriorTitleIndex + 1) : []),
  };
}

function parseCardsFromLines(lines) {
  const cards = [];
  const cleanedLines = lines.map(cleanLine).filter(Boolean);

  for (let index = 0; index < cleanedLines.length; index += 1) {
    const line = cleanedLines[index];
    const dashMatch = line.match(/^([^—-]+?)\s*[—-]\s+(.+)$/);
    const sentenceMatch = line.match(/^([^\.]+?)\.\s+(.+)$/);

    if (dashMatch) {
      cards.push({ title: dashMatch[1].trim(), description: dashMatch[2].trim() });
      continue;
    }

    if (/^[A-Z][A-Za-z0-9'&,\- ]+:?$/i.test(line) && cleanedLines[index + 1] && isLikelyBodyText(cleanedLines[index + 1])) {
      cards.push({ title: line.replace(/:$/, ""), description: cleanedLines[index + 1] });
      index += 1;
      continue;
    }

    if (sentenceMatch && line.length < 120) {
      cards.push({ title: sentenceMatch[1].trim(), description: sentenceMatch[2].trim() });
    }
  }

  return cards.slice(0, 6);
}

function parseHowToEstimate(section) {
  const lines = section.lines.map(cleanLine).filter(Boolean);
  const stepLinePattern = /^Measure|^Multiply|^Add |^Pick |^Use /i;
  const firstStepIndex = lines.findIndex((line) => stepLinePattern.test(line));
  const descriptionLines = firstStepIndex > 0 ? lines.slice(0, firstStepIndex) : [];
  const description = descriptionLines.length ? compactText(descriptionLines) : getSectionDescription(lines);
  const points = lines.filter((line) => stepLinePattern.test(line)).slice(0, 5);
  const closingText = compactText(lines.filter((line) => /^Worked example:/i.test(line) || /^Example:/i.test(line) || /^For a faster/i.test(line)).slice(0, 2));
  return { description, points, closingText };
}

function parseDiySection(section) {
  const lines = section.lines.map(cleanLine).filter(Boolean);
  const prosIndex = lines.findIndex((line) => /^DIY pros/i.test(line));
  const consIndex = lines.findIndex((line) => /^DIY cons/i.test(line));

  if (prosIndex >= 0 && consIndex >= 0) {
    const description = compactText(lines.slice(0, prosIndex));
    const diyPros = lines.slice(prosIndex + 1, consIndex).filter((line) => !lineHasPrice(line) || /Lower upfront|Flexible|Fine for|Save /i.test(line));
    const tail = lines.slice(consIndex + 1);
    const cleanedTail = tail.filter((line) => !/^Bottom line:/i.test(line));
    const diyCons = cleanedTail.filter((line) => !/For small|For large|hiring a pro|usually worth/i.test(line)).slice(0, 5);
    const description2 = compactText(cleanedTail.slice(diyCons.length));
    return { description, diyPros, diyCons, description2 };
  }

  return {
    description: compactText(lines.slice(0, 2)),
    diyPros: [],
    diyCons: [],
    description2: compactText(lines.slice(2, 5)),
  };
}

function buildStructuredContent(config) {
  const doc = config.doc;
  const slug = doc.slug;
  const stateName = getStateNameFromSlug(slug);
  const faqItems = config.faqItems || doc.faqs || [];
  const estimateSection = findSection(doc, [/^How Much Will My /i, /^How Much Does It Cost to Paint a House/i]);
  const sizeSection = findSection(doc, [/by Square Footage/i, /^Cost by house size/i, /^Cost by size/i]);
  const citySection = findSection(doc, [/^Painting Costs in Major .* Cities$/i]);
  const compareSection = findSection(doc, [/^Interior vs/i]);
  const factorsSection = findSection(doc, [/^What Factors Affect/i, /^Why painting costs more/i, /^Why painting costs more in/i, /^Factors That Affect/i]);
  const bestTimeSection = findSection(doc, [/^When Is the Best Time/i, /^Best Time of Year/i]);
  const estimateHowSection = findSection(doc, [/^How Do I Estimate/i, /^How to Estimate/i, /^How to get an exact cost/i]);
  const diySection = findSection(doc, [/^Is It Cheaper/i, /^DIY vs\./i]);
  const startEstimateSection = findSection(doc, [/^Get a Free, Accurate/i, /^Get an Accurate/i, /^Get Your Free/i, /^How to get an exact cost/i]);

  const estimateTable = estimateSection ? parseKeyValueTable(estimateSection, ["Project Type", `Average Cost in ${stateName}`]) : null;
  const sizeTable = sizeSection ? parseSquareFootageTable(sizeSection) : null;
  const cityTable = citySection ? parseFixedColumnTable(citySection, /^City$/i, 3) : null;
  const compareContent = compareSection ? parseInteriorExteriorSection(compareSection) : null;
  const diyContent = diySection ? parseDiySection(diySection) : null;
  const estimateHowContent = estimateHowSection ? parseHowToEstimate(estimateHowSection) : null;
  const secondaryBenefits = bestTimeSection ? parseSupplementaryBenefits(bestTimeSection) : null;
  const hasStandaloneEstimateHowSection = estimateHowSection && estimateHowSection.heading !== startEstimateSection?.heading;

  return {
    layoutVariant: "costToPaintHouse",
    showEstimate: false,
    showTextSlider: false,
    showGetStarted: false,
    hideHeroAddressForm: true,
    hideHeroStats: true,
    hero: {
      title: doc.h1,
      titleHighlight: deriveHighlight(doc.h1),
      description: doc.intro,
      heroImage: "/images/interior/Interior Painting Cost Calculator.webp",
    },
    estimate: estimateTable && sizeTable ? {
      heading: estimateSection.heading,
      headingHighlight: deriveHighlight(estimateSection.heading),
      preheading: "estimate",
      description: estimateTable.description,
      table1Headers: estimateTable.headers,
      table1Rows: estimateTable.rows,
      footer: estimateTable.footer,
      table2Heading: sizeSection.heading,
      table2Highlight: deriveHighlight(sizeSection.heading),
      table2Preheading: "pricing",
      table2Description: sizeTable.description,
      table2Headers: sizeTable.headers,
      table2Rows: sizeTable.rows,
      table2Footer: sizeTable.footer,
      table3Heading: cityTable?.headers?.length ? citySection.heading : undefined,
      table3Highlight: cityTable?.headers?.length ? deriveHighlight(citySection.heading) : undefined,
      table3Preheading: cityTable?.headers?.length ? "cities" : undefined,
      table3Description: cityTable?.description,
      table3Headers: cityTable?.headers,
      table3Rows: cityTable?.rows,
      table3Footer: cityTable?.footer,
    } : null,
    calculateRoomCost: compareSection ? {
      heading: compareSection.heading,
      headingHighlight: deriveHighlight(compareSection.heading),
      description: compareContent?.description,
      interiorSection: compareContent?.interiorSection,
      exteriorSection: compareContent?.exteriorSection,
      image: "/images/interior/cost to paint a room.webp",
    } : null,
    whoUseMiddler: factorsSection ? {
      heading: factorsSection.heading,
      headingHighlight: deriveHighlight(factorsSection.heading),
      description: getSectionDescription(factorsSection.lines),
      subHeading: "",
      points: parseCardsFromLines(factorsSection.lines),
    } : null,
    secondaryBenefits,
    benefits: hasStandaloneEstimateHowSection ? {
      heading: estimateHowSection.heading,
      headingHighlight: deriveHighlight(estimateHowSection.heading),
      description: estimateHowContent?.description,
      points: estimateHowContent?.points || [],
      closingText: estimateHowContent?.closingText || "",
    } : null,
    whatIsCalculator: config.whatIsCalculatorOverride || (diySection ? {
      heading: diySection.heading,
      headingHighlight: deriveHighlight(diySection.heading),
      description: diyContent?.description,
      diyPros: diyContent?.diyPros?.length ? diyContent.diyPros : undefined,
      diyCons: diyContent?.diyCons?.length ? diyContent.diyCons : undefined,
      description2: diyContent?.description2,
      image: "/images/interior/cost to paint interior of house.webp",
    } : null),
    startEstimate: startEstimateSection ? {
      heading: startEstimateSection.heading,
      headingHighlight: deriveHighlight(startEstimateSection.heading),
      description: compactText(startEstimateSection.lines.filter((line) => !/^Try the free|^Free Estimator|^Get My Free|^👉|^Prefer national averages/i.test(line)).slice(0, 3)),
      ctaButton: {
        text: cleanLine(startEstimateSection.lines.find((line) => /→|\/paint-estimator|^\[|^👉/i.test(line)) || `Free ${stateName} Estimator`),
        url: "https://middler.com/paint-estimator",
      },
    } : null,
    showFaq: true,
    faqType: "costToPaintHouse",
    faqHeading: doc.faqHeading || `Frequently Asked Questions About Painting a House in ${stateName}`,
    faqItems,
  };
}

function buildMetadata(doc) {
  const url = `${siteUrl}/${doc.slug}`;
  return {
    title: doc.metaTitle,
    description: doc.metaDescription,
    openGraph: {
      siteName: "Middler",
      title: doc.metaTitle,
      description: doc.metaDescription,
      url,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: doc.metaTitle,
      description: doc.metaDescription,
      url,
    },
    alternates: {
      canonical: url,
    },
    robots: "index, follow",
  };
}

function buildSchemas(doc, faqItems) {
  const url = `${siteUrl}/${doc.slug}`;
  return {
    breadcrumbSchema: {
      "@context": "https://schema.org/",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: siteUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: doc.h1,
          item: url,
        },
      ],
    },
    faqSchema: faqItems.length ? {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqItems.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    } : null,
  };
}

for (const fileName of fs.readdirSync(pagesDir).filter((name) => name.endsWith(".json"))) {
  const filePath = path.join(pagesDir, fileName);
  const config = JSON.parse(fs.readFileSync(filePath, "utf8"));
  const faqItems = config.faqItems || config.doc?.faqs || [];

  config.layoutContent = buildStructuredContent(config);
  config.metadata = buildMetadata(config.doc);
  config.schemas = buildSchemas(config.doc, faqItems);

  fs.writeFileSync(filePath, `${JSON.stringify(config, null, 2)}\n`, "utf8");
}

console.log("Structured state house painting content migrated into per-page JSON files.");