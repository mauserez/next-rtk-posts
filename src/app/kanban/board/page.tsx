import { KanbanBoard } from "widgets/kanban/board/ui/KanbanBoard";
import { PageLayout } from "config/layouts";

export default function Board() {
	return (
		<PageLayout>
			<KanbanBoard />
		</PageLayout>
	);
}
