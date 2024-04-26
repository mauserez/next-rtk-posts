import { SectionTitle } from "@/shared/ui";
import { Stack, Group, Avatar } from "@mantine/core";
import { TiHeartFullOutline } from "react-icons/ti";
import s from "./MyPosts.module.css";
import clsx from "clsx";

export const MyPosts = () => {
	return (
		<Stack>
			<SectionTitle size="sm" boldText="Posts" />
			<Stack gap="sm" className={s.posts}>
				<Group className={s.post}>
					<Group>
						<Avatar size={48} radius="lg">
							img
						</Avatar>
						<div>
							<div className={s.title}>Post Title</div>
							<div className={s.text}>Post Descr</div>
						</div>
					</Group>
					<Group className={s.icons}>
						<TiHeartFullOutline
							className={clsx({ [s.iconActive]: true })}
							size={24}
						/>
					</Group>
				</Group>

				<Group className={s.post}>
					<Group>
						<Avatar size={48} radius="lg">
							img
						</Avatar>
						<div>
							<div className={s.title}>Post Title</div>
							<div className={s.description}>Post Descr</div>
						</div>
					</Group>
					<Group className={s.icons}>
						<TiHeartFullOutline
							className={clsx({ [s.iconActive]: true })}
							size={24}
						/>
					</Group>
				</Group>
			</Stack>
		</Stack>
	);
};
