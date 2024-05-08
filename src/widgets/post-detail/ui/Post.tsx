"use client";

import { mainApi } from "@/shared/axios/mainApi";
import { Group, Skeleton, Stack, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";

import { SectionTitle } from "@/shared/ui";
import { fetchPost } from "../api/fetchPost";
import { PostType } from "@/widgets/post-list/model/types";
import { randomInt, uid } from "@/shared/utils/number";

import s from "./Post.module.css";
import clsx from "clsx";

type PostProps = {
	id: PostType["id"];
};

type UserType = {
	id: number;
	name: string;
	username: string;
	email: string;
	address: {
		street: string;
		suite: string;
		city: string;
		zipcode: number;
		geo: {
			lat: number;
			lng: number;
		};
	};
	phone: string;
	website: string;
	company: {
		name: string;
		catchPhrase: string;
		bs: string;
	};
};

export const Post = (props: PostProps) => {
	const { id } = props;

	const {
		data: post,
		status,
		error,
	} = useQuery({
		queryKey: ["post", id],
		queryFn: () => fetchPost(id),
	});

	const { data: user } = useQuery({
		queryKey: ["user", post?.userId],
		queryFn: async (): Promise<UserType> => {
			return mainApi
				.get(`/users?id=${post?.userId}`)
				.then((response) => response.data[0]);
		},
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
