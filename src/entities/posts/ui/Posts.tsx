"use client";

import { useState } from "react";
import { ButtonGroup, SectionTitle, TextClamp } from "@/shared/ui";
import { Grid, Group, Skeleton, Stack, Avatar } from "@mantine/core";
import { PrimitiveType } from "@/shared/types";
import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../api/fetchPosts";
import { PostType } from "../model/types";
import s from "./Posts.module.css";

export const Posts = () => {
	const [filter, setFilter] = useState<PrimitiveType>(1);

	const buttons = [
		{ value: 1, label: "Today" },
		{ value: 2, label: "Week" },
		{ value: 3, label: "Month" },
	];

	const {
		data: posts,
		fetchStatus,
		status,
		refetch,
	} = useQuery({
		queryKey: ["posts"],
		queryFn: () => fetchPosts(),
	});

	let content;

	if (status === "pending" || fetchStatus === "fetching") {
		content = <Loader />;
	} else if (status === "error") {
		content = "error";
	} else {
		content = <PostList posts={posts} />;
	}

	return (
		<Stack>
			<SectionTitle size="sm" boldText="API" lightText="Posts" />
			<Stack gap={24}>
				<ButtonGroup onClick={setFilter} buttons={buttons} />
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
		<Grid>
			{posts.map((post, i) => (
				<Grid.Col key={i} span={{ base: 12, lg: 6 }}>
					<Group wrap="nowrap">
						<Avatar radius={11}>{post.id}</Avatar>
						<Stack gap={4}>
							<TextClamp className={s.title}>{post.title}</TextClamp>
							<TextClamp className={s.text}>{post.body}</TextClamp>
						</Stack>
					</Group>
				</Grid.Col>
			))}
		</Grid>
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
