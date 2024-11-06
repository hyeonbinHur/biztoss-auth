"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

const TestDashboard = () => {
  const { data: session } = useSession();
  return (
    <div>
      {session ? (
        <div>
          Welcome back
          <div>{JSON.stringify(session)}</div>
          <button onClick={() => signOut({ callbackUrl: "/" })}>
            Sign Out
          </button>
          <div>{session.user?.name}</div>
          <Image
            src={session.user?.image ?? "/default-image.png"}
            alt="User profile picture"
            width={50}
            height={50}
          />
        </div>
      ) : (
        <div>
          <div>You are not signed in</div>
          <button onClick={() => signIn("kakao")}>Continue with Kakao</button>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              border: "1px solid white",
            }}
          >
            <label>Email </label>
            <input type="emai" required />
            <label> Password </label>
            <input type="password" required />
            <button>Submit</button>
          </form>
        </div>
      )}
    </div>
  );
};
export default TestDashboard;
