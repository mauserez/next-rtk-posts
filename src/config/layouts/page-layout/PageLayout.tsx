import { Content, Header } from "shared/layout";
import { ReactNode } from "react";
import { ProfileCardDrawer } from "entities/profile";
import { Group } from "@mantine/core";

type PageLayoutProps = {
	children: ReactNode;
};

export function PageLayout(props: PageLayoutProps) {
	const { children } = props;

	return (
		<Content>
			<Group align="center">
				<Header />
				<ProfileCardDrawer />
			</Group>
			{children}
		</Content>
	);
}
