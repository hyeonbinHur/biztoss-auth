"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import UpdateForm from "./UpdateForm";

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
          <UpdateForm email={session?.user?.email as string} />
        </div>
      ) : (
        <div>
          <div>You are not signed in</div>
          <button onClick={() => signIn("kakao")}>Continue with Kakao</button>
        </div>
      )}
    </div>
  );
};
export default TestDashboard;
