"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { AssocArray } from "@/shared/types";
import { HorizontalScroller, SectionTitle, TextClamp } from "@/shared/ui";
import { fetchAlbums } from "../api/fetchAlbums";
import { Skeleton } from "@mantine/core";

import { AlbumType } from "../model/types";
import clsx from "clsx";
import s from "./Albums.module.css";

type AlbumsProps = {
	options?: AssocArray;
};

export const Albums = (props: AlbumsProps) => {
	const { options = {} } = props;

	const {
		data: albums,
		fetchStatus,
		status,
		refetch,
	} = useQuery({
		queryKey: ["albums", options],
		queryFn: () => fetchAlbums(options),
	});

	let content;

	if (status === "pending" || fetchStatus === "fetching") {
		content = <Loader />;
	} else if (status === "error") {
		content = "error";
	} else {
		content = <AlbumList albums={albums} />;
	}

	return (
		<div>
			<SectionTitle boldText="Api" lightText="albums" />
			<HorizontalScroller>{content}</HorizontalScroller>
		</div>
	);
};

const Loader = () => {
	return (
		<>
			{[...Array(4)].map((i, idx) => (
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
	albums: AlbumType[] | undefined;
};

const AlbumList = (props: AlbumListProps) => {
	const { albums } = props;

	if (!albums) {
		return "Нет альбомов";
	}

	return (
		<>
			{albums.map((album, idx) => {
				const photo = album.photos[0];

				return (
					<div className={s.album} key={idx}>
						<Image priority alt="Photo" src={photo.url} fill />
						<div className={s.info}>
							<TextClamp className={s.title}>{album.title}</TextClamp>
							<TextClamp>
								<span title={photo.title} className={s.description}>
									{photo.title}
								</span>
							</TextClamp>
						</div>
					</div>
				);
			})}
		</>
	);
};
