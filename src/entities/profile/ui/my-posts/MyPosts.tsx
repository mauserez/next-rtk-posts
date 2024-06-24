"use client";

import Link from "next/link";
import { SectionTitle, TextClamp } from "@/shared/ui";
import { Stack, Group, Avatar } from "@mantine/core";
import { useAppSelector, useAppDispatch } from "@/shared/store/redux/hooks";
import { removePost } from "@/shared/store/redux/slices/posts/PostsSlice";
import { FaRegTrashCan } from "react-icons/fa6";

import s from "./MyPosts.module.css";

export const MyPosts = () => {
	const dispatch = useAppDispatch();
	const posts = useAppSelector((state) => state.posts.favoritePosts);

	return (
		<Stack>
			<SectionTitle size="sm" boldText="Posts" />
			{posts.length ? (
				posts.map((post) => (
					<Stack key={post.id} gap="sm" className={s.posts}>
						<Group className={s.post} wrap="nowrap" justify="space-between">
							<Link href={`/posts/${post.id}`}>
								<Group className={s.postBody} wrap="nowrap">
									<Avatar color="#fff" bg="#666" size={48} radius="lg">
										{post.id}
									</Avatar>
									<Stack gap={4}>
										<TextClamp
											uppercase={true}
											lineCount={2}
											className={s.title}
										>
											{post.title}
										</TextClamp>
										{/* <div className={s.text}>{post.body}</div> */}
									</Stack>
								</Group>
							</Link>

							<Avatar className="mr-4">
								<FaRegTrashCan
									color="#f25768"
									onClick={(e) => {
										e.stopPropagation();
										dispatch(removePost(post.id));
									}}
								/>
							</Avatar>
						</Group>
					</Stack>
				))
			) : (
				<NoPosts />
			)}
		</Stack>
	);
};

const NoPosts = () => {
	return "Add post to favorite";
};
