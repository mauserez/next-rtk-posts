type AlbumPageParams = {
	id: string;
};
import { Album } from "@/widgets/album/album-detail/ui/AlbumDetail";

export default function AlbumPage({ params }: { params: AlbumPageParams }) {
	return <Album id={Number(params.id)} />;
}
