"use client";
import { ComponentProps, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Form, useForm } from "react-hook-form";
import { Button } from "shared/ui/buttons";
import { MdPhone } from "react-icons/md";

import {
	FormRefInput,
	FormTextInput,
	FormPasswordInput,
	FormMultiSelect,
	FormCheckbox,
} from "shared/ui/form-controls";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMaskito } from "@maskito/react";
import { unMaskPhone } from "shared/lib/mask";
import {
	phoneMaskitoMask,
	PLACEHOLDER,
} from "widgets/login-form/lib/phoneMaskitoMask";

import s from "widgets/login-form/ui/LoginForm.module.css";
import { cn } from "shared/lib/cn";

const validationSchema = yup.object({
	username: yup.string().required("Введите логин").min(4).email(),
	password: yup.string().required("Введите пароль").min(6),
	phone: yup.string().required(),
	library: yup.array().min(1),
	accepted: yup.boolean().oneOf([true]),
});

type LoginFormProps = ComponentProps<"form">;
export function LoginForm(props: LoginFormProps) {
	const { className } = props;
	const [loading, setLoading] = useState(false);
	const [errorText, setErrorText] = useState("");
	const [buttonText, setButtonText] = useState("Submit");
	const router = useRouter();

	const phoneMaskRef = useMaskito({ options: phoneMaskitoMask });

	const { control, formState } = useForm({
		reValidateMode: "onSubmit",
		resolver: yupResolver(validationSchema),
		defaultValues: {
			library: [],
			accepted: false,
		},
	});

	return (
		<Form
			className={cn(s.loginForm, className)}
			control={control}
			onChange={() => {
				setErrorText("");
			}}
			onSubmit={async ({ data }) => {
				const modifiedData = { ...data, phone: unMaskPhone(data.phone) };
				console.log(modifiedData);
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
			<FormRefInput
				ref={phoneMaskRef}
				leftSection={<MdPhone />}
				label="Label"
				name="phone"
				control={control}
				placeholder={PLACEHOLDER}
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
				placeholder="Select Library"
				control={control}
				data={[
					{ value: "1", label: "React" },
					{ value: "2", label: "Vue" },
					{ value: "3", label: "Angular" },
					{ value: "4", label: "Vanilla" },
				]}
				name="library"
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
}
