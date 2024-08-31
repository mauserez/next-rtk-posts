import { AssocArray } from "shared/types";
import { accessApi, backendApi, refreshApi } from "shared/axios/api";
import { jwtDecode } from "jwt-decode";
import { User } from "next-auth";
import { AxiosError } from "axios";

export type SessionUserType = {
	/* access_token: string;
	token_type: "bearer";
	refresh_token: string;
	expires_in: number; */
	name: string;
	role: string;
	username: string;
	//authorities: string[];
	//jti: string;
	//exp: number;
};

export type AuthParams = {
	username?: string | unknown;
	password?: string | unknown;
};

const ACCESS_ERRORS: AssocArray = {
	"Bad credentials": "Неверный логин или пароль",
};

export function parseAccessToken(accessToken: string) {
	const tokenData = jwtDecode(accessToken);
	const exp = tokenData.exp ?? Math.floor(Date.now() / 1000);

	return { exp: exp };
}

export function prepareTokenData(/* tokenData: SessionUserType */) {
	/*  const extra = parseAccessToken(tokenData.access_token);
	const prepareTokenData = { ...tokenData, ...extra };

	return prepareTokenData;  */
}

export async function getAccess(credentials: AuthParams) {
	const { data, status } = await accessApi<SessionUserType>({
		method: "post",
		data: credentials,
		headers: { "Content-Type": "multipart/form-data" },
	});
	try {
		return {
			data: data as User,
			status: status,
			errorText: "",
		};
	} catch (e) {
		const error = e as AxiosError;
		const response = error.response as { data: { error_description: string } };
		const errorAccessText = response.data.error_description;
		const errorText = ACCESS_ERRORS[errorAccessText] ?? errorAccessText;

		return {
			data: null,
			status: error,
			errorText: errorText,
		};
	}
}

export async function refreshAccess(refreshToken: string) {
	try {
		const { data, status } = await refreshApi<SessionUserType>({
			method: "post",
			data: { refresh_token: refreshToken },
			headers: { "Content-Type": "multipart/form-data" },
		});

		return {
			data: data as User,
			status: status,
			errorText: "",
		};
	} catch {
		return {
			data: null,
			status: "401",
			errorText: "Не удалось обновить токен",
		};
	}
}

export async function getAccessByCredentials(credentials: AuthParams) {
	//headers: { "Content-Type": "multipart/form-data" },
	const { username, password } = credentials;

	try {
		const { data, status } = await backendApi.get<SessionUserType[]>("/users", {
			params: {
				username,
				password,
			},
		});

		return {
			data: data[0] as User,
			status: status,
			errorText: "",
		};
	} catch {
		return {
			data: null,
			status: "401",
			errorText: "Неправильные логин или пароль",
		};
	}
}
