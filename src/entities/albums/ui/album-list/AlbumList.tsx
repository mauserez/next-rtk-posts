"use client";

import { useQuery } from "@tanstack/react-query";
import { AssocArray } from "@/shared/types";
import { HorizontalScroller, SectionTitle, Button } from "@/shared/ui";
import { fetchAlbums } from "../../api/fetchAlbums";
import { Group, Skeleton, Stack } from "@mantine/core";

import { AlbumType } from "../../model/types";
import { AlbumItem } from "../album-item/AlbumItem";

import clsx from "clsx";
import albumStyle from "../album-item/AlbumItem.module.css";
import s from "./AlbumList.module.css";

type AlbumsProps = {
	options?: AssocArray;
};

export const Albums = (props: AlbumsProps) => {
	const { options = {} } = props;

	const {
		data: albums,
		isFetching,
		status,
		error,
		refetch,
	} = useQuery({
		queryKey: ["albums", options],
		queryFn: () => fetchAlbums(options),
		staleTime: Infinity,
	});

	let content;

	if (status === "pending" || isFetching) {
		content = <Loader />;
	} else if (status === "error") {
		content = error.message;
	} else {
		content = <AlbumList albums={albums} />;
	}

	return (
		<Stack>
			<Group justify="space-between">
				<SectionTitle boldText="Api" lightText="Albums" />
				<Button
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

const AlbumList = (props: AlbumListProps) => {
	const { albums } = props;

	if (!albums?.length) {
		return "Нет альбомов";
	}

	return (
		<>
			{albums.map((album) => (
				<AlbumItem key={album.id} album={album} />
			))}
		</>
	);
};

const Loader = () => {
	return (
		<>
			{[...Array(4)].map((i, idx) => (
				<div key={idx} className={clsx(albumStyle.album, s.loader, "ldr")}>
					<div className={clsx(albumStyle.info, s.loaderInfo)}>
						<Skeleton color="#fff" height={8} radius="xl" />
						<Skeleton color="#fff" height={8} mt={6} radius="xl" />
					</div>
				</div>
			))}
		</>
	);
};
