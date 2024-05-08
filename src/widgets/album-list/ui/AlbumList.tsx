"use client";

import { useContext } from "react";
import { SearchContext } from "@/widgets/main-page/context/SearchContext";

import { Group, Skeleton, Stack } from "@mantine/core";
import {
	HorizontalScroller,
	SectionTitle,
	Button,
	CardLoader,
} from "@/shared/ui";

import { useQuery } from "@tanstack/react-query";
import { fetchAlbums } from "../api/fetchAlbums";

import { AlbumType } from "../model/types";
import { AlbumItem } from "@/entities/album-list/album-item/AlbumItem";

import clsx from "clsx";
import albumStyle from "@/entities/album-list/album-item/AlbumItem.module.css";
import s from "./AlbumList.module.css";

export const Albums = () => {
	const searchContext = useContext(SearchContext);
	const options = { title: searchContext.search };

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
				<CardLoader key={idx} className={clsx(albumStyle.album)}>
					<div className={clsx(albumStyle.info, s.loaderInfo)}>
						<Skeleton color="#fff" height={8} radius="xl" />
						<Skeleton color="#fff" height={8} mt={6} radius="xl" />
					</div>
				</CardLoader>
			))}
		</>
	);
};
