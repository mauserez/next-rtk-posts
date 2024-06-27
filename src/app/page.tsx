"use client";

import { Input } from "@/shared/ui/controls/inputs";
import { Stack, Group } from "@mantine/core";
import { Albums } from "@/widgets/album/album-list/ui/AlbumList";
import { Posts } from "@/widgets/post/post-list/ui/PostList";
import { useState } from "react";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { ProfileLayout } from "@/core/layouts/profile-layout/ProfileLayout";

export default function Home() {
	const [searchString, setSearchString] = useState("");
	const debouncedSearch = useDebounce<string>(searchString, 1000);

	return (
		<ProfileLayout>
			<Stack gap={48}>
				<Group>
					<Input
						isSearch
						className="max-w-[320px]"
						value={searchString}
						onChange={(e) => setSearchString(e.target.value)}
						placeholder="Search something"
					/>
				</Group>

				<Albums title={debouncedSearch} />
				<Posts title={debouncedSearch} />
			</Stack>
		</ProfileLayout>
	);
}
