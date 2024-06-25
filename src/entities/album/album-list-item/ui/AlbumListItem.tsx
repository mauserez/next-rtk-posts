import { memo } from "react";
import { randomGradient } from "@/shared/utils/element";
import { AlbumType } from "@/entities/album/types";
import { useRouter } from "next/navigation";
import { TextClamp } from "@/shared/ui";
import { ButtonLike } from "@/shared/ui/controls/buttons";

import { useAppDispatch, useAppSelector } from "@/shared/store/redux/hooks";
import {
	addAlbum,
	removeAlbum,
	isFavoriteAlbum,
} from "@/shared/store/redux/slices/albums/AlbumsSlice";

import s from "./AlbumListItem.module.css";

type AlbumListItemProps = {
	album: AlbumType;
};

export const AlbumListItem = memo(function AlbumItem(
	props: AlbumListItemProps
) {
	const { album } = props;
	const dispatch = useAppDispatch();

	const photo = album.photos[0];
	const gradient = randomGradient();
	const router = useRouter();

	const fav = useAppSelector((state) => isFavoriteAlbum(state, album.id));

	const handleFavorite = () => {
		dispatch(fav ? removeAlbum(album.id) : addAlbum(album));
	};

	return (
		<div
			onClick={() => {
				router.push(`/albums/${album.id}`);
			}}
			style={{ background: `${gradient}` }}
			className={s.album}
		>
			<ButtonLike
				size={32}
				onClick={handleFavorite}
				color="#fff"
				className={s.like}
				active={fav}
			/>

			<div className={s.info}>
				<TextClamp>
					<div className={s.title}>{album.title}</div>
				</TextClamp>

				<TextClamp>
					<span title={photo.title} className={s.description}>
						{photo.title}
					</span>
				</TextClamp>
			</div>
		</div>
	);
});
