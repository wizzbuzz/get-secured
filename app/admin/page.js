import { cookies } from "next/headers";
import { getSessionUser } from "../lib/session";

export default async function Home() {
    const user = await getSessionUser();
    const username = user.username ?? "(missing)";
    const userId = user.userId ?? "(missing)";
    const userRole = user.userRole ?? "(missing)";

    console.log(userRole);

    return (
        <div className="flex items-center justify-center h-screen">
        <div className="bg-cover bg-center h-full w-full absolute" style={{ backgroundImage: "url('/images/bread.png')" }}>
            <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-[#a04444] w-[40%] text-center p-8 login-form">
                <h2>Admin Panel</h2>
                {userRole == "admin" ? <p>You're an admin!<br></br>flag{`{broken_access_control}`}</p> : <p>You're not an admin!</p>}
            </div>
            </div>
        </div>
        </div>
    );
}
