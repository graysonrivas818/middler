import { getStateHousePaintingMetadata, getStateHousePaintingSchemas } from "@/app/_libs/stateHousePaintingDocs";

export function generateMetadata() {
	return getStateHousePaintingMetadata("cost-to-paint-a-house-north-carolina");
}

export default function CostToPaintAHouseNorthCarolinaLayout({ children }) {
	const { breadcrumbSchema, faqSchema } = getStateHousePaintingSchemas("cost-to-paint-a-house-north-carolina");

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(breadcrumbSchema),
				}}
			/>
			{faqSchema && (
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(faqSchema),
					}}
				/>
			)}
			{children}
		</>
	);
}