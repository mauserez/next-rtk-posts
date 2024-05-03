"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button, ButtonGroup, SectionTitle } from "@/shared/ui";
import { Grid, Group, Skeleton, Stack } from "@mantine/core";

import { PrimitiveType } from "@/shared/types";
import { fetchPosts } from "../../api/fetchPosts";
import { PostType } from "../../model/types";
import { PostItem } from "../post-item/PostItem";

import s from "./PostList.module.css";

export const Posts = () => {
	const [filter, setFilter] = useState<PrimitiveType>(1);

	const buttons = [
		{ value: 1, label: "Today" },
		{ value: 2, label: "Week" },
		{ value: 3, label: "Month" },
	];

	const {
		data: posts,
		status,
		refetch,
		isFetching,
	} = useQuery({
		queryKey: ["posts"],
		queryFn: () => fetchPosts(),
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
					disabled={isFetching}
					onClick={() => {
						refetch();
					}}
				>
					Refresh
				</Button>
			</Group>
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
		<div className={s.posts}>
			{posts.map((post, i) => (
				<PostItem key={i} post={post} />
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
