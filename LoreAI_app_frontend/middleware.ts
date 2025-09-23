import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
   const res = NextResponse.next();
   const supabase = createMiddlewareClient({ req, res });

   const {
     data: { user },
   } = await supabase.auth.getUser();

   const publicPaths = ["/login", "/signup", "/"];
   const path = req.nextUrl.pathname;
   const isPublic = publicPaths.some((p) => path.startsWith(p));

   if (!user && !isPublic) {
     const redirectUrl = req.nextUrl.clone();
     redirectUrl.pathname = "/login";
     return NextResponse.redirect(redirectUrl);
   }

   if (user && isPublic) {
     const redirectUrl = req.nextUrl.clone();
     redirectUrl.pathname = "/dashboard";
     return NextResponse.redirect(redirectUrl);
   }

  return res;
}

// Optional: Scope only to certain routes for performance
 export const config = {
   matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};