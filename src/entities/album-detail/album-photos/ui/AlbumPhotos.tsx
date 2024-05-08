"use client";

import { Stack } from "@mantine/core";
import { Button } from "@/shared/ui";
import { useInfiniteQuery } from "@tanstack/react-query";
import { AlbumType, PhotoType } from "@/widgets/album-list/model/types";
import { randomGradient } from "@/shared/utils/element";
import { fetchPhotos } from "../api/fetchAlbumPhotos";

import { useRef } from "react";
import s from "./AlbumPhotos.module.css";

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
		isFetching,
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
		content = null;
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
						disabled={isFetching}
						loading={isFetching}
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
