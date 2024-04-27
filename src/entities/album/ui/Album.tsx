"use client";

import { useQuery } from "@tanstack/react-query";
import { HorizontalScroller, SectionTitle, TextClamp } from "@/shared/ui";
import { fetchAlbum } from "../api/fetchAlbum";
import { Skeleton, Stack } from "@mantine/core";
import { randomGradient } from "@/shared/utils/element";
import { AlbumType, PhotoType } from "@/entities/albums/model/types";
import { AlbumPhotos } from "./album-photos/AlbumPhotos";

import clsx from "clsx";
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
		<Stack>
			<SectionTitle boldText={`Album ${id}`} lightText="" />
			{content}
		</Stack>
	);
};

const Loader = () => {
	return (
		<>
			{[...Array(9)].map((i, idx) => (
				<div key={idx} className={clsx(s.album, s.loader, "ldr")}>
					<div className={clsx(s.info, s.loaderInfo)}>
						<Skeleton color="#fff" height={8} radius="xl" />
						<Skeleton color="#fff" height={8} mt={6} radius="xl" />
					</div>
				</div>
			))}
		</>
	);
};

type AlbumListProps = {
	album: AlbumType;
};

const AlbumDetail = (props: AlbumListProps) => {
	const { album } = props;

	return (
		<Stack>
			<SectionTitle
				size="sm"
				uppercase
				boldText={album?.title}
				lightText={""}
			/>
			<AlbumPhotos albumId={album.id} />
		</Stack>
	);
};
