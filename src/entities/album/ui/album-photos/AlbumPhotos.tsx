"use client";

import { Skeleton, Stack } from "@mantine/core";
import { useInfiniteQuery } from "@tanstack/react-query";
import { AlbumType, PhotoType } from "@/entities/albums/model/types";
import { randomGradient } from "@/shared/utils/element";
import { fetchPhotos } from "../../api/fetchAlbumPhotos";

import { memo, useRef } from "react";
import s from "./AlbumPhotos.module.css";
import { Button } from "@/shared/ui";

type AlbumPhotosProps = {
	albumId: AlbumType["id"];
};

export const AlbumPhotos = (props: AlbumPhotosProps) => {
	const { albumId } = props;
	const page = useRef(1);
	const options = { albumId: albumId, page: page.current };

	const {
		data: photos,
		status,
		error,
		fetchStatus,
		hasNextPage,
		fetchNextPage,
	} = useInfiniteQuery({
		queryKey: ["photos", albumId],
		queryFn: () => fetchPhotos(options),
		enabled: !!albumId,
		initialPageParam: 1,
		getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => {
			page.current = lastPageParam + 1;
			return !!lastPage.length === false ? undefined : page.current;
		},
	});

	let content;

	if (status === "pending") {
		content = <Loader />;
	} else if (status === "error") {
		content = error.message;
	} else {
		const albumPhotos: PhotoType[] = [];

		photos.pages.map((pageArray) => {
			albumPhotos.push(...pageArray);
		});

		content = (
			<Stack>
				<PhotoGallery photos={albumPhotos} />
				{hasNextPage ? (
					<Button
						className={s.loadMore}
						disabled={fetchStatus === "fetching"}
						loading={fetchStatus === "fetching"}
						onClick={() => {
							fetchNextPage();
						}}
					>
						Load more
					</Button>
				) : null}
			</Stack>
		);
	}

	return content;
};

type PhotoGalleryProps = {
	photos: PhotoType[];
};

const PhotoGallery = memo(function photoGallery(props: PhotoGalleryProps) {
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
});

const Loader = () => {
	return (
		<div className={s.photos}>
			{[...Array(8)].map((_, i) => (
				<Skeleton style={{ aspectRatio: 12 / 16 }} key={i} />
			))}
		</div>
	);
};
