"use client";

import {
	useState,
	ChangeEvent,
	ReactNode,
	useDeferredValue,
	useRef,
} from "react";
import { TextInput, TextInputProps } from "@mantine/core";
import { LuSearch } from "react-icons/lu";
import { MdClear } from "react-icons/md";

import clsx from "clsx";
import s from "./Input.module.css";

type InputProps = TextInputProps & {
	clearable?: boolean;
	clearIcon?: ReactNode;
	withLeftIcon?: boolean;
	leftIcon?: ReactNode;
};
export const Input = (props: InputProps) => {
	const {
		className = "",
		withLeftIcon = false,
		leftIcon,
		clearable = true,
		clearIcon,
		onChange,
		...inputProps
	} = props;

	const icon = withLeftIcon ? <LuSearch /> : leftIcon;
	const clIcon = !clearIcon ? <MdClear /> : clearIcon;

	const [value, setValue] = useState("");
	const defValue = useDeferredValue(value);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (onChange) {
			onChange(e);
		}
		setValue(e.target.value);
	};

	const clearValue = () => {
		setValue("");
	};

	return (
		<div className={s.wrap}>
			<TextInput
				spellCheck={false}
				value={defValue}
				onChange={handleChange}
				className={clsx({
					[s.input]: true,
					[s.clearable]: clearable,
					[s.withLeftIcon]: withLeftIcon,
					[className]: true,
				})}
				{...inputProps}
			></TextInput>

			{!value.trim() ? <div className={s.icon}>{icon}</div> : null}

			{value.trim() ? (
				<div onClick={clearValue} className={s.clearIcon}>
					{clIcon}
				</div>
			) : null}
		</div>
	);
};
