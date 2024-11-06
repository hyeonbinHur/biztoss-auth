import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import SignInForm from "../../component/SignInForm";
import React from "react";
import { Toaster } from "react-hot-toast";
import Link from "next/link";

const page = async () => {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }

  return (
    <section className="signinform">
      <p className="signinform-item--1">
        <span>비즈토스에 오신 것을 환영합니다.</span>
      </p>

      <SignInForm />

      <Toaster position="top-right" reverseOrder={false} />
    </section>
  );
};

export default page;
