import { Group, Avatar, Stack } from "@mantine/core";
import { TextClamp } from "@/shared/ui";
import { ButtonLike } from "@/shared/ui/buttons";
import { PostType } from "@/entities/post/types";
import { useAppDispatch, useAppSelector } from "@/shared/store/redux/hooks";
import { useRouter } from "next/navigation";

import s from "./PostListItem.module.css";

import {
	addPost,
	isFavoritePost,
	removePost,
} from "@/shared/store/redux/slices/posts/PostsSlice";
import Link from "next/link";

type PostListItemProps = {
	post: PostType;
};

export const PostListItem = (props: PostListItemProps) => {
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
				<ButtonLike onClick={handleFav} active={fav} />
			</Avatar>
		</Group>
	);
};
