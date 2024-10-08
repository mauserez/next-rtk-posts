"use client";

import { ReactNode, useLayoutEffect, useRef } from "react";
import { Group, GroupProps } from "@mantine/core";
import s from "shared/ui/horizontal-scroller/HorizontalScroller.module.css";

type HorizontalScrollerProps = {
	children: ReactNode;
} & GroupProps;

export function HorizontalScroller(props: HorizontalScrollerProps) {
	const { children, ...groupProps } = props;
	const scrollerRef = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		if (scrollerRef.current) {
			const scroller = scrollerRef.current;
			let isDown = false;
			let startX = 0;
			let scrollLeft = 0;

			scroller.addEventListener("mousedown", (e) => {
				isDown = true;
				scroller.classList.add("scroller__item--active");
				startX = e.pageX - scroller.offsetLeft;
				scrollLeft = scroller.scrollLeft;
				cancelMomentumTracking();
			});

			scroller.addEventListener("mouseleave", () => {
				isDown = false;
				scroller.classList.remove("scroller__item--active");
			});

			scroller.addEventListener("mouseup", () => {
				isDown = false;
				scroller.classList.remove("scroller__item--active");
				beginMomentumTracking();
			});

			scroller.addEventListener("mousemove", (e) => {
				if (!isDown) {
					return;
				}
				e.preventDefault();
				const x = e.pageX - scroller.offsetLeft;
				const walk = (x - startX) * 3; //scroll-fast
				const prevScrollLeft = scroller.scrollLeft;
				scroller.scrollLeft = scrollLeft - walk;
				velX = scroller.scrollLeft - prevScrollLeft;
			});

			let velX = 0;
			let momentumID = 0;

			const beginMomentumTracking = () => {
				cancelMomentumTracking();
				momentumID = requestAnimationFrame(momentumLoop);
			};

			const cancelMomentumTracking = () => {
				cancelAnimationFrame(momentumID);
			};

			const momentumLoop = () => {
				scroller.scrollLeft += velX;
				velX *= 0.95;
				if (Math.abs(velX) > 0.5) {
					momentumID = requestAnimationFrame(momentumLoop);
				}
			};
		}
	}, []);

	return (
		<div className={s.wrap}>
			<Group
				align="flex-start"
				ref={scrollerRef}
				className={s.scroller}
				{...groupProps}
			>
				{children}
			</Group>
		</div>
	);
}
