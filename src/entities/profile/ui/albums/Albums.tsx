import { SectionTitle, TextClamp, HorizontalScroller } from "@/shared/ui";
import { Stack } from "@mantine/core";
import s from "./Albums.module.css";

export const Albums = () => {
	return (
		<Stack className={s.albums}>
			<SectionTitle size="sm" boldText="Albums" />
			<HorizontalScroller className={s.albums}>
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
