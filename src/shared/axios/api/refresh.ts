import axios from "axios";
import https from "https";

export const refreshApi = axios.create({
	baseURL: process.env.NEXT_PUBLIC_REFRESH_TOKEN_API,
	headers: {
		Authorization: `Basic ${process.env.NEXT_PUBLIC_TOKEN_BASIC_AUTH}`,
	},
});

const httpsAgent = new https.Agent({
	rejectUnauthorized: false,
});

refreshApi.defaults.httpsAgent = httpsAgent;
