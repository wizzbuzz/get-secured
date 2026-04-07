import { NextResponse } from "next/server";

const UPSTREAM_REGISTER_URL = "http://10.10.10.20/api/register.php";

function parseJsonSafe(text) {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    const upstreamJsonResponse = await fetch(UPSTREAM_REGISTER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const jsonText = await upstreamJsonResponse.text();
    let payload = parseJsonSafe(jsonText);
    let status = upstreamJsonResponse.status;

    // Some PHP endpoints accept form-encoded bodies (Thunder Client default) but reject JSON.
    if (!payload && !upstreamJsonResponse.ok) {
      const form = new URLSearchParams();
      Object.entries(body || {}).forEach(([key, value]) => {
        form.append(key, String(value ?? ""));
      });

      const upstreamFormResponse = await fetch(UPSTREAM_REGISTER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: form.toString(),
        cache: "no-store",
      });

      const formText = await upstreamFormResponse.text();
      payload = parseJsonSafe(formText);
      status = upstreamFormResponse.status;

      if (!payload) {
        payload = {
          success: upstreamFormResponse.ok,
          error: upstreamFormResponse.ok ? undefined : formText || "Registration failed",
          rawUpstreamBody: formText,
          upstreamStatus: upstreamFormResponse.status,
        };
      }
    } else if (!payload) {
      payload = {
        success: upstreamJsonResponse.ok,
        error: upstreamJsonResponse.ok ? undefined : jsonText || "Registration failed",
        rawUpstreamBody: jsonText,
        upstreamStatus: upstreamJsonResponse.status,
      };
    }

    if (typeof payload.success !== "boolean") {
      payload.success = status >= 200 && status < 300;
    }

    const response = NextResponse.json(payload, {
      status,
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Register proxy failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 502 }
    );
  }
}
