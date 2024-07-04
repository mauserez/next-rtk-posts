"use client";
import { ComponentProps, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

import { Form, useForm } from "react-hook-form";

import { Button } from "@/shared/ui/controls/buttons";
import { MdPhone } from "react-icons/md";
import {
	FormInput,
	FormTextInput,
	FormPasswordInput,
	FormMultiSelect,
	FormCheckbox,
} from "@/shared/ui/form-controls";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMaskito } from "@maskito/react";
import { MaskitoOptions, maskitoUpdateElement } from "@maskito/core";

import {
	maskitoWithPlaceholder,
	maskitoEventHandler,
	maskitoPrefixPostprocessorGenerator,
} from "@maskito/kit";

const PLACEHOLDER = "+7(9xx)xxx-xx-xx";
const { removePlaceholder, plugins, ...placeholderOptions } =
	maskitoWithPlaceholder(PLACEHOLDER);

const phoneMask: MaskitoOptions = {
	preprocessors: placeholderOptions.preprocessors,
	postprocessors: [
		maskitoPrefixPostprocessorGenerator("+7(9"),
		...placeholderOptions.postprocessors,
	],
	plugins: [
		...plugins,
		maskitoEventHandler("focus", (element) => {
			const initialValue = element.value || "+7(9";

			maskitoUpdateElement(
				element,
				initialValue + PLACEHOLDER.slice(initialValue.length)
			);
		}),
		maskitoEventHandler("blur", (element) => {
			const cleanValue = removePlaceholder(element.value);
			console.log(cleanValue);
			maskitoUpdateElement(element, cleanValue === "+7(9" ? "" : cleanValue);
		}),
	],
	mask: [
		"+",
		"7",
		"(",
		/\d/,
		/\d/,
		/\d/,
		")",
		/\d/,
		/\d/,
		/\d/,
		"-",
		/\d/,
		/\d/,
		"-",
		/\d/,
		/\d/,
	],
};

import s from "./LoginForm.module.css";
import { cn } from "@/shared/utils/cn";
import { Input } from "@/shared/ui/controls/inputs";

const validationSchema = yup.object({
	username: yup.string().required("Введите логин").min(4).email(),
	password: yup.string().required("Введите пароль").min(6),
	test: yup.array(),
	accepted: yup.boolean(),
	phone: yup.string(),
});

type LoginFormProps = ComponentProps<"form">;
export const LoginForm = (props: LoginFormProps) => {
	const { className } = props;
	const [loading, setLoading] = useState(false);
	const [errorText, setErrorText] = useState("");
	const [buttonText, setButtonText] = useState("Submit");
	const router = useRouter();

	const phoneMaskRef = useMaskito({ options: phoneMask });

	const { control, formState } = useForm({
		reValidateMode: "onSubmit",
		resolver: yupResolver(validationSchema),
		defaultValues: {
			username: "",
			password: "",
			test: [],
			accepted: false,
			phone: "",
		},
	});

	const [inpV, setInpv] = useState("");

	return (
		<Form
			className={cn(s.loginForm, className)}
			control={control}
			onChange={() => {
				setErrorText("");
			}}
			onSubmit={async ({ data }) => {
				setLoading(true);
				const credentials = {
					username: data.username,
					password: data.password,
				};

				const res = await signIn("credentials", {
					...credentials,
					redirect: false,
				});

				setLoading(false);

				if (!res?.error) {
					setButtonText("Success");
					router.refresh();
				} else {
					setErrorText(res.error);
				}
			}}
		>
			{/* <FormInput
				inputRef={phoneMaskRef}
				label="Label"
				name="phone"
				control={control}
			/>
 */}
			<Input
				label="Phone"
				type="tel"
				value={inpV}
				onInput={(e) => {
					console.log(e);
					setInpv(e.currentTarget.value);
				}}
				leftSection={<MdPhone />}
				name="lol"
				placeholder={PLACEHOLDER}
				ref={phoneMaskRef}
			/>

			<FormTextInput
				label="Логин"
				placeholder="Введите почту"
				name="username"
				control={control}
			/>

			<FormPasswordInput
				label="Пароль"
				type="password"
				placeholder="Введите пароль"
				name="password"
				control={control}
			/>

			<FormMultiSelect
				control={control}
				data={[
					{ value: "1", label: "React" },
					{ value: "2", label: "Vue" },
				]}
				name="test"
				label="Мультиселект"
			/>

			<FormCheckbox
				className="justify-center mt-6"
				label="Прочитал условия"
				name="accepted"
				control={control}
			/>

			<div>{errorText}</div>

			<Button
				cssVariant="violet"
				isLoading={loading}
				disabled={!formState.isValid}
				type="submit"
			>
				{buttonText}
			</Button>
		</Form>
	);
};
