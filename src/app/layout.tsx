import type { Metadata } from "next";

import { Providers } from "@/providers";
import { Header, Content } from "@/shared/layout";
import { ProfileCard } from "@/entities/profile/ui";
import { ColorSchemeScript } from "@mantine/core";
import { fontMontserrat } from "./fonts";

import "../styles/styles.css";

export const metadata: Metadata = {
	title: "Posts",
	description: "Posts and Albums app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<ColorSchemeScript />
				<link rel="shortcut icon" href="/favicon.svg" />
				<meta
					name="viewport"
					content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
				/>
			</head>
			<body className={fontMontserrat.variable}>
				<Providers>
					<section className="body__section">
						<Content>
							<>
								<Header />
								{children}
							</>
						</Content>
						<ProfileCard />
					</section>
				</Providers>
			</body>
		</html>
	);
}
