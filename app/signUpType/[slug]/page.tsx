"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
const page = () => {
  const params = useParams();
  const { slug } = params;

  useEffect(() => {
    localStorage.setItem("userType", slug as string);
  }, []);

  return (
    <div>
      <span>회원가입 종류를 선택해 주세요.</span>

      <div>
        <button onClick={() => signIn("kakao")} className="btn btn-kakao">
          카카오로 시작하기
        </button>

        <div>또는</div>

        <button className="btn-user-type btn-user-type__2">
          <Link href="/serviceCondition">ID/PW 회원가입</Link>
        </button>
      </div>
    </div>
  );
};

export default page;
