import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
import { NextRequest } from "next/server";

export default withAuth(async function middleware(_req: NextRequest) {}, {
  isReturnToCurrentPage: true,
});

export const config = {
  matcher: [
    // Run on everything but Next internals and static files
    "/((?!_next|api/search|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};
