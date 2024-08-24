import { Post } from "widgets/post/post-detail/ui/Post";
import { PageLayout } from "config/layouts";

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
