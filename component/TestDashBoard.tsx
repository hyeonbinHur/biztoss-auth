"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import UpdateForm from "./UpdateForm";
import SignInForm from "@/component/SignInForm";
import Link from "next/link";

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
        <div style={{ padding: "5rem" }}>
          <SignInForm />
          <Link href={"/signup"}> Already have an account? </Link>
          <button onClick={() => signIn("kakao")}>Continue with Kakao</button>
        </div>
      )}
    </div>
  );
};
export default TestDashboard;
