"use client";

import { useQuery } from "@tanstack/react-query";
import { SectionTitle } from "@/shared/ui";
import { fetchAlbum } from "../api/fetchAlbum";
import { Stack } from "@mantine/core";
import { AlbumType } from "@/entities/albums/model/types";
import { AlbumPhotos } from "./album-photos/AlbumPhotos";

import s from "./Album.module.css";

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
};

const Loader = () => {
	return (
		<div className={s.loader}>
			{[...Array(4)].map((i, idx) => (
				<div key={idx} className="ldr"></div>
			))}
		</div>
	);
};

type AlbumListProps = {
	album: AlbumType;
};

const AlbumDetail = (props: AlbumListProps) => {
	const { album } = props;

	return (
		<Stack>
			<SectionTitle size="xs" uppercase boldText={album?.title} />
			<AlbumPhotos albumId={album.id} />
		</Stack>
	);
};
