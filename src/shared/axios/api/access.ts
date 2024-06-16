import axios from "axios";
import https from "https";

export const accessApi = axios.create({
	//baseURL: process.env.NEXT_PUBLIC_GET_TOKEN_API,
	baseURL: process.env.NEXT_PUBLIC_BACKEND_API,
	headers: {
		Authorization: `Basic ${process.env.NEXT_PUBLIC_TOKEN_BASIC_AUTH}`,
	},
});

const httpsAgent = new https.Agent({
	rejectUnauthorized: false,
});

accessApi.defaults.httpsAgent = httpsAgent;
