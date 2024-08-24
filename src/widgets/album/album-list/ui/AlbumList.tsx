"use client";

import { Group, Skeleton, Stack } from "@mantine/core";

import { HorizontalScroller, SectionTitle, CardLoader } from "@/shared/ui";
import { Button } from "shared/ui/buttons";

import { useQuery } from "@tanstack/react-query";
import {
	getAlbums,
	AlbumListItem,
	ALBUMS_QUERY_KEY,
	type AlbumType,
} from "entities/album";

import clsx from "clsx";
import albumListItemStyle from "entities/album/ui/album-list-item/AlbumListItem.module.css";
import s from "widgets/album/album-list/ui/AlbumList.module.css";

type AlbumsProps = {
	title?: string;
};

export const AlbumList = (props: AlbumsProps) => {
	const { title = "" } = props;
	const options = { title: title };

	const {
		data: albums,
		isFetching,
		status,
		error,
		refetch,
	} = useQuery({
		queryKey: [ALBUMS_QUERY_KEY, options],
		queryFn: () => getAlbums(options),
		staleTime: Infinity,
	});

	let content;

	if (status === "pending" || isFetching) {
		content = <Loader />;
	} else if (status === "error") {
		content = error.message;
	} else {
		content = <Albums albums={albums} />;
	}

	return (
		<Stack>
			<Group justify="space-between">
				<SectionTitle boldText="Api" lightText="Albums" />
				<Button
					//loader={LuCircleDashed}
					isLoading={isFetching}
					disabled={isFetching}
					onClick={() => {
						refetch();
					}}
				>
					Refresh
				</Button>
			</Group>
			<HorizontalScroller>{content}</HorizontalScroller>
		</Stack>
	);
};

type AlbumListProps = {
	albums: AlbumType[] | undefined;
};

const Albums = (props: AlbumListProps) => {
	const { albums } = props;

	if (!albums?.length) {
		return "Нет альбомов";
	}

	return (
		<>
			{albums.map((album) => (
				<AlbumListItem key={album.id} album={album} />
			))}
		</>
	);
};

const Loader = () => {
	return (
		<>
			{[...Array(4)].map((i, idx) => (
				<CardLoader key={idx} className={clsx(albumListItemStyle.album)}>
					<div className={clsx(albumListItemStyle.info, s.loaderInfo)}>
						<Skeleton color="#fff" height={8} radius="xl" />
						<Skeleton color="#fff" height={8} mt={6} radius="xl" />
					</div>
				</CardLoader>
			))}
		</>
	);
};
