"use client";

import { Group, Avatar, Stack } from "@mantine/core";
import { ButtonLink } from "@/shared/ui";

import { useAppSelector } from "@/shared/store/redux/hooks";
import { useSession } from "next-auth/react";

import { MyAlbums, MyPosts, ProfileCardAvatar } from "@/entities/profile/ui";

import { cn } from "@/shared/utils/cn";
import s from "./ProfileCard.module.css";

export const ProfileCard = () => {
	const albums = useAppSelector((state) => state.albums.favoriteAlbums || []);
	const albumCount = albums.length.toString();
	const posts = useAppSelector((state) => state.posts.favoritePosts || []);
	const postCount = posts.length.toString();

	const { status } = useSession();

	return (
		<Stack gap={48} className={cn(s.card)}>
			{status !== "loading" && status === "unauthenticated" ? (
				<ButtonLink href="/login" cssVariant="violet">
					Войти
				</ButtonLink>
			) : null}

			{status === "authenticated" ? (
				<>
					<Group gap="xl" className={s.info}>
						<Group>
							<Group gap="xs">
								Albums
								<Avatar radius={11} size={32} className={s.badge}>
									{albumCount}
								</Avatar>
							</Group>
							<Group gap="xs">
								Posts
								<Avatar radius={11} size={32} className={cn(s.badge)}>
									{postCount}
								</Avatar>
							</Group>
						</Group>

						<ProfileCardAvatar />
					</Group>

					<MyAlbums />
					<MyPosts />
				</>
			) : null}
		</Stack>
	);
};
