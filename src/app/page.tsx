"use client";

import { Input } from "@/shared/ui";
import { Stack, Group } from "@mantine/core";
import { Albums } from "@/widgets/album-list/ui/AlbumList";
import { Posts } from "@/widgets/post-list/ui/PostList";
import { useState, ChangeEvent, createContext } from "react";
import { useDebounce } from "@/shared/hooks/useDebounce";

export const HomePageFilterContext = createContext({
	search: "",
});

export default function Home() {
	const [searchString, setSearchString] = useState("");
	const debouncedSearch = useDebounce<string>(searchString, 1000);

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchString(e.target.value);
	};

	return (
		<Stack gap={48}>
			<Group>
				<Input
					onChange={handleSearch}
					withLeftIcon
					style={{ width: "225px" }}
					placeholder="Search something"
				/>
			</Group>

			<HomePageFilterContext.Provider value={{ search: debouncedSearch }}>
				<Albums />
				<Posts />
			</HomePageFilterContext.Provider>
		</Stack>
	);
}
