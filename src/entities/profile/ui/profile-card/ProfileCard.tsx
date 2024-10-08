"use client";

import { Group, Avatar, Stack } from "@mantine/core";
import { useAppSelector } from "shared/redux/hooks";
import { MyAlbums, MyPosts, ProfileCardAvatar } from "entities/profile";

import { cn } from "shared/lib/cn";
import {
	useIsAuthenticated,
	useIsNotAuthenticated,
	useSessionUser,
} from "config/nextauth/hooks";
import { LoginForm } from "widgets/login-form";

import s from "entities/profile/ui/profile-card/ProfileCard.module.css";

export function ProfileCard() {
	const albums = useAppSelector((state) => state.albums.favoriteAlbums || []);
	const albumCount = albums.length.toString();
	const posts = useAppSelector((state) => state.posts.favoritePosts || []);
	const postCount = posts.length.toString();

	const isAuth = useIsAuthenticated();
	const isNotAuth = useIsNotAuthenticated();

	const user = useSessionUser();

	return (
		<Stack gap={24} className={cn(s.card)}>
			{isNotAuth ? <LoginForm /> : null}

			{isAuth ? (
				<>
					<Group gap="xl" justify="space-between" className={s.info}>
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
					<Stack>
						<div>Id {user?.id}</div>
						<div>Email {user?.username}</div>
						<div>Role {user?.role}</div>
					</Stack>

					<MyAlbums />
					<MyPosts />
				</>
			) : null}
		</Stack>
	);
}
