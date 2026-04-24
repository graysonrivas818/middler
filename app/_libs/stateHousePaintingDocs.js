import fs from "fs";
import path from "path";
import { cache } from "react";

const SITE_URL = "https://middler.com";

const docFileBySlug = {
  "cost-to-paint-a-house-california": "cost-to-paint-a-house-california.txt",
  "cost-to-paint-a-house-new-york": "Cost to Paint a House in New York.txt",
  "cost-to-paint-a-house-arizona": "Cost to Paint a House in Arizona (2026).txt",
  "cost-to-paint-a-house-georgia": "Cost to Paint a House in Georgia 2026.txt",
  "cost-to-paint-a-house-ohio": "Cost to Paint a House in Ohio 2026.txt",
  "cost-to-paint-a-house-florida": "Cost to Paint a House in Florida .txt",
  "cost-to-paint-a-house-texas": "cost-to-paint-a-house-texas.txt",
  "cost-to-paint-a-house-illinois": "Illinois House Painting Cost Landing Page.txt",
  "cost-to-paint-a-house-pennsylvania": "Cost to Paint a House in Pennsylvania.txt",
  "cost-to-paint-a-house-north-carolina": "Cost to Paint a House in North Carolina .txt",
};

const headingMatchers = [
  /^How Much Will My /i,
  /^How Much Does It Cost to Paint a House/i,
  /^Cost to Paint a House in .* by Square Footage$/i,
  /^.*House Painting Cost by Square Footage$/i,
  /^Cost to Paint a House by /i,
  /^Cost by /i,
  /^.*House Painting Cost at a Glance/i,
  /^Interior vs Exterior Painting Costs/i,
  /^Interior vs Exterior Painting in /i,
  /^Interior vs\. exterior breakdown/i,
  /^What Factors Affect/i,
  /^Factors That Affect/i,
  /^Why Painting a House in .* Costs More Than the National Average/i,
  /^Why painting costs more/i,
  /^Labor Costs/i,
  /^How Do I Estimate/i,
  /^How to Estimate/i,
  /^DIY vs\./i,
  /^Is It Cheaper/i,
  /^When Is the Best Time/i,
  /^When to paint /i,
  /^Best Time of Year/i,
  /^Hidden cost factors/i,
  /^How to get an exact cost/i,
  /^Get a Free, Accurate/i,
  /^Get a Certified/i,
  /^Get an Accurate/i,
  /^Get Your Free/i,
  /^Why homeowners/i,
  /^Frequently Asked Questions/i,
  /^FAQ\b/i,
];

function normalizeLines(rawText) {
  return rawText
    .split(/\r?\n/)
    .map((line) => line.replace(/\u00a0/g, " ").trim())
    .filter(Boolean);
}

function isNumberedLabel(line) {
  return /^\d+\.\s+/.test(line);
}

function isTopLevelNumberedDocLabel(line) {
  const label = line.replace(/^\d+\.\s+/, "").trim();

  return /^(Meta title|SEO Title Tag|Meta description|Suggested URL Slug|URL Slug|Slug|H1|Hero intro|Hero CTA|Full Page|Full Page Body|Full Body Content|FAQ\b)/i.test(label);
}

function isHeading(line) {
  return headingMatchers.some((pattern) => pattern.test(line));
}

function isCtaLine(line) {
  return /estimate/i.test(line) && /(→|\/paint-estimator|free)/i.test(line);
}

function splitQuestionAnswer(line) {
  if (isCtaLine(line)) {
    return null;
  }

  const index = line.indexOf("?");
  if (index === -1 || index === line.length - 1) {
    return null;
  }

  const question = line.slice(0, index + 1).trim();
  const answer = line.slice(index + 1).trim();
  if (!question || !answer) {
    return null;
  }

  return { question, answer };
}

function parseFaqLines(lines) {
  const cleanedLines = lines.map(cleanLine).filter(Boolean);
  const faqs = [];

  for (let index = 0; index < cleanedLines.length; index += 1) {
    const line = cleanedLines[index];
    const inlineFaq = splitQuestionAnswer(line);

    if (inlineFaq) {
      faqs.push(inlineFaq);
      continue;
    }

    if (!/\?$/.test(line) || isCtaLine(line)) {
      continue;
    }

    const answerLines = [];
    let nextIndex = index + 1;

    while (nextIndex < cleanedLines.length && !/\?$/.test(cleanedLines[nextIndex])) {
      if (!isCtaLine(cleanedLines[nextIndex])) {
        answerLines.push(cleanedLines[nextIndex]);
      }
      nextIndex += 1;
    }

    if (answerLines.length) {
      faqs.push({
        question: line,
        answer: compactText(answerLines),
      });
      index = nextIndex - 1;
    }
  }

  return faqs;
}

function parseSectionsFromLines(lines) {
  const sections = [];
  let currentSection = null;

  for (const line of lines) {
    if (isHeading(line)) {
      if (currentSection) {
        sections.push(currentSection);
      }
      currentSection = {
        heading: line,
        lines: [],
      };
      continue;
    }

    if (!currentSection) {
      currentSection = {
        heading: "Overview",
        lines: [],
      };
    }

    currentSection.lines.push(line);
  }

  if (currentSection) {
    sections.push(currentSection);
  }

  return sections.filter((section) => section.lines.length > 0 || section.heading !== "Overview");
}

