import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
	const requestHeaders = new Headers(request.headers);

	let cookie = request.cookies.get("nextjs");
	const allCookies = request.cookies.getAll();
	
	if (!requestHeaders.get("x-url")) {
		requestHeaders.set("x-url", request.url);
	}

	return NextResponse.next({
		request: {
			headers: requestHeaders,
		},
	});
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - static (static files)
		 * - favicon.ico (favicon file)
		 */
		"/((?!api|axios|static|favicon.ico).*)",
	],
};
