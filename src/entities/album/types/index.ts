export type AlbumType = {
	userId: number;
	id: number;
	title: number;
	url: string;
	photos: AlbumPhotoType[];
};

export type AlbumPhotoType = {
	id: string;
	url: string;
	title: string;
};
