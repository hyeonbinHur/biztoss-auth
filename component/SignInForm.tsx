"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Link from "next/link";
import KaKao from "@/public/kakao_icon.png";

interface UserInfo {
  email: string;
  password: string;
}
const FormComp = () => {
  const form1 = useForm<UserInfo>();
  const { register, handleSubmit } = form1;

  const handleSignUp = async (userinfo: UserInfo) => {
    console.log(userinfo);

    const response = await signIn("credentials", {
      redirect: false,
      email: userinfo.email,
      password: userinfo.password,
    });

    if (response && !response.ok) {
      toast.error(response.error || "Failed to sign in");
    } else {
      toast.success("Now signed in");
    }
  };

  return (
    <div className="signinform-item--2">
      <button onClick={() => signIn("kakao")} className="btn btn-kakao">
        카카오로 시작하기
      </button>
      <div className="divider">또는</div>
      <form onSubmit={handleSubmit(handleSignUp)} className="signinform--form">
        <input
          type="text"
          placeholder="이메일"
          required
          {...register("email")}
          className="signinform--input"
        />
        <input
          type="password"
          placeholder="비밀번호"
          required
          {...register("password")}
          className="signinform--input"
        />
        <span className="signinform--save">
          <input
            type="checkbox"
            id="saveCheck"
            className="signinform--save__checkbox"
          />
          <label htmlFor="saveCheck" className="signinform--save__label">
            로그인 상태유지
          </label>
        </span>

        <button type="submit" className="btn btn-signin">
          로그인
        </button>
      </form>
      <div className="signinform--signup">
        <Link href={"/signup"}> 회원가입 </Link>

        <button className="btn-findId">
          <span>아이디 &middot; 비밀번호 찾기</span>
        </button>
      </div>
      <div className="divider">또는</div>
      <button className="btn btn-guest">비회훤 주문배송 조회</button>
    </div>
  );
};

export default FormComp;
