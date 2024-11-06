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
    <div className="signup-type">
      <p className="signup-type--p">회원가입 종류를 선택해 주세요.</p>
      <div className="signup-type--container">
        <button onClick={() => signIn("kakao")} className="btn btn-kakao">
          카카오로 시작하기
        </button>
        <div className="signup-type--divider">또는</div>
        <Link
          className="btn-user-type btn-user-type__2 signup-type--id-pw"
          href="/serviceCondition"
        >
          ID/PW 회원가입
        </Link>
      </div>
    </div>
  );
};

export default page;
