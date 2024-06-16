import { Content, Header } from "@/shared/layout";
import { ReactNode } from "react";
import { ProfileCard } from "@/entities/profile/ui";
import { cn } from "@/shared/utils/cn";

import s from "./ProfileLayout.module.css";

type ProfileLayoutProps = {
	children: ReactNode;
};

export const ProfileLayout = (props: ProfileLayoutProps) => {
	const { children } = props;

	return (
		<section className={cn(s.appSection)}>
			<Content>
				<Header />
				{children}
			</Content>
			<ProfileCard />
		</section>
	);
};
