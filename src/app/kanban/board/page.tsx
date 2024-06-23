import { KanbanBoard } from "@/widgets/kanban/board/ui/KanbanBoard";
import { PageLayout } from "@/core/layouts/page-layout/PageLayout";

export default function Board() {
	return (
		<PageLayout>
			<KanbanBoard />
		</PageLayout>
	);
}
