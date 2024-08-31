import { Content, Header } from "shared/layout";
import { ReactNode } from "react";
import { ProfileCard } from "entities/profile";
import { cn } from "shared/lib/cn";

import s from "config/layouts/profile-layout/ProfileLayout.module.css";

type ProfileLayoutProps = {
	children: ReactNode;
};

export function ProfileLayout(props: ProfileLayoutProps) {
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
}
