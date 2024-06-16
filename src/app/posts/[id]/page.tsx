import { Post } from "@/widgets/post/post-detail/ui/Post";
import { PageLayout } from "@/core/layouts/page-layout/PageLayout";

type PostPageParams = {
	id: string;
};

export default function PostPage({ params }: { params: PostPageParams }) {
	return (
		<PageLayout>
			<Post id={Number(params.id)} />
		</PageLayout>
	);
}
