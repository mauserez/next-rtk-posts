"use client";
import { MyAlbums, MyPosts } from "..";
import {
	Group,
	Avatar,
	AvatarProps,
	Stack,
	PolymorphicComponentProps,
} from "@mantine/core";

import { cn } from "@/shared/utils/cn";
import s from "./ProfileCard.module.css";
import { useAppSelector } from "@/shared/store/redux/hooks";

export const ProfileCard = () => {
	const albums = useAppSelector((state) => state.albums.favoriteAlbums || []);
	const albumCount = albums.length.toString();
	const posts = useAppSelector((state) => state.posts.favoritePosts || []);
	const postCount = posts.length.toString();

	return (
		<Stack gap={48} className={cn(s.card)}>
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
						<Avatar radius={11} size={32} className={s.badge}>
							{postCount}
						</Avatar>
					</Group>
				</Group>
				<Avatar size={48} className={s.avatar} radius="lg">
					O
				</Avatar>
			</Group>

			<MyAlbums />
			<MyPosts />
		</Stack>
	);
};

type ProfileCardAvatarProps = PolymorphicComponentProps<"div", AvatarProps>;
export const ProfileCardAvatar = (props: ProfileCardAvatarProps) => {
	const { className = "", radius = "lg", size = 48, ...otherProps } = props;

	return (
		<Avatar
			size={size}
			className={cn(s.avatar, className)}
			radius={radius}
			{...otherProps}
		>
			O
		</Avatar>
	);
};
