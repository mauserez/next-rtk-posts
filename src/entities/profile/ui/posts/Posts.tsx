import { SectionTitle } from "@/shared/ui";
import { Stack } from "@mantine/core";

export const Posts = () => {
	return (
		<Stack>
			<SectionTitle size="sm" boldText="Posts" />
			<Stack gap="sm">
				<div className={s.post}>
					
				</div>
			</Stack>
		</Stack>
	);
};
