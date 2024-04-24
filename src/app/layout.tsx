import type { Metadata } from "next";
import { Providers } from "@/providers";
import { Header, Content } from "@/shared/layout";
import { ProfileCard } from "@/entities/profile/ui";

import { fontInter, fontMont } from "./fonts";
import "./reset.css";
import "./globals.css";
import clsx from "clsx";

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
			<body className={fontMont.variable}>
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
