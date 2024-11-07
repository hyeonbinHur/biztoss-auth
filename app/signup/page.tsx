import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import SignUpForm from "@/component/SignUpForm";
import React from "react";
import { Toaster } from "react-hot-toast";

const page = async () => {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/");
  }
  return (
    <section className="signup">
      <p className="signup--title">회원님의 정보를 입력해주세요.</p>
      <SignUpForm />
      <Toaster position="top-right" reverseOrder={false} />
    </section>
  );
};

export default page;
