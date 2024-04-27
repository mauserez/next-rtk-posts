"use client";

import { Skeleton } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { AlbumType, PhotoType } from "@/entities/albums/model/types";
import { randomGradient } from "@/shared/utils/element";
import { fetchPhotos } from "../../api/fetchAlbumPhotos";

import { useState } from "react";
import s from "./AlbumPhotos.module.css";

type AlbumPhotosProps = {
	albumId: AlbumType["id"];
};

export const AlbumPhotos = (props: AlbumPhotosProps) => {
	const { albumId } = props;

	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);

	const options = { albumId: albumId, limit: 10, page: page };

	let albumPhotos: PhotoType[] = [];

	const {
		data: photos,
		status,
		error,
	} = useQuery({
		queryKey: ["photos", albumId, page],
		queryFn: () => fetchPhotos(options),
		enabled: !!albumId,
	});

	let content;

	if (status === "pending") {
		content = <Loader />;
	} else if (status === "error") {
		content = error.message;
	} else {
		content = <PhotoGallery photos={[...albumPhotos, ...photos]} />;
	}

	return content;
};

type PhotoGalleryProps = {
	photos: PhotoType[];
};

const PhotoGallery = (props: PhotoGalleryProps) => {
	const { photos } = props;

	return (
		<div className={s.photos}>
			{photos.map((photo, idx) => {
				const gradient = randomGradient();

				return (
					<div key={idx} style={{ background: `${gradient}` }}>
						{photo.id}
					</div>
				);
			})}
		</div>
	);
};

const Loader = () => {
	return (
		<div className={s.photos}>
			{[...Array(8)].map((_, i) => (
				<Skeleton style={{ aspectRatio: 12 / 16 }} key={i} />
			))}
		</div>
	);
};
