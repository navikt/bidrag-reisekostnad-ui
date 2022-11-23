import {NextResponse} from 'next/server'
import type {NextRequest} from 'next/server'
import tokenProvider from "./libs/security/providers";
import {AuthProvider} from "./libs/security/providers/AuthProvider";
// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
  console.log("I am here", req.url, req.nextUrl)

  // return await verifyAuth(req, tokenProvider);
}

// export async function verifyAuth(
//     req: NextRequest,
//     provider: AuthProvider
// ): Promise<NextResponse> {
//   const token = provider.getToken(req);
//   if (!token) return new NextResponse(null, { status: 401 })
//
//   // try {
//   //   await provider.verifyToken(token);
//   //   return NextResponse.next();
//   // } catch (err) {
//   //   console.error(err);
//   //   return provider.redirect(req);
//   // }
// }

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/((?!api|_next/static|favicon.ico|oauth2).*)',
}