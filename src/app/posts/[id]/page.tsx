type PostParams = {
	id: string;
};

import { Post } from "@/widgets/post-detail/ui/Post";

export default function PostPage({ params }: { params: PostParams }) {
	return <Post id={Number(params.id)} />;
}
