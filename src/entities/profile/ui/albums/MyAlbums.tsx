import { SectionTitle, TextClamp, HorizontalScroller } from "@/shared/ui";
import { Stack } from "@mantine/core";
import s from "./MyAlbums.module.css";

export const MyAlbums = () => {
	return (
		<Stack>
			<SectionTitle size="sm" boldText="Albums" />
			<HorizontalScroller>
				{[...Array(10)].map((i, idx) => (
					<Stack key={idx} gap={"xs"} className={s.album}>
						<div className={s.albumImage}>img</div>
						<div>
							<div className={s.title}>Sky Garden</div>
							<TextClamp className={s.subtitle}>
								Auckland, New Zealand
							</TextClamp>
						</div>
					</Stack>
				))}
			</HorizontalScroller>
		</Stack>
	);
};
