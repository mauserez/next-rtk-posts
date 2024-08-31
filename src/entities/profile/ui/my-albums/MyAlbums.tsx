"use client";

import { SectionTitle, TextClamp, HorizontalScroller } from "shared/ui";
import { randomGradient } from "shared/lib/element";
import { Stack } from "@mantine/core";
import { AlbumType } from "entities/album/types";
import { useRouter } from "next/navigation";
import { ButtonLike } from "shared/ui/buttons";

import { useAppSelector, useAppDispatch } from "shared/redux/hooks";

import clsx from "clsx";
import s from "entities/profile/ui/my-albums/MyAlbums.module.css";
import { removeAlbum } from "shared/redux/slices/albums/AlbumsSlice";

export function MyAlbums() {
	const albums = useAppSelector((state) => state.albums.favoriteAlbums);

	return (
		<Stack>
			<SectionTitle size="sm" boldText="Albums" />
			{albums.length ? (
				<HorizontalScroller>
					{albums.map((album) => (
						<MyAlbum key={album.id} album={album} />
					))}
				</HorizontalScroller>
			) : (
				<NoAlbums />
			)}
		</Stack>
	);
}

type MyAlbumProps = {
	album: AlbumType;
};

const MyAlbum = (props: MyAlbumProps) => {
	const { album } = props;
	const router = useRouter();
	const dispatch = useAppDispatch();

	return (
		<Stack
			onClick={() => {
				router.push(`/albums/${album.id}`);
			}}
			gap="xs"
			className={s.album}
		>
			<div style={{ background: randomGradient() }} className={s.albumImage}>
				<ButtonLike
					onClick={() => {
						dispatch(removeAlbum(album.id));
					}}
					className={s.like}
					color="#fff"
					active
				/>
			</div>
			<div>
				<TextClamp firstLetterUppercase={true} className={clsx(s.title)}>
					{album.title}
				</TextClamp>
				<TextClamp className={s.subtitle}>{album.photos[0].title}</TextClamp>
			</div>
		</Stack>
	);
};

const NoAlbums = () => {
	return "Add album to favorite";
};
