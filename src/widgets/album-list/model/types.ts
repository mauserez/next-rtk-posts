export type PhotoType = {
	id: string;
	url: string;
	title: string;
};

export type AlbumType = {
	userId: number;
	id: number;
	title: number;
	url: string;
	photos: PhotoType[];
};
