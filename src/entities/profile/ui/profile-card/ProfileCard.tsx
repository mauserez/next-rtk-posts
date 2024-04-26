import clsx from "clsx";
import s from "./ProfileCard.module.css";
import { MyAlbums, MyPosts } from "..";
import { Group, Avatar, Badge, Stack } from "@mantine/core";

export const ProfileCard = () => {
	return (
		<Stack gap={48} className={clsx("rounded-r-3xl", s.card)}>
			<Group gap="xl" className={s.info}>
				<Group gap="xs">
					Albums
					<Avatar radius={11} size={32} className={s.badge}>
						4
					</Avatar>
				</Group>
				<Group gap="xs">
					Posts
					<Avatar radius={11} size={32} className={s.badge}>
						2
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
