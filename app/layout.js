import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getSessionUser } from "./lib/session";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Little Italy",
  description: "The best bakery in town!",
};

export default async function RootLayout({ children }) {
  const user = await getSessionUser();

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <div className="header">
          <div>
            <h1>Little Italy</h1>
            {user.isLoggedIn && <p>Logged in as {user.username ?? "user"} ({user.userRole ?? "no role"})</p>}
          </div>
          <div className="menu">
            <a href="/"><p>Home</p></a>
            {!user.isLoggedIn && <a href="/login"><p>Login</p></a>}
            {user.isLoggedIn && <a href="/dashboard"><p>Dashboard</p></a>}
            {!user.isLoggedIn && <a href="/register"><p>Register</p></a>}
            {user.isLoggedIn && (
              <form action="/api/logout" method="post">
                <button type="submit">Logout</button>
              </form>
            )}
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}
