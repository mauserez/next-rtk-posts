import { Input } from "@/shared/ui";
import { Stack, Group } from "@mantine/core";
import { Albums } from "@/entities/albums/ui/Albums";
import { Posts } from "@/entities/posts/ui/Posts";

export default function Home() {
	return (
		<Stack gap={48}>
			<Group>
				<Input
					withLeftIcon
					style={{ width: "225px" }}
					placeholder="Search something"
				/>
			</Group>
			<Albums />
			<Posts />
		</Stack>
	);
}
