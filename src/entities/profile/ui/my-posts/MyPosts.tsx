"use client";

import Link from "next/link";
import { SectionTitle, TextClamp } from "@/shared/ui";
import { Stack, Group, Avatar } from "@mantine/core";
import { useAppSelector, useAppDispatch } from "@/shared/store/redux/hooks";
import { removePost } from "@/shared/store/redux/slices/posts/PostsSlice";
import { FaRegTrashCan } from "react-icons/fa6";
import { ButtonLike } from "@/shared/ui/controls/buttons";

import s from "./MyPosts.module.css";

export const MyPosts = () => {
	const dispatch = useAppDispatch();
	const posts = useAppSelector((state) => state.posts.favoritePosts);

	return (
		<Stack>
			<SectionTitle size="sm" boldText="Posts" />
			{posts.length ? (
				<Stack className={s.posts}>
					{posts.map((post) => (
						<Group key={post.id} className={s.post}>
							<Link href={`/posts/${post.id}`}>
								<Group className={s.postBody} wrap="nowrap">
									<Avatar color="#fff" bg="#666" size="48px" radius="lg">
										{post.id}
									</Avatar>
									<Stack gap={"4px"}>
										<TextClamp
											firstLetterUppercase={true}
											lineCount={2}
											className={s.title}
										>
											{post.title}
										</TextClamp>
									</Stack>
								</Group>
							</Link>

							<Avatar className="mr-4">
								<ButtonLike
									active={true}
									onClick={(e) => {
										e.stopPropagation();
										dispatch(removePost(post.id));
									}}
								/>
							</Avatar>
						</Group>
					))}
				</Stack>
			) : (
				<NoPosts />
			)}
		</Stack>
	);
};

const NoPosts = () => {
	return "Add post to favorite";
};
