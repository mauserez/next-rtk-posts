import Image from "next/image";
import { SectionTitle } from "@/shared/ui";
import { Stack } from "@mantine/core";

export default function Home() {
	return (
		<Stack gap={48}>
			<div>
				<SectionTitle boldText="Discover" lightText="for yourself" />
			</div>

			<div>
				<SectionTitle size="sm" boldText="Top" lightText="reviews" />
			</div>
		</Stack>
	);
}
