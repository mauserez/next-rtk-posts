type PostPageParams = {
	id: string;
};

import { Post } from "@/widgets/post/post-detail/ui/Post";

export default function PostPage({ params }: { params: PostPageParams }) {
	return <Post id={Number(params.id)} />;
}
