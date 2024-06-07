import { RefObject } from "react";

export const clearInput = (inputRef: RefObject<HTMLInputElement>) => {
	if (inputRef.current) {
		const valueSetter = Object.getOwnPropertyDescriptor(
			inputRef.current,
			"value"
		)?.set;

		const prototype = Object.getPrototypeOf(inputRef.current);
		const prototypeValueSetter = Object.getOwnPropertyDescriptor(
			prototype,
			"value"
		)?.set;

		if (valueSetter && valueSetter !== prototypeValueSetter) {
			prototypeValueSetter?.call(inputRef.current, "");
		} else {
			valueSetter?.call(inputRef.current, "");
		}

		inputRef.current.dispatchEvent(new Event("input", { bubbles: true }));
	}
};
