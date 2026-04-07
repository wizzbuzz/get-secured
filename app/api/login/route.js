import { NextResponse } from "next/server";

const UPSTREAM_LOGIN_URL = "http://10.10.10.10/api/login.php";
const COOKIE_MAX_AGE_SECONDS = 7 * 24 * 60 * 60;

export async function POST(request) {
  try {
    const body = await request.json();

    const upstreamResponse = await fetch(UPSTREAM_LOGIN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const text = await upstreamResponse.text();
    let payload;

    try {
      payload = JSON.parse(text);
    } catch {
      payload = { success: false, error: "Invalid upstream JSON" };
    }

    const response = NextResponse.json(payload, {
      status: upstreamResponse.status,
    });

    const setCookie = upstreamResponse.headers.get("set-cookie");
    if (setCookie) {
      response.headers.set("set-cookie", setCookie);
    }

    if (payload?.success && typeof payload.username === "string") {
      response.cookies.set("username", payload.username, {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
        path: "/",
        maxAge: COOKIE_MAX_AGE_SECONDS,
      });
    }

    if (payload?.success && (typeof payload.id === "number" || typeof payload.id === "string")) {
      response.cookies.set("user_id", String(payload.id), {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
        path: "/",
        maxAge: COOKIE_MAX_AGE_SECONDS,
      });
    }

    if (payload?.success && (typeof payload.role === "number" || typeof payload.role === "string")) {
      response.cookies.set("user_role", String(payload.role), {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
        path: "/",
        maxAge: COOKIE_MAX_AGE_SECONDS,
      });
    }

    return response;
  } catch {
    return NextResponse.json(
      { success: false, error: "Login proxy failed" },
      { status: 502 }
    );
  }
}
