import { Ref, RefAttributes, ReactNode, forwardRef } from "react";

export function typedForwardRef<T, P = {}>(
	render: (props: P, ref: Ref<T>) => ReactNode
): (props: P & RefAttributes<T>) => ReactNode {
	return forwardRef(render) as any;
}
