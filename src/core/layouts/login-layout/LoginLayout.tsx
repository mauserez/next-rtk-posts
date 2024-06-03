import { Content, Header } from "@/shared/layout";
import { ReactNode } from "react";
import clsx from "clsx";

type ProfileLayoutProps = {
	children: ReactNode;
};

export const ProfileLayout = (props: ProfileLayoutProps) => {
	const { children } = props;

	<section className={clsx("app__section")}>
		<Content>{children}</Content>
	</section>;
};
