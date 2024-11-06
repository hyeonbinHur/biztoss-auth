import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import SignUpForm from "@/component/SignUpForm";
import React from "react";
import { Toaster } from "react-hot-toast";
import Link from "next/link";

const page = async () => {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }

  return (
    <section>
      <SignUpForm />
      <Toaster position="top-right" reverseOrder={false} />
      <Link href={"/"}> Already have an account? </Link>
    </section>
  );
};

export default page;
