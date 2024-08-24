"use client";

import { Group, Skeleton, Stack, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import {
	POST_QUERY_KEY,
	POST_USER_QUERY_KEY,
	getPost,
	getPostUser,
} from "entities/post";

import { SectionTitle } from "@/shared/ui";
import { PostType, PostUserType } from "@/entities/post/types";
import { randomInt, uid } from "@/shared/utils/number";

import s from "./Post.module.css";

type PostProps = {
	id: PostType["id"];
};

export const Post = (props: PostProps) => {
	const { id } = props;

	const {
		data: post,
		status,
		error,
	} = useQuery({
		queryKey: [POST_QUERY_KEY, id],
		queryFn: () => getPost(id),
	});

	const { data: user } = useQuery({
		queryKey: [POST_USER_QUERY_KEY, post?.userId],
		queryFn: () => getPostUser(Number(post?.userId)),
		enabled: !!post?.userId,
	});

	let content;

	if (status === "pending") {
		content = <Loader />;
	} else if (status === "error") {
		content = error.message;
	} else {
		content = <PostDetail post={post} />;
	}

	return (
		<Stack>
			<Group justify="space-between" align="flex-start" className={s.title}>
				<SectionTitle size="md" boldText={`Post ${id}`} />
				<SectionTitle size="sm" boldText={user?.name} />
			</Group>
			{content}
		</Stack>
	);
};

const Loader = () => {
	return (
		<Stack className={s.loader} gap={32}>
			<Skeleton height={8} width={250} />

			<Stack className={s.loader}>
				{[...Array(12)].map(() => (
					<Skeleton key={uid()} width={`${randomInt(83, 99)}%`} height={6} />
				))}
			</Stack>
		</Stack>
	);
};

type PostDetailProps = {
	post: PostType;
};

const PostDetail = (props: PostDetailProps) => {
	const { post } = props;

	return (
		<Stack>
			<SectionTitle size="xs" uppercase boldText={post?.title} />
			<Text className={s.text}>{post.body}</Text>
		</Stack>
	);
};
