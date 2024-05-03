"use client";

import { LikeButton, SectionTitle } from "@/shared/ui";
import { Stack, Group, Avatar } from "@mantine/core";
import { useAppSelector, useAppDispatch } from "@/shared/store/redux/hooks";
import { removePost } from "@/shared/store/redux/slices/posts/PostsSlice";

import clsx from "clsx";
import s from "./MyPosts.module.css";

export const MyPosts = () => {
	const dispatch = useAppDispatch();
	const posts = useAppSelector((state) => state.posts.favoritePosts);

	return (
		<Stack>
			<SectionTitle size="sm" boldText="Posts" />
			{posts.map((post) => (
				<Stack key={post.id} gap="sm" className={s.posts}>
					<Group className={s.post}>
						<Group className={s.postBody}>
							<Avatar color="#fff" bg="#666" size={48} radius="lg">
								{post.id}
							</Avatar>
							<Stack gap={4}>
								<div className={s.title}>{post.title}</div>
								<div className={s.text}>{post.body}</div>
							</Stack>
						</Group>
						<Avatar>
							<LikeButton
								onClick={() => {
									dispatch(removePost(post.id));
								}}
								active
							/>
						</Avatar>
					</Group>
				</Stack>
			))}
		</Stack>
	);
};
