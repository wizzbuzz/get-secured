import { NextResponse } from "next/server";

function clearAuthCookies(response) {
  response.cookies.set("session_token", "", {
    path: "/",
    maxAge: 0,
  });

  response.cookies.set("username", "", {
    path: "/",
    maxAge: 0,
  });

  response.cookies.set("user_id", "", {
    path: "/",
    maxAge: 0,
  });

  response.cookies.set("user_role", "", {
    path: "/",
    maxAge: 0,
  });
}

export async function POST(request) {
  const url = new URL("/login", request.url);
  const response = NextResponse.redirect(url);
  clearAuthCookies(response);
  return response;
}

export async function GET(request) {
  const url = new URL("/login", request.url);
  const response = NextResponse.redirect(url);
  clearAuthCookies(response);
  return response;
}
