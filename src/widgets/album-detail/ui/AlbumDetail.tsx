"use client";

import { Stack, Skeleton } from "@mantine/core";
import { SectionTitle, CardLoader } from "@/shared/ui";

import { useQuery } from "@tanstack/react-query";
import { fetchAlbum } from "../api/fetchAlbum";

import { AlbumType } from "@/widgets/album-list/model/types";
import { AlbumPhotos } from "@/entities/album-detail/album-photos/ui/AlbumPhotos";
import { uid } from "@/shared/utils/number";

import clsx from "clsx";
import photosStyle from "@/entities/album-detail/album-photos/ui/AlbumPhotos.module.css";
import s from "./AlbumDetail.module.css";

type AlbumsProps = {
	id: AlbumType["id"];
};

export const Album = (props: AlbumsProps) => {
	const { id } = props;

	const {
		data: album,
		status,
		error,
	} = useQuery({
		queryKey: ["album", id],
		queryFn: () => fetchAlbum(id),
	});

	let content;

	if (1 === 1 || status === "pending") {
		content = <Loader />;
	} else if (status === "error") {
		content = error.message;
	} else {
		content = <AlbumDetail album={album} />;
	}

	return (
		<Stack gap={4}>
			<SectionTitle size="md" boldText={`Album ${id}`} />
			{content}
		</Stack>
	);
};

const Loader = () => {
	return (
		<div className={clsx(photosStyle.photos)}>
			{[...Array(7)].map((_, i) => (
				<CardLoader key={uid()}>
					<Skeleton />
				</CardLoader>
			))}
		</div>
	);
};

type AlbumDetailProps = {
	album: AlbumType;
};

const AlbumDetail = (props: AlbumDetailProps) => {
	const { album } = props;

	return (
		<Stack>
			<SectionTitle size="xs" uppercase boldText={album?.title} />
			<AlbumPhotos albumId={album.id} />
		</Stack>
	);
};
