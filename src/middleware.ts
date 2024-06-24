import { NextResponse, type NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

//const protectedRoutes = ["/albums", "/posts"];

export async function middleware(req: NextRequest) {
	const reqHeaders = new Headers(req.headers);
	const token = await getToken({ req });
	const isAuthenticated = !!token;
	const pathname = req.nextUrl.pathname;

	/* if (
		protectedRoutes.some((route) => pathname.startsWith(route)) &&
		!isAuthenticated
	) {
		//Переводит на page/forbidden - widget page-403
		return NextResponse.redirect(new URL("/forbidden", req.url));
	} */

	if (pathname.startsWith("/login") && isAuthenticated) {
		return NextResponse.redirect(new URL("/", req.url));
	}

	/* let cookie = request.cookies.get("nextjs");
	const allCookies = request.cookies.getAll(); */

	//if (!reqHeaders.get("x-url")) {
	reqHeaders.set("x-url", req.url);
	//}

	return NextResponse.next({
		request: {
			headers: reqHeaders,
		},
	});
} //);

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
