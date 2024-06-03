import { AssocArray } from "@/shared/types";
//import { accessApi, refreshApi } from "@/shared/axios/api";
import { jwtDecode } from "jwt-decode";
import { User } from "next-auth";

export type SessionUserType = {
	/* access_token: string;
	token_type: "bearer";
	refresh_token: string;
	expires_in: number; */
	name: string;
	role: string;
	email: string;
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

const parseAccessToken = (accessToken: string) => {
	const tokenData = jwtDecode(accessToken);
	const exp = tokenData.exp ?? Math.floor(Date.now() / 1000);

	return { exp: exp };
};

const prepareTokenData = (tokenData: SessionUserType) => {
	/* const extra = parseAccessToken(tokenData.access_token);
	const prepareTokenData = { ...tokenData, ...extra };

	return prepareTokenData; */
};
/*
export const getAccess = async (credentials: AuthParams) => {

	return await accessApi<SessionUserType>({
		method: "post",
		data: credentials,
		headers: { "Content-Type": "multipart/form-data" },
	})
		.then(function (response) {
			const data = prepareTokenData(response.data);
			return { data: data as User, status: response.status, errorText: "" };
		})
		.catch(function (error) {
			const response = error.response;
			const errorAccessText = response.data.error_description;
			const errorText = ACCESS_ERRORS[errorAccessText] ?? errorAccessText;

			return {
				data: null,
				status: error,
				errorText: errorText,
			};
		});
};

export const refreshAccess = async (refreshToken: string) => {
	return await refreshApi<SessionUserType>({
		method: "post",
		data: { refresh_token: refreshToken },
		headers: { "Content-Type": "multipart/form-data" },
	})
		.then(function (response) {
			const data = prepareTokenData(response.data);
			return { data: data as User, status: response.status, errorText: "" };
		})
		.catch(function (error) {
			return {
				data: null,
				status: "401",
				errorText: "Не удалось обновить токен",
			};
		});
}; */
