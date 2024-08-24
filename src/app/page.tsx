"use client";

import { TextInput } from "@/shared/ui/inputs";
import { Stack, Group } from "@mantine/core";
import { AlbumList } from "@/widgets/album/album-list/ui/AlbumList";
import { PostList } from "@/widgets/post/post-list/ui/PostList";
import { useState } from "react";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { ProfileLayout } from "config/layouts";

export default function Home() {
	const [searchString, setSearchString] = useState("");
	const debouncedSearch = useDebounce<string>(searchString, 1000);

	return (
		<ProfileLayout>
			<Stack gap={48}>
				<Group>
					<TextInput
						isSearch
						className="max-w-[320px]"
						value={searchString}
						onChange={(e) => setSearchString(e.target.value)}
						placeholder="Search something"
					/>
				</Group>

				<AlbumList title={debouncedSearch} />
				<PostList title={debouncedSearch} />
			</Stack>
		</ProfileLayout>
	);
}
