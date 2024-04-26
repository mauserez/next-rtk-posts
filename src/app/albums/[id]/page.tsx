type AlbumParams = {
	id: string;
};

export default function Album({ params }: { params: AlbumParams }) {
	console.log(params.id);
	return params.id;
}
