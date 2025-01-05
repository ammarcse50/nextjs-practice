import { NextResponse } from "next/server";

export const middleware = (request) => {
  return NextResponse.redirect(new URL("/categories", request.url));
};

export const config = {
  matcher: "/dashboard",
};