function parseNumberedDoc(lines, slug) {
  const items = [];
  let currentItem = null;

  for (const line of lines) {
    if (isNumberedLabel(line) && isTopLevelNumberedDocLabel(line)) {
      if (currentItem) {
        items.push(currentItem);
      }
      currentItem = {
        label: line.replace(/^\d+\.\s+/, "").trim(),
        lines: [],
      };
      continue;
    }

    if (currentItem) {
      currentItem.lines.push(line);
    }
  }

  if (currentItem) {
    items.push(currentItem);
  }

  const findItem = (matcher) => items.find((item) => matcher.test(item.label));
  const fullBodyItem = findItem(/^Full (Page|Page Body|Body Content)/i);

  if (fullBodyItem?.lines?.length) {
    const bodyLines = fullBodyItem.lines.map(cleanLine).filter(Boolean);
    const h1Item = findItem(/^H1$/i);
    const heroIntroItem = findItem(/^Hero intro/i);
    const heroCtaItem = findItem(/^Hero CTA$/i);
    const heroCtaText = heroCtaItem?.lines[0]?.replace(/^\[/, "").replace(/\]\s*\(.*$/, "").trim() || "Get a Free Estimate";
    const heroNote = heroCtaItem?.lines[1] || "";
    const metaTitle = findItem(/^Meta title$/i)?.lines[0] || findItem(/^SEO Title Tag$/i)?.lines[0] || slug;
    const metaDescription = findItem(/^Meta description$/i)?.lines[0] || "";
    const h1 = h1Item?.lines[0] || bodyLines[0] || metaTitle;
    const intro = heroIntroItem?.lines[0] || bodyLines[1] || "";

    let contentStart = 2;
    if (bodyLines[2] && isCtaLine(bodyLines[2])) {
      contentStart = 3;
    }

    const sections = parseSectionsFromLines(bodyLines.slice(contentStart));
    const faqSection = sections.find((section) => /^(Frequently Asked Questions|FAQ\b)/i.test(section.heading));
    const faqs = parseFaqLines(faqSection?.lines || []);

    return {
      slug,
      metaTitle,
      metaDescription,
      h1,
      intro,
      heroCtaText,
      heroNote,
      faqHeading: faqSection?.heading || "Frequently Asked Questions",
      sections: sections.filter((section) => !/^(Frequently Asked Questions|FAQ\b)/i.test(section.heading)),
      faqs,
    };
  }

  const metaTitle = findItem(/^Meta title$/i)?.lines[0] || findItem(/^SEO Title Tag$/i)?.lines[0] || slug;
  const metaDescription = findItem(/^Meta description$/i)?.lines[0] || "";
  const h1 = findItem(/^H1$/i)?.lines[0] || findItem(/^Full Page/i)?.lines[0] || metaTitle;
  const intro = findItem(/^Hero intro/i)?.lines[0] || "";
  const heroCtaItem = findItem(/^Hero CTA$/i);
  const heroCtaText = heroCtaItem?.lines[0]?.replace(/^\[/, "").replace(/\]\s*\(.*$/, "").trim() || "Get a Free Estimate";
  const heroNote = heroCtaItem?.lines[1] || "";

  const faqItem = findItem(/^FAQ\b/i);
  const faqs = parseFaqLines(faqItem?.lines || []);

  const sections = items
    .filter((item) => !/^Meta title$/i.test(item.label))
    .filter((item) => !/^Meta description$/i.test(item.label))
    .filter((item) => !/^H1$/i.test(item.label))
    .filter((item) => !/^Hero intro/i.test(item.label))
    .filter((item) => !/^Hero CTA$/i.test(item.label))
    .filter((item) => !/^FAQ\b/i.test(item.label))
    .map((item) => ({
      heading: item.lines[0] || item.label,
      lines: item.lines.slice(1),
    }))
    .filter((item) => item.heading);

  return {
    slug,
    metaTitle,
    metaDescription,
    h1,
    intro,
    heroCtaText,
    heroNote,
    faqHeading: faqItem?.label || "Frequently Asked Questions",
    sections,
    faqs,
  };
}

function parseFullBodyDoc(lines, slug) {
  const metaTitleIndex = lines.findIndex((line) => /^\d+\.\s*(Meta Title|SEO Title Tag)$/i.test(line));
  const metaDescriptionIndex = lines.findIndex((line) => /^\d+\.\s*Meta Description$/i.test(line));
  const fullBodyIndex = lines.findIndex((line) => /^\d+\.\s*(Full Page|Full Body Content)/i.test(line));

  const metaTitle = metaTitleIndex >= 0 ? lines[metaTitleIndex + 1] : slug;
  const metaDescription = metaDescriptionIndex >= 0 ? lines[metaDescriptionIndex + 1] : "";

  const bodyLines = lines.slice(fullBodyIndex + 1);
  const h1 = bodyLines[0] || metaTitle;
  const intro = bodyLines[1] || "";
  let contentStart = 2;
  let heroCtaText = "Get a Free Estimate";

  if (bodyLines[2] && isCtaLine(bodyLines[2])) {
    heroCtaText = bodyLines[2].replace(/^👉\s*/, "").trim();
    contentStart = 3;
  }

  const sections = parseSectionsFromLines(bodyLines.slice(contentStart));
  const faqSection = sections.find((section) => /^(Frequently Asked Questions|FAQ\b)/i.test(section.heading));
  const faqs = parseFaqLines(faqSection?.lines || []);

  return {
    slug,
    metaTitle,
    metaDescription,
    h1,
    intro,
    heroCtaText,
    heroNote: "",
    faqHeading: faqSection?.heading || "Frequently Asked Questions",
    sections: sections.filter((section) => !/^(Frequently Asked Questions|FAQ\b)/i.test(section.heading)),
    faqs,
  };
}

function parsePrefixedDoc(lines, slug) {
  const metaTitleLine = lines.find((line) => /^Meta title:/i.test(line));
  const metaDescriptionLine = lines.find((line) => /^Meta description:/i.test(line));
  const metaTitle = metaTitleLine?.replace(/^Meta title:\s*/i, "").trim() || slug;
  const metaDescription = metaDescriptionLine?.replace(/^Meta description:\s*/i, "").trim() || "";

  const bodyStartIndex = lines.findIndex((line) => /^How Much Does It Cost to Paint a House/i.test(line) || /^Cost to Paint a House in /i.test(line));
  const bodyLines = lines.slice(bodyStartIndex);
  const h1 = bodyLines[0] || metaTitle;
  const intro = bodyLines[1] || "";

  let contentStart = 2;
  let heroCtaText = "Get a Free Estimate";
  if (bodyLines[2] && isCtaLine(bodyLines[2])) {
    heroCtaText = bodyLines[2].trim();
    contentStart = 3;
  }

  const sections = parseSectionsFromLines(bodyLines.slice(contentStart));
  const faqSection = sections.find((section) => /^(Frequently Asked Questions|FAQ\b)/i.test(section.heading));
  const faqs = parseFaqLines(faqSection?.lines || []);

  return {
    slug,
    metaTitle,
    metaDescription,
    h1,
    intro,
    heroCtaText,
    heroNote: "",
    faqHeading: faqSection?.heading || "Frequently Asked Questions",
    sections: sections.filter((section) => !/^(Frequently Asked Questions|FAQ\b)/i.test(section.heading)),
    faqs,
  };
}

function toTitleCase(value) {
  return value
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function cleanLine(line) {
  return line
    .replace(/^👉\s*/, "")
    .replace(/^\[\s*/, "")
    .replace(/\s*\]\s*\(.*$/, "")
    .replace(/^\d+\.\s+/, "")
    .trim();
}

function getStateNameFromSlug(slug) {
  return toTitleCase(slug.replace(/^cost-to-paint-a-house-/, "").replace(/-/g, " "));
}

function deriveHighlight(heading) {
  if (/^How Much Does It Cost/i.test(heading)) {
    return "How Much Does It Cost";
  }

  if (/^How Much Will/i.test(heading)) {
    return "How Much Will";
  }

  if (/^Cost to Paint a House/i.test(heading)) {
    return "Cost to Paint a House";
  }

  if (/^Interior vs/i.test(heading)) {
    return "Interior vs Exterior";
  }

  if (/^What Factors Affect/i.test(heading)) {
    return "What Factors Affect";
  }

  if (/^How Do I Estimate/i.test(heading)) {
    return "How Do I Estimate";
  }

  if (/^How to Estimate/i.test(heading)) {
    return "How to Estimate";
  }

  if (/^Get an Accurate/i.test(heading)) {
    return "Get an Accurate";
  }

  if (/^Get a Free, Accurate/i.test(heading)) {
    return "Get a Free, Accurate";
  }

  if (/^Get Your Free/i.test(heading)) {
    return "Get Your Free";
  }

  if (/^Is It Cheaper/i.test(heading)) {
    return "Is It Cheaper";
  }

  return heading.split(/\s+/).slice(0, 3).join(" ");
}

function compactText(lines) {
  return lines.map(cleanLine).filter(Boolean).join(" ");
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
  return doc.sections.find((section) => matchers.some((matcher) => matcher.test(section.heading)));
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
    if (!line) {
      continue;
    }

    if (/^Project Type$/i.test(line) || /^Home Size$/i.test(line) || /^City$/i.test(line) || /^Tier$/i.test(line) || /^Interior/i.test(line) || /^Exterior/i.test(line) || /^DIY pros/i.test(line) || /^DIY cons/i.test(line)) {
      break;
    }

    description.push(line);
    if (description.length === 2) {
      break;
    }
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

    if (!label || !value || !lineHasPrice(value)) {
      break;
    }

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
    if (!title || !subsectionLines.length) {
      return null;
    }

    const description = subsectionLines.find((line) => isLikelyBodyText(line) && !lineHasPrice(line)) || subsectionLines[0] || "";
    let costRange = subsectionLines.find((line) => /Average .*cost|\$.*sq\s*ft|\$.*per square foot/i.test(line)) || "";
    let points = subsectionLines.filter((line) => line !== description && line !== costRange && (!isLikelyBodyText(line) || !lineHasPrice(line)));

    if (!points.length) {
      const csvLine = subsectionLines.find((line) => /:/.test(line));
      if (csvLine) {
        points = csvLine
          .split(":")
          .slice(1)
          .join(":")
          .split(/,|;| and /)
          .map((item) => item.trim())
          .filter(Boolean);
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
    description: compactText(introLines),
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

  return {
    description,
    points,
    closingText,
  };
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

const ohioFaqItems = [
  {
    question: "How much does it cost to paint a 2,000 sq ft house in Ohio?",
    answer: "Expect $3,500–$7,000 for interior, $4,500–$8,500 for exterior, and $7,500–$14,800 combined for a standard 2,000 sqft Ohio home in 2026. Older homes in Cleveland or Cincinnati push toward the high end because of plaster, prep, and lead-safe requirements.",
  },
  {
    question: "How much do painters charge per hour in Ohio?",
    answer: "Ohio painters cost $35–$75 per hour, with most independent pros at $45–$55/hour and larger crews in Columbus or Cleveland at $60–$75/hour. Most quote by the job, not the hour, but labor makes up 70–85% of a typical painting quote.",
  },
  {
    question: "What's the cheapest city in Ohio to paint a house?",
    answer: "Mid-size and rural metros like Toledo, Dayton, Youngstown, and Mansfield are typically the cheapest — often 8–15% less than Columbus or Cleveland thanks to lower labor and overhead costs.",
  },
  {
    question: "How often should I repaint my house in Ohio?",
    answer: "Plan on repainting the exterior every 5–10 years in Ohio, depending on siding and paint grade. Interiors last 7–12 years, with high-traffic areas like kitchens, hallways, and kids' rooms needing a refresh closer to 5 years.",
  },
  {
    question: "Do I need a permit to paint my house in Ohio?",
    answer: "No, standard residential painting does not require a permit anywhere in Ohio. You may need EPA RRP-certified contractors if your home was built before 1978, and HOA or historic district approval in neighborhoods like German Village or Ohio City.",
  },
  {
    question: "How long does it take to paint a house in Ohio?",
    answer: "A typical 2,000 sqft interior takes 3–5 days; an exterior takes 4–7 days weather permitting. Century homes, multi-story colonials, and brick jobs can stretch to 2–3 weeks.",
  },
  {
    question: "Does painting increase home value in Ohio?",
    answer: "Yes. A fresh exterior paint job returns 50–100% of its cost at resale in most Ohio markets, and interior repaints in neutral colors consistently shorten time-on-market. It's one of the highest-ROI pre-listing moves in Columbus, Cincinnati, and Cleveland.",
  },
  {
    question: "Is exterior paint more expensive in Ohio than other states?",
    answer: "Ohio exterior paint costs are roughly at or slightly below the national average. Labor is cheaper than coastal states, but Ohio's freeze-thaw climate demands higher-grade paint and primer, which evens out the total.",
  },
  {
    question: "How much does it cost to paint a brick house in Ohio?",
    answer: "Painting a brick home in Ohio costs $4,500–$12,000+, typically $3.50–$5.25 per square foot. Brick needs masonry primer, two topcoats, and careful prep — budget 20–40% more than you would for vinyl or wood siding.",
  },
  {
    question: "Can I paint my Ohio home in winter?",
    answer: "You can paint the interior year-round — in fact, it's when most Ohio painters offer discounts. Exterior painting in Ohio winter is not recommended because paint won't cure properly below 50°F.",
  },
];

const floridaFaqItems = [
  {
    question: "How much does it cost to paint a house in Florida?",
    answer: "The average cost to paint a house in Florida is $3,000–$10,000 for one scope (interior or exterior) and $7,000–$18,000 for a combined repaint of a 1,500–3,000 sq ft home. Prices vary by city, siding type, and prep requirements.",
  },
  {
    question: "How much to paint the exterior of a house in Florida?",
    answer: "Exterior painting cost in Florida runs $1.25–$4.50 per sq ft, or roughly $3,000–$10,000 for a typical single-story home. Two-story homes, coastal locations, and elastomeric coatings on stucco push the number higher.",
  },
  {
    question: "How much to paint the interior of a 2,000 sq ft house in Florida?",
    answer: "Expect $4,000–$9,000 for a 2,000 sq ft Florida interior with two coats, standard prep, and mid-grade paint. High ceilings, trim work, and premium paint add to the total.",
  },
  {
    question: "Why is painting a house in Florida more expensive?",
    answer: "Florida house painting prices are higher because of intense UV, humidity, salt air, and stucco-heavy construction. Paint fails faster (3–5 years vs 5–7 nationally), so premium UV- and mildew-resistant coatings are standard.",
  },
  {
    question: "How often should I repaint my house in Florida?",
    answer: "Most Florida exteriors need repainting every 3–5 years. Coastal homes on the low end of that range, inland homes with shaded elevations on the high end. Interiors typically go 5–8 years between repaints.",
  },
  {
    question: "What’s the best paint for Florida’s climate?",
    answer: "Look for 100% acrylic exterior paints with UV blockers and mildewcide. Sherwin-Williams Emerald, Behr Marquee, and Benjamin Moore Aura Exterior are common Florida picks. For stucco, elastomeric is the go-to.",
  },
  {
    question: "Do I need elastomeric paint for stucco in Florida?",
    answer: "For most aging stucco homes, yes. Elastomeric bridges hairline cracks and blocks wind-driven rain — a big deal during hurricane season. It costs about $1–$2 more per sq ft than standard acrylic but typically lasts longer on stucco.",
  },
  {
    question: "When is the best time of year to paint a house in Florida?",
    answer: "Late fall through early spring (November–April) is ideal. Humidity is lower, storms are rare, and temperatures are paint-friendly. Avoid July–September when daily storms and hurricane activity peak.",
  },
  {
    question: "Does a fresh paint job increase home value in Florida?",
    answer: "Yes. Exterior paint delivers roughly 55% ROI, and paint combined with landscaping can return up to 152% ROI on pre-sale homes, according to Zillow’s 2026 data. In Florida’s curb-appeal-driven coastal markets, a clean repaint is one of the highest-impact pre-listing moves.",
  },
  {
    question: "How much does it cost per square foot to paint a house in Florida?",
    answer: "Interior runs $2–$6 per sq ft. Exterior runs $1.25–$4.50 per sq ft. Add $1–$2 per sq ft for elastomeric coatings on stucco.",
  },
  {
    question: "Is it cheaper to paint a house in Jacksonville or Miami?",
    answer: "Jacksonville is typically 15–25% cheaper than Miami for the same scope. Miami labor rates, coastal prep, and permitting costs all run higher.",
  },
  {
    question: "How accurate is Middler’s Florida paint estimator?",
    answer: "The Middler paint estimator is marketed as 98% accurate because it pulls your property data and pairs it with local Florida labor and material rates — no guesswork. Try it free.",
  },
];

const illinoisFaqItems = [
  {
    question: "How much does it cost to paint a house in Chicago?",
    answer: "Painting a house in Chicago typically costs $2,700 – $8,500, depending on square footage and interior vs. exterior. Chicago runs 10–20% above the U.S. average because of higher labor rates, union pricing, permit requirements, and the prevalence of two- and three-story homes.",
  },
  {
    question: "How much does it cost to paint a 2,000 sq ft house in Illinois?",
    answer: "A 2,000 sq ft Illinois home usually costs $2,300 – $5,800 for interior painting and $3,100 – $7,000 for exterior painting. A combined interior + exterior repaint typically lands in the $5,500 – $11,000 range.",
  },
  {
    question: "Why is house painting more expensive in Chicago than downstate?",
    answer: "Chicago has higher labor rates, a strong union presence, stricter permit and parking rules, and more two- and three-story homes that require scaffolding or lifts. Downstate markets like Springfield and Peoria have lower labor costs and mostly single-story homes, which reduces total project cost.",
  },
  {
    question: "Do Illinois painters charge by the hour or by the sq ft?",
    answer: "Both. Most Illinois residential painters quote by square foot ($1.70–$4.40) or as a flat project price. Hourly billing ($45–$85/hour) is more common for small jobs, touch-ups, and repairs.",
  },
  {
    question: "How much does exterior painting cost in Illinois?",
    answer: "Exterior painting in Illinois typically runs $2.70 – $4.40 per square foot, or roughly $2,300 – $7,200 for most single-family homes. Prep work, two-story access, and wood repairs can push that higher.",
  },
  {
    question: "Is it worth hiring a professional painter in Illinois?",
    answer: "For exteriors and multi-story homes, yes. Illinois weather is tough on paint, and proper prep, priming, and application make a large difference in how long the finish lasts. For small interior rooms, DIY is often fine.",
  },
  {
    question: "How long does a paint job last in Illinois' climate?",
    answer: "Exterior paint jobs typically last 5–7 years in Illinois due to freeze–thaw cycles, humidity, and UV exposure. Interiors usually last 8–12 years between repaints, depending on traffic and finish.",
  },
  {
    question: "What's the cheapest month to paint a house in Illinois?",
    answer: "For interiors, January and February are typically the cheapest months — demand is low and crews offer discounts. For exteriors, late April and early October are the shoulder months with the best pricing.",
  },
  {
    question: "How much does it cost to paint a Victorian or historic home in Illinois?",
    answer: "Victorians and historic homes in Illinois typically cost $6,500 – $18,000+ to paint. Multiple trim colors, ornate detailing, tall elevations, and extensive prep on older wood siding all drive cost well above standard ranges.",
  },
  {
    question: "Can I get an instant cost to paint a house in Illinois without a home visit?",
    answer: "Yes. The Middler painting estimator returns a detailed Illinois-specific estimate in about 30 seconds using your address or job details — no contractor visit required.",
  },
];

const pennsylvaniaFaqItems = [
  {
    question: "How much does it cost to paint a house in Pennsylvania?",
    answer: "The cost to paint a house in Pennsylvania typically ranges from $1,800 to $8,500 in 2026. Interior-only jobs average $1,800–$5,500, exteriors run $2,500–$7,500, and full interior-plus-exterior projects land between $4,200 and $11,000.",
  },
  {
    question: "How much does it cost to paint a house in Philadelphia vs Pittsburgh?",
    answer: "Philadelphia averages $3.00–$7.50 per square foot, while Pittsburgh typically runs $2.50–$6.50 per square foot. A 2,000 sq ft interior job in Philly usually costs $5,500–$10,500; the same job in Pittsburgh is often $4,500–$9,000.",
  },
  {
    question: "How much to paint a 2,000 sq ft house in PA?",
    answer: "Expect $2,800–$6,200 for the interior and $3,800–$7,800 for the exterior of a 2,000 sq ft Pennsylvania home. Full interior-and-exterior projects typically run $6,500–$13,500.",
  },
  {
    question: "Do I need a permit to paint the exterior of my house in PA?",
    answer: "No state permit is required to paint a single-family home in Pennsylvania. However, homes in historic districts (parts of Philadelphia's Old City, Society Hill, Pittsburgh's Mexican War Streets, and Lancaster's historic core) often need color and material approval from a local historic commission before work begins.",
  },
  {
    question: "How much extra does lead paint testing cost in Pennsylvania?",
    answer: "A professional lead paint inspection in PA typically costs $300–$700. Full risk assessments with dust and soil sampling can reach $500–$900. If remediation is needed, expect $8–$17 per square foot of affected surface, or roughly $10,000–$30,000 for a whole house.",
  },
  {
    question: "What's the cheapest month to paint a house in PA?",
    answer: "January and February are usually the cheapest months to book an interior job in Pennsylvania, with many contractors offering 10–20% off-season discounts. For exteriors, late March and early November sometimes carry shoulder-season pricing — weather permitting.",
  },
  {
    question: "Can I paint the exterior of my PA home in winter?",
    answer: "Generally no. Most traditional exterior paints require surface and air temperatures above 50°F to cure properly. A few cold-weather formulas work down to 35°F, but PA winters also bring freeze-thaw cycles and moisture that compromise adhesion.",
  },
  {
    question: "How much do painters charge per hour in Pennsylvania?",
    answer: "Pennsylvania house painters typically charge $35–$85 per hour in 2026. Philadelphia crews are the most expensive at $45–$85, Pittsburgh and Lehigh Valley run $40–$70, and rural markets like Scranton, Erie, and Reading average $35–$60.",
  },
  {
    question: "Does painting increase home value in Pennsylvania?",
    answer: "Yes. A fresh interior paint job typically returns 1–3% of home value at resale, and a quality exterior repaint can recoup 50–100% of its cost. In competitive PA markets like the Philly suburbs, Pittsburgh's East End, and Lehigh Valley, fresh paint frequently helps homes sell faster and at higher prices.",
  },
  {
    question: "How accurate is Middler's paint estimator for PA homes?",
    answer: "Middler's estimator uses 2026 regional labor rates, PA-specific material costs, and adjustments for home age and surface type. It's highly accurate for budgeting and comparing quotes, though final pricing depends on contractor assessment of prep work and site conditions. Try the free Middler paint estimator to price your Pennsylvania project.",
  },
];

const georgiaFaqItems = [
  {
    question: "How much does it cost to paint a house in Georgia per square foot?",
    answer: "Interior painting in Georgia runs $1.50–$6.00 per sq ft, and exterior painting runs $1.20–$4.25 per sq ft depending on the city. Atlanta sits at the top end of both ranges, while Columbus and Augusta sit near the bottom.",
  },
  {
    question: "How much does it cost to paint the interior of a 2,000 sq ft house in Georgia?",
    answer: "The cost to paint interior of house Georgia homes around 2,000 sq ft typically falls between $2,800 and $5,500. Premium paint, ceilings, and detailed trim can push that closer to $6,500.",
  },
  {
    question: "How much does it cost to paint the exterior of a house in Atlanta, GA?",
    answer: "Exterior house painting cost Georgia averages sit at $3,373 for Atlanta, with a typical range of $2,104–$4,689. Two-story homes and heavy prep can push Atlanta exteriors above $7,000.",
  },
  {
    question: "Is it more expensive to paint a house in Atlanta than in Macon or Augusta?",
    answer: "Yes. Atlanta full-paint averages run $4,232–$5,565, while Macon runs $3,968–$5,191 and Augusta typically comes in slightly lower. The gap comes from higher Metro Atlanta labor rates and denser demand.",
  },
  {
    question: "How much do painters charge per hour in Georgia?",
    answer: "Georgia painters charge $40–$100 per hour, with about $42 per hour as the state average for skilled trades. Labor makes up 40–60% of most projects, and up to 70% on labor-heavy exterior jobs.",
  },
  {
    question: "How long does it take to paint a house in Georgia?",
    answer: "Interior projects usually take 2–5 days, and exteriors take 3–7 days. Humidity can extend exterior timelines in July and August because each coat needs longer to cure.",
  },
  {
    question: "Does Georgia's humidity affect painting cost or quality?",
    answer: "Yes. Humidity above 70% slows drying and encourages mildew, so many homeowners upgrade to mildew-resistant paint, which adds 15–25% to material cost. Skipping that upgrade in humid areas like Savannah often shortens the life of the job.",
  },
  {
    question: "What is the best time of year to paint a house in Georgia?",
    answer: "March–June and September–November are the best exterior windows. Interior painting is fine year-round, and winter often brings 10–20% discounts on inside jobs.",
  },
  {
    question: "How much does it cost to paint a 12×12 room in Georgia?",
    answer: "A 12×12 room in Georgia typically costs $300–$750 for walls only, and $450–$1,000 with trim and ceiling included. Premium paint or heavy drywall repair can push it higher.",
  },
  {
    question: "Do I need a permit to paint my house in Georgia?",
    answer: "No. Painting the interior or exterior of a single-family home in Georgia does not require a permit. HOA rules in neighborhoods like Alpharetta, Marietta, and Johns Creek often require color approval before you start, though.",
  },
  {
    question: "Does painting my house in Georgia increase its resale value?",
    answer: "Yes. A fresh paint job can raise home value by 2–5% and sharply improve curb appeal, especially in competitive Atlanta metro markets. Neutral colors and clean trim deliver the best return.",
  },
  {
    question: "How accurate is the Middler paint calculator for Georgia homes?",
    answer: "Middler's calculator is 98% accurate, trusted by more than 23,000 users, and has calculated over $350M in paint. It uses your Georgia address to pull local labor and material rates, so your estimate reflects Atlanta, Savannah, Macon, or wherever you live.",
  },
];

const texasFaqItems = [
  {
    question: "How much does it cost to paint a house in Texas?",
    answer: "The cost to paint a house in Texas typically ranges from $2,500 to $8,500, depending on home size, project scope, and city. Combined interior and exterior projects can exceed $12,000.",
  },
  {
    question: "How much does it cost to paint a 2,000 sq ft house in Texas?",
    answer: "A 2,000 sq ft Texas home costs $3,000–$6,500 for exterior painting and $4,000–$12,000 for full interior repainting, depending on prep and paint grade.",
  },
  {
    question: "Is it cheaper to paint a house in Texas than in other states?",
    answer: "Generally yes — Texas labor rates sit near or slightly below the national average, with San Antonio and El Paso among the most affordable major markets. Austin is the exception, running about 11% above the national average.",
  },
  {
    question: "How much do painters charge per hour in Texas?",
    answer: "Most Texas painters charge $35–$75 per hour. Two-person crews bill $70–$150 per hour combined, though most projects are quoted by the job.",
  },
  {
    question: "What is the best time of year to paint a house in Texas?",
    answer: "Late fall (October–November) and early spring (March–April) are ideal. Avoid June through August, when extreme heat causes paint to dry too fast and crack.",
  },
  {
    question: "How long does exterior paint last in Texas?",
    answer: "Quality UV-resistant acrylic paint lasts 5–7 years on south- and west-facing Texas walls and 7–10 years on shaded sides. Coastal homes with elastomeric paint typically last 4–6 years.",
  },
  {
    question: "How much does it cost to paint a brick or stucco house in Texas?",
    answer: "Painting brick or stucco in Texas adds $0.40–$1.00 per sq ft for prep and masonry primer. A 2,000 sq ft stucco home typically costs $4,000–$8,500 for exterior painting.",
  },
  {
    question: "Does painting a house increase its value in Texas?",
    answer: "Yes. A fresh exterior paint job returns 50–100% of its cost at resale in most Texas markets and improves curb appeal. Neutral, HOA-approved colors deliver the strongest ROI.",
  },
  {
    question: "Do I need HOA approval to paint my house in Texas?",
    answer: "If your home is in an HOA, yes — most Texas HOAs require written approval of exterior paint colors. Submit swatches early; approval typically takes 2–4 weeks.",
  },
  {
    question: "How much does it cost to paint the interior of a house in Texas?",
    answer: "Interior painting cost Texas runs $2,000–$6,000 for a typical home, or $2.00–$6.00 per square foot. Dallas averages $2,257 and Austin averages $2,453 for interior projects.",
  },
];

const northCarolinaWhatIsCalculator = {
  heading: "Is It Cheaper to Paint a House Yourself?",
  headingHighlight: "Is It Cheaper",
  description: "DIY painting can reduce costs, but it comes with trade-offs.",
  diyPros: [
    "Lower upfront cost (mostly paint and supplies)",
    "Full control over timeline and color choices",
    "Great for small interior rooms and single accent walls",
  ],
  diyCons: [
    "Time-consuming — a full exterior can eat 2–4 weekends",
    "NC humidity makes exterior DIY tricky for first-timers",
    "Ladder work on two-story homes is risky",
    "Poor prep leads to peeling in 1–2 years",
  ],
  description2: "",
  image: "/images/interior/cost to paint interior of house.webp",
};

const floridaWhatIsCalculator = {
  heading: "Is It Cheaper to Paint a House Yourself?",
  headingHighlight: "Is It Cheaper",
  description: "DIY painting can reduce costs, but it comes with trade-offs.",
  diyPros: [
    "Lower out-of-pocket cost on small interior rooms",
    "Full control of schedule and color choices",
  ],
  diyCons: [
    "Two-story Florida exteriors require real ladder and safety gear",
    "Stucco prep (patching, texturing, elastomeric application) is skilled work",
    "Mistakes on elastomeric or mildew-prone areas will show within a year",
  ],
  description2: "",
  image: "/images/mobile.webp",
};

const northCarolinaFaqItems = [
  {
    question: "How much does it cost to paint a house in North Carolina?",
    answer: "Most NC homeowners pay between $2,940 and $9,800 to paint a 2,000 sq ft home, depending on whether the project is interior, exterior, or both, plus your city and prep needs.",
  },
  {
    question: "What's the average cost per square foot to paint a home in NC?",
    answer: "Exterior painting in North Carolina averages $1 – $5 per sq ft, and interior painting averages $2 – $6 per sq ft fully loaded with labor and materials.",
  },
  {
    question: "How much to paint the exterior of a 2,000 sq ft house in NC?",
    answer: "Exterior painting for a 2,000 sq ft North Carolina home typically costs $2,940 – $9,800, with coastal homes in Wilmington and the Outer Banks trending toward the higher end due to marine-grade paint.",
  },
  {
    question: "How much to paint the interior of a house in Raleigh or Charlotte?",
    answer: "Raleigh interior painting averages $5,119 – $6,798, and Charlotte falls in a similar range. Smaller homes and simple single-coat jobs can come in under $3,000.",
  },
  {
    question: "Do I need a license to paint a house in North Carolina?",
    answer: "North Carolina requires a licensed general contractor for any single project costing $30,000 or more, per the NCLBGC. Most residential painting jobs fall below that threshold, but always verify with your contractor.",
  },
  {
    question: "What's the best season to paint a house in NC?",
    answer: "Spring and fall are ideal. Temperatures are moderate, humidity is lower, and paint cures properly. Avoid peak summer humidity and winter cold snaps below 50°F.",
  },
  {
    question: "How long does a paint job last in NC's humid climate?",
    answer: "A quality exterior paint job typically lasts 7–10 years in inland North Carolina and 5–7 years on coastal homes exposed to salt air and hurricane-force weather.",
  },
  {
    question: "Does painting increase home resale value in North Carolina?",
    answer: "Yes. A fresh paint job — especially neutral exterior colors — can boost resale value and is one of the highest-ROI upgrades NC real estate agents recommend before listing.",
  },
  {
    question: "Is it cheaper to paint a house in NC than the national average?",
    answer: "Yes, slightly. North Carolina runs about 2% below the national average for exterior painting, thanks to competitive labor rates averaging ~$42/hour for skilled trades in 2026.",
  },
  {
    question: "How can I get an accurate North Carolina paint estimate?",
    answer: "Use Middler's free NC paint estimator. It's built on local labor rates, delivers ~98% accurate pricing in 30 seconds, and has been trusted by 23,000+ users for over $350M in estimates.",
  },
];

const arizonaFaqItems = [
  {
    question: "How much does it cost to paint a house in Arizona?",
    answer: "The cost to paint a house in Arizona typically ranges from $1,800 to $8,500+ in 2026. Smaller single-story homes start around $1,800–$3,500, while larger or two-story homes in metros like Phoenix and Scottsdale often exceed $8,000 for a full interior-plus-exterior repaint.",
  },
  {
    question: "How much does it cost to paint a house in Phoenix?",
    answer: "Painting a house in Phoenix costs an average of $4,250–$8,700 for a full exterior repaint, and $1,133–$3,045 for smaller interior jobs (up to $5,398–$7,194 for larger homes). The Maricopa County average for a full repaint lands between $3,672 and $6,445.",
  },
  {
    question: "How much per square foot to paint a house in Arizona?",
    answer: "Painting cost per square foot in Arizona runs $1.50–$4.00 for exterior work and $2.00–$6.00 for interior work. Single-story exteriors trend toward $1.50–$2.50/sq ft, while two-story exteriors climb to $3.50–$4.00/sq ft due to scaffolding and added labor.",
  },
  {
    question: "Why is painting more expensive in Arizona than other states?",
    answer: "Arizona painting costs trend higher because of intense UV exposure (which demands premium paint), stucco exteriors (which absorb more paint and require more prep), monsoon and heat limits on scheduling, and strict HOA color-approval rules that can force repaints. Labor is also ~50% of project cost, and experienced desert painters charge a premium.",
  },
  {
    question: "What's the best time of year to paint a house in Arizona?",
    answer: "The best time to paint a house in Arizona is late fall, winter, or early spring — roughly October through April — when temperatures stay below 90°F and monsoon storms are off the calendar. Painting in summer risks poor adhesion, blistering, and faster fading.",
  },
  {
    question: "How long does exterior paint last in Arizona?",
    answer: "Exterior paint in Arizona typically lasts 7–8 years before UV damage, chalking, or HOA fade-out rules force a repaint. Premium UV-resistant and elastomeric paints can stretch that to 10+ years, while standard latex on a south-facing wall may need refresh in as few as 5 years.",
  },
  {
    question: "Do I need HOA approval to paint my house in Arizona?",
    answer: "Yes — most Arizona HOAs require written color approval before you paint. Submit your proposed color with enough lead time (usually 1–3 weeks) to avoid delays. Painting without approval can trigger fines and a forced repaint at your own expense.",
  },
  {
    question: "Is it cheaper to paint interior or exterior in Arizona?",
    answer: "Interior painting is usually the cheaper per-project choice in Arizona for small to mid-size jobs because it requires less prep and no weather planning. But on a per-square-foot basis, exterior painting on a single-story home ($1.50–$2.50/sq ft) can actually be cheaper than interior work ($2.00–$6.00/sq ft) — it depends on the size and stories of your home.",
  },
  {
    question: "How much does it cost to paint a 2,000 sq ft house in Arizona?",
    answer: "Painting a 2,000 sq ft house in Arizona costs roughly $3,000–$7,000 for the exterior and $3,000–$7,000 for the interior, or $6,000–$12,000 for a full interior-plus-exterior repaint. Two-story homes and premium elastomeric paint push the higher end.",
  },
  {
    question: "Does elastomeric paint really last longer in Arizona?",
    answer: "Yes. Elastomeric coatings are thicker, flex with stucco movement, and resist UV far better than standard latex. They cost 30–50% more upfront but can extend your repaint cycle by 3–5 years — often a net savings on Arizona homes.",
  },
  {
    question: "How much do painters charge per hour in Arizona?",
    answer: "Arizona painters typically charge $25–$50 per hour, with labor representing about 50% of total project cost. Premium crews, licensed contractors, and specialty work (elastomeric, custom finishes, high parapets) fall at the top of that range.",
  },
  {
    question: "Can I get an instant Arizona painting estimate online?",
    answer: "Yes. The Middler Paint Estimator gives you a 98%-accurate, data-backed Arizona painting estimate in under a minute — free, with no phone calls or contractor visits required.",
  },
];

function getResolvedFaqItems(slug, doc) {
  if (slug === "cost-to-paint-a-house-pennsylvania") {
    return pennsylvaniaFaqItems;
  }

  if (slug === "cost-to-paint-a-house-illinois") {
    return illinoisFaqItems;
  }

  if (slug === "cost-to-paint-a-house-florida") {
    return floridaFaqItems;
  }

  if (slug === "cost-to-paint-a-house-georgia") {
    return georgiaFaqItems;
  }

  if (slug === "cost-to-paint-a-house-ohio") {
    return ohioFaqItems;
  }

  if (slug === "cost-to-paint-a-house-texas") {
    return texasFaqItems;
  }

  if (slug === "cost-to-paint-a-house-north-carolina") {
    return northCarolinaFaqItems;
  }

  if (slug === "cost-to-paint-a-house-arizona") {
    return arizonaFaqItems;
  }

  return doc.faqs;
}

export const getStateHousePaintingLayoutContent = cache((slug) => {
  const doc = getStateHousePaintingDoc(slug);
  const stateName = getStateNameFromSlug(slug);
  const faqItems = getResolvedFaqItems(slug, doc);
  const estimateSection = findSection(doc, [/^How Much Will My /i, /^How Much Does It Cost to Paint a House/i]);
  const sizeSection = findSection(doc, [/by Square Footage/i, /^Cost by house size/i, /^Cost by size/i]);
  const compareSection = findSection(doc, [/^Interior vs/i]);
  const factorsSection = findSection(doc, [/^What Factors Affect/i, /^Why painting costs more/i, /^Factors That Affect/i]);
  const estimateHowSection = findSection(doc, [/^How Do I Estimate/i, /^How to Estimate/i]);
  const diySection = findSection(doc, [/^Is It Cheaper/i, /^DIY vs\./i]);
  const startEstimateSection = findSection(doc, [/^Get a Free, Accurate/i, /^Get an Accurate/i, /^Get Your Free/i]);

  const estimateTable = estimateSection
    ? parseKeyValueTable(estimateSection, ["Project Type", `Average Cost in ${stateName}`])
    : null;
  const sizeTable = sizeSection ? parseSquareFootageTable(sizeSection) : null;
  const compareContent = compareSection ? parseInteriorExteriorSection(compareSection) : null;
  const diyContent = diySection ? parseDiySection(diySection) : null;
  const estimateHowContent = estimateHowSection ? parseHowToEstimate(estimateHowSection) : null;

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
    calculateRoomCost: compareSection
      ? {
          heading: compareSection.heading,
          headingHighlight: deriveHighlight(compareSection.heading),
          description: compareContent?.description,
          interiorSection: compareContent?.interiorSection,
          exteriorSection: compareContent?.exteriorSection,
          image: "/images/interior/cost to paint a room.webp",
        }
      : null,
    whatIsCalculator:
      slug === "cost-to-paint-a-house-north-carolina"
        ? northCarolinaWhatIsCalculator
        : slug === "cost-to-paint-a-house-florida"
          ? floridaWhatIsCalculator
        : diySection
          ? {
              heading: diySection.heading,
              headingHighlight: deriveHighlight(diySection.heading),
              description: diyContent?.description,
              diyPros: diyContent?.diyPros?.length ? diyContent.diyPros : undefined,
              diyCons: diyContent?.diyCons?.length ? diyContent.diyCons : undefined,
              description2: diyContent?.description2,
              image: "/images/interior/cost to paint interior of house.webp",
            }
          : null,
    startEstimate: startEstimateSection
      ? {
          heading: startEstimateSection.heading,
          headingHighlight: deriveHighlight(startEstimateSection.heading),
          description: compactText(startEstimateSection.lines.filter((line) => !/^Try the free|^Free Estimator|^Get My Free|^👉|^Prefer national averages/i.test(line)).slice(0, 3)),
          ctaButton: {
            text: cleanLine(startEstimateSection.lines.find((line) => /→|\/paint-estimator|^\[|^👉/i.test(line)) || `Free ${stateName} Estimator`),
            url: "https://middler.com/paint-estimator",
          },
        }
      : null,
    showFaq: true,
    faqType: "costToPaintHouse",
    faqHeading: doc.faqHeading || `Frequently Asked Questions About Painting a House in ${stateName}`,
    benefits: estimateHowSection
      ? {
          heading: estimateHowSection.heading,
          headingHighlight: deriveHighlight(estimateHowSection.heading),
          description: estimateHowContent?.description,
          points: estimateHowContent?.points || [],
          closingText: estimateHowContent?.closingText || "",
        }
      : null,
    whoUseMiddler: factorsSection
      ? {
          heading: factorsSection.heading,
          headingHighlight: deriveHighlight(factorsSection.heading),
          description: getSectionDescription(factorsSection.lines),
          subHeading: "",
          points: parseCardsFromLines(factorsSection.lines),
        }
      : null,
    estimate: estimateTable && sizeTable
      ? {
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
        }
      : null,
    faqItems,
  };
});

export const getStateHousePaintingDoc = cache((slug) => {
  const fileName = docFileBySlug[slug];
  if (!fileName) {
    throw new Error(`Unsupported state house painting slug: ${slug}`);
  }

  const filePath = path.join(process.cwd(), "docs", "extracted", fileName);
  const rawText = fs.readFileSync(filePath, "utf8");
  const lines = normalizeLines(rawText);

  if (lines.some((line) => /^\d+\.\s+Meta title$/i.test(line) || /^\d+\.\s+SEO Title Tag$/i.test(line))) {
    return parseNumberedDoc(lines, slug);
  }

  if (lines.some((line) => /^\d+\.\s+(Full Page|Full Body Content)/i.test(line))) {
    return parseFullBodyDoc(lines, slug);
  }

  return parsePrefixedDoc(lines, slug);
});

export function getStateHousePaintingMetadata(slug) {
  const doc = getStateHousePaintingDoc(slug);
  const url = `${SITE_URL}/${slug}`;

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

export function getStateHousePaintingSchemas(slug) {
  const doc = getStateHousePaintingDoc(slug);
  const url = `${SITE_URL}/${slug}`;
  const faqItems = getResolvedFaqItems(slug, doc);

  const breadcrumbSchema = {
    "@context": "https://schema.org/",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: doc.h1,
        item: url,
      },
    ],
  };

  const faqSchema = faqItems.length
    ? {
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
      }
    : null;

  return {
    breadcrumbSchema,
    faqSchema,
  };
}