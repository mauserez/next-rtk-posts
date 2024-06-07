"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/shared/ui/controls";
import { Form, useForm } from "react-hook-form";
import { FormInput, FormInputPassword } from "@/shared/ui/form-controls";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import s from "./LoginForm.module.css";
import { cn } from "@/shared/utils/cn";

type FormValuesType = {
	username: string;
	password: string;
};

const validationSchema = yup.object({
	username: yup.string().required("Логин обязательный").min(4).email(),
	password: yup.string().required("Логин обязательный").min(6),
});

export const LoginForm = () => {
	const [loading, setLoading] = useState(false);
	const [errorText, setErrorText] = useState("");
	const router = useRouter();

	const { control, formState } = useForm({
		mode: "onSubmit",
		reValidateMode: "onSubmit",
		resolver: yupResolver(validationSchema),
		defaultValues: {
			username: "",
			password: "",
		},
	});

	return (
		<Form
			className={s.loginForm}
			control={control}
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
					router.refresh();
				} else {
					setErrorText(res.error);
				}
			}}
			onError={(e) => console.log(e)}
		>
			<FormInput
				label="Логин"
				placeholder="Введите почту"
				name="username"
				control={control}
			/>

			<FormInputPassword
				label="Пароль"
				type="password"
				placeholder="Введите пароль"
				name="password"
				control={control}
			/>

			<div>{errorText}</div>

			<Button
				isLoading={loading}
				disabled={!formState.isValid}
				className={cn(s.submitBtn)}
				type="submit"
			>
				Submit
			</Button>
		</Form>
	);
};
