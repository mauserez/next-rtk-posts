"use client";

import { Stack } from "@mantine/core";
import { Button } from "shared/ui/buttons";
import { useInfiniteQuery } from "@tanstack/react-query";
import { randomGradient } from "shared/lib/element";
import {
	getPhotos,
	ALBUM_PHOTOS_QUERY_KEY,
	AlbumType,
	AlbumPhotoType,
} from "entities/album";

import { useRef } from "react";
import s from "entities/album/ui/album-detail-photos/AlbumDetailPhotos.module.css";

type AlbumDetailPhotosProps = {
	albumId: AlbumType["id"];
};

export function AlbumDetailPhotos(props: AlbumDetailPhotosProps) {
	const { albumId } = props;
	const page = useRef<number>(1);
	const options = { albumId: albumId, page: page.current };

	const {
		data: photos,
		status,
		error,
		isFetching,
		hasNextPage,
		fetchNextPage,
	} = useInfiniteQuery({
		queryKey: [ALBUM_PHOTOS_QUERY_KEY, albumId],
		queryFn: () => getPhotos(options),
		enabled: !!albumId,
		initialPageParam: 1,
		//eslint-disable-next-line
		getNextPageParam: (lastPage, allPages, lastPageParam) => {
			page.current = lastPageParam + 1;
			return !!lastPage.length === false ? undefined : page.current;
		},
	});

	let content;

	if (status === "pending") {
		content = null;
	} else if (status === "error") {
		content = error.message;
	} else {
		const albumPhotos: AlbumPhotoType[] = [];

		photos.pages.map((pageArray) => {
			albumPhotos.push(...pageArray);
		});

		content = (
			<Stack>
				<PhotoGallery photos={albumPhotos} />
				{hasNextPage ? (
					<Button
						className={s.loadMore}
						disabled={isFetching}
						loading={isFetching}
						onClick={() => {
							void fetchNextPage();
						}}
					>
						Load more
					</Button>
				) : null}
			</Stack>
		);
	}

	return content;
}

type PhotoGalleryProps = {
	photos: AlbumPhotoType[];
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
