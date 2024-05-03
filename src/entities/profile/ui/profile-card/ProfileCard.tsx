"use client";
import { MyAlbums, MyPosts } from "..";
import { Group, Avatar, Stack } from "@mantine/core";

import clsx from "clsx";
import s from "./ProfileCard.module.css";
import { useAppSelector } from "@/shared/store/redux/hooks";

export const ProfileCard = () => {
	const albums = useAppSelector((state) => state.albums.favoriteAlbums || []);
	const albumCount = albums.length.toString();
	const posts = useAppSelector((state) => state.posts.favoritePosts || []);
	const postCount = posts.length.toString();

	return (
		<Stack gap={48} className={clsx("rounded-r-3xl", s.card)}>
			<Group gap="xl" className={s.info}>
				<Group gap="xs">
					Albums
					<Avatar radius={11} size={32} className={s.badge}>
						{albumCount}
					</Avatar>
				</Group>
				<Group gap="xs">
					Posts
					<Avatar radius={11} size={32} className={s.badge}>
						{postCount}
					</Avatar>
				</Group>
				<Avatar size={48} className={s.avatar} radius="lg">
					О
				</Avatar>
			</Group>

			<MyAlbums />
			<MyPosts />
		</Stack>
	);
};
