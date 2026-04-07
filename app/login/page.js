"use client";

import { useState } from "react";

async function login(username, password) {
    const res = await fetch("/api/login", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  return res.json(); // return the JSON response
}

export default function Home() {
    const [message, setMessage] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
    e.preventDefault();
        const result = await login(username, password);

        if (result.success) {
            setMessage("Login successful!");
            // optionally redirect:
            window.location.href = "/dashboard";
        } else {
            setMessage("Invalid username or password");
        }
    };
    return (
        <div className="flex items-center justify-center h-screen">
        <div className="bg-cover bg-center h-full w-full absolute" style={{ backgroundImage: "url('/images/bread.png')" }}>
            <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-[#a04444] w-[40%] text-center p-8 login-form">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-1">
                    <label htmlFor="username">Username: </label>
                    <input id="username" name="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </div>
                    <div className="">
                        <label htmlFor="password">Password: </label>
                        <input id="password" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <div className="gap-1">
                        <button type="submit">Sign in</button>
                    </div>
                </form>
                {message && (
                <p style={{ marginTop: "1rem", color: "white" }}>
                    {message}
                </p>
                )}
            </div>
            </div>
        </div>
        </div>
    );
}
