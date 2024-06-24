import { PageLayout } from "@/core/layouts/page-layout/PageLayout";
import { Album } from "@/widgets/album/album-detail/ui/AlbumDetail";

type AlbumPageParams = {
	id: string;
};

export default function AlbumPage({ params }: { params: AlbumPageParams }) {
	return (
		<PageLayout>
			<Album id={Number(params.id)} />
		</PageLayout>
	);
}
