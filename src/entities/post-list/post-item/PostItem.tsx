import { Group, Avatar, Stack } from "@mantine/core";
import { LikeButton, TextClamp } from "@/shared/ui";
import { PostType } from "../../../widgets/post-list/model/types";
import { useAppDispatch, useAppSelector } from "@/shared/store/redux/hooks";
import { useRouter } from "next/navigation";

import s from "./PostItem.module.css";

import {
	addPost,
	isFavoritePost,
	removePost,
} from "@/shared/store/redux/slices/posts/PostsSlice";
import Link from "next/link";

type PostItemProps = {
	post: PostType;
};

export const PostItem = (props: PostItemProps) => {
	const { post } = props;
	const dispatch = useAppDispatch();

	const router = useRouter();
	const fav = useAppSelector((state) => isFavoritePost(state, post.id));
	const handleFav = () => {
		dispatch(fav ? removePost(post.id) : addPost(post));
	};

	return (
		<Group wrap="nowrap">
			<Link href={`/posts/${post.id}`}>
				<Group wrap="nowrap">
					<Avatar radius={11}>{post.id}</Avatar>
					<Stack
						onClick={() => {
							router.push(`/posts/${post.id}`);
						}}
						gap={4}
					>
						<TextClamp>
							<div className={s.title}>{post.title}</div>
						</TextClamp>
						<TextClamp className={s.text}>{post.body}</TextClamp>
					</Stack>
				</Group>
			</Link>

			<Avatar
				onClick={(e) => {
					e.stopPropagation();
				}}
			>
				<LikeButton onClick={handleFav} active={fav} />
			</Avatar>
		</Group>
	);
};
