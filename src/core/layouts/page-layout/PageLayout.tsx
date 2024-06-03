import { Content, Header } from "@/shared/layout";
import { ReactNode } from "react";
import { ProfileCardDrawer } from "@/entities/profile/ui";
import { Group } from "@mantine/core";
import clsx from "clsx";

type PageLayoutProps = {
	children: ReactNode;
};

export const PageLayout = (props: PageLayoutProps) => {
	const { children } = props;

	return (
		<section className={clsx("app__section")}>
			<Content>
				<Group align="center">
					<Header />
					<ProfileCardDrawer />
				</Group>
				{children}
			</Content>
		</section>
	);
};
