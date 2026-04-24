import { getStateHousePaintingMetadata, getStateHousePaintingSchemas } from "@/app/_libs/stateHousePaintingDocs";

export function generateMetadata() {
	return getStateHousePaintingMetadata("cost-to-paint-a-house-pennsylvania");
}

export default function CostToPaintAHousePennsylvaniaLayout({ children }) {
	const { breadcrumbSchema, faqSchema } = getStateHousePaintingSchemas("cost-to-paint-a-house-pennsylvania");

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