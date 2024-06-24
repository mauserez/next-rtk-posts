"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { SectionTitle } from "@/shared/ui";
import { Button, ButtonGroup } from "@/shared/ui/controls";
import { Grid, Group, Skeleton, Stack } from "@mantine/core";

import { POSTS_QUERY_KEY, getPosts } from "api/post";
import { PostType } from "@/entities/post/types";
import { PostListItem } from "@/entities/post/post-list-item/ui/PostListItem";
import { PrimitiveType } from "@/shared/types";

import s from "./PostList.module.css";

type PostsProps = {
	title?: string;
};

export const Posts = (props: PostsProps) => {
	const { title = "" } = props;
	const [userFilter, setUserFilter] = useState<PrimitiveType>(1);

	const buttons = [
		{ value: 1, label: "Leanne Graham" },
		{ value: 2, label: "Ervin Howell" },
		{ value: 3, label: "Clementine Bauch" },
	];

	const options = {
		user: userFilter as number,
		title: title,
	};

	const {
		data: posts,
		status,
		refetch,
		isFetching,
	} = useQuery({
		queryKey: [POSTS_QUERY_KEY, options],
		queryFn: () => getPosts(options),
		staleTime: Infinity,
	});

	let content;

	if (status === "pending" || isFetching) {
		content = <Loader />;
	} else if (status === "error") {
		content = "error";
	} else {
		content = <PostList posts={posts} />;
	}

	return (
		<Stack>
			<Group justify="space-between">
				<SectionTitle size="sm" boldText="API" lightText="Posts" />
				<Button
					isLoading={isFetching}
					disabled={isFetching}
					onClick={() => {
						refetch();
					}}
				>
					Refresh
				</Button>
			</Group>
			<Stack gap={24}>
				<ButtonGroup onClick={setUserFilter} buttons={buttons} />
				{content}
			</Stack>
		</Stack>
	);
};

type PostListProps = {
	posts: PostType[];
};

const PostList = (props: PostListProps) => {
	const { posts } = props;

	return (
		<div className={s.posts}>
			{posts.map((post, i) => (
				<PostListItem key={i} post={post} />
			))}
		</div>
	);
};

const Loader = () => {
	return (
		<Grid>
			{[...Array(4)].map((_, i) => (
				<Grid.Col key={i} span={{ base: 12, lg: 6 }}>
					<Group>
						<Skeleton
							className={s.skeleton}
							radius={11}
							width={40}
							height={40}
						/>
						<Stack flex={1} gap={12}>
							<Skeleton className={s.skeleton} height={8} width={60} />
							<Skeleton className={s.skeleton} height={6} />
						</Stack>
					</Group>
				</Grid.Col>
			))}
		</Grid>
	);
};
