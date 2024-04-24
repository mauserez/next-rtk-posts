"use client";

import s from "./Content.module.css";
import clsx from "clsx";
import { ReactNode } from "react";

type ContentProps = { children: ReactNode };
export const Content = (props: ContentProps) => {
	const { children } = props;
	return <main className={clsx("rounded-l-3xl", s.content)}>{children}</main>;
};