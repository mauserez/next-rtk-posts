import type { Metadata } from "next";

import { Providers } from "config/providers";
//import { ColorSchemeScript } from "@mantine/core";
import { fontMontserrat } from "./fonts";

export const metadata: Metadata = {
	title: "Posts",
	description: "Posts and Albums app",
};

import "config/styles/styles.css";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html suppressHydrationWarning={true} lang="en">
			<head>
				{/* <ColorSchemeScript /> */}
				<link rel="shortcut icon" href="/favicon.ico" />
				<meta
					name="viewport"
					content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
				/>
			</head>
			<body className={fontMontserrat.variable}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
