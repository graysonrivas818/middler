import PageLayout from "@/components/layouts/PageLayout";
import { getStateHousePaintingLayoutContent } from "@/app/_libs/stateHousePaintingDocs";

export default function StateHousePaintingBasePage({ slug }) {
  const content = getStateHousePaintingLayoutContent(slug);

  return <PageLayout pageType="costToPaintHouse" contentOverride={content} />;
}