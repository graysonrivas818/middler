import fs from "fs";
import path from "path";

const stateHousePaintingPagesPath = path.join(
  process.cwd(),
  "app",
  "constants",
  "stateHousePaintingPages"
);

export const stateHousePaintingPageConfigs = Object.fromEntries(
  fs
    .readdirSync(stateHousePaintingPagesPath)
    .filter((fileName) => fileName.endsWith(".json"))
    .map((fileName) => {
      const slug = fileName.replace(/\.json$/, "");
      const filePath = path.join(stateHousePaintingPagesPath, fileName);

      return [slug, JSON.parse(fs.readFileSync(filePath, "utf8"))];
    })
);

export function getStateHousePaintingPageConfig(slug) {
  return stateHousePaintingPageConfigs[slug] || null;
}