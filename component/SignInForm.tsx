"use client";

import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface UserInfo {
  email: string;
  password: string;
}
const FormComp = () => {
  const form1 = useForm<UserInfo>();
  const { register, handleSubmit } = form1;
  const router = useRouter();

  const handleSignin = async (userinfo: UserInfo) => {
    console.log(userinfo);
    if (userinfo.email === "") {
      alert("아이디를 입력 하세요.");
    }
    if (userinfo.password === "") {
      alert("비밀번호를 입력 하세요.");
    }
    const response = await signIn("credentials", {
      redirect: false,
      email: userinfo.email,
      password: userinfo.password,
    });
    if (response && !response.ok) {
      alert("잘못된 아이디 또는 비밀번호입니다.");
    } else {
      router.push("/applyBusinessSale");
    }
  };

  return (
    <div className="signinform-item--2">
      <button
        onClick={() => {
          signIn("kakao");
        }}
        className="btn btn-kakao"
      >
        카카오로 시작하기
      </button>
      <div className="divider">또는</div>
      <form onSubmit={handleSubmit(handleSignin)} className="signinform--form">
        <input
          type="text"
          placeholder="이메일"
          {...register("email")}
          className="signinform--input signinform--input__1"
        />
        <input
          type="password"
          placeholder="비밀번호"
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
        <Link href={"/usertype"}> 회원가입 </Link>

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
