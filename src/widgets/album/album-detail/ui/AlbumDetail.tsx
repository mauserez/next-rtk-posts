"use client";

import { Stack, Skeleton } from "@mantine/core";
import { SectionTitle, CardLoader } from "shared/ui";
import { useQuery } from "@tanstack/react-query";

import {
	AlbumDetailPhotos,
	getAlbum,
	type AlbumType,
	ALBUM_QUERY_KEY,
} from "entities/album";
import { uid } from "shared/lib/number";

import clsx from "clsx";
import photosStyle from "entities/album/ui/album-detail-photos/AlbumDetailPhotos.module.css";

type AlbumsProps = {
	id: AlbumType["id"];
};

export function Album(props: AlbumsProps) {
	const { id } = props;

	const {
		data: album,
		status,
		error,
	} = useQuery({
		queryKey: [ALBUM_QUERY_KEY, id],
		queryFn: () => getAlbum(id),
	});

	let content;

	if (status === "pending") {
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
}

const Loader = () => {
	return (
		<div className={clsx(photosStyle.photos)}>
			{[...Array(7)].map(() => (
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
			<AlbumDetailPhotos albumId={album.id} />
		</Stack>
	);
};
