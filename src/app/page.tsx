import { Input } from "@/shared/ui";
import { Stack, Group } from "@mantine/core";
import { Albums } from "@/entities/albums/ui/album-list/AlbumList";
import { Posts } from "@/entities/posts/ui/post-list/PostList";

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
