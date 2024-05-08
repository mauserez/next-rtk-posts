type AlbumParams = {
	id: string;
};
import { Album } from "@/widgets/album-detail/ui/AlbumDetail";

export default function AlbumPage({ params }: { params: AlbumParams }) {
	return <Album id={Number(params.id)} />;
}
