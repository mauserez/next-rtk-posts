type AlbumParams = {
	id: string;
};
import { Album } from "@/entities/album/ui/Album";

export default function AlbumPage({ params }: { params: AlbumParams }) {
	console.log(params.id);
	return <Album id={Number(params.id)} />;
}
