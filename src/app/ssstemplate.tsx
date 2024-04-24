"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

type TemplateProps = { children: ReactNode };
export default function Template(props: TemplateProps) {
	const { children } = props;

	return (
		<motion.div
			initial={{ y: 20, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ ease: "easeInOut", duration: 0.5 }}
		>
			{children}
		</motion.div>
	);
}
