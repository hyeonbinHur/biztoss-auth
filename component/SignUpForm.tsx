"use client";

import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface UserInfo {
  email: string;
  password: string;
  "pw check": string;
  username: string;
  usertype: string;
}

const FormComp = () => {
  const form1 = useForm<UserInfo>();
  const { register, handleSubmit } = form1;
  const handleSignUp = async (userinfo: UserInfo) => {
    console.log(userinfo);
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(userinfo),
    });
    const data = await response.json();
    if (data.error) {
      toast.error(data.error);
    }
    toast.success("Account created");
  };
  return (
    <>
      <form
        style={{ margin: "1rem", padding: "1rem" }}
        onSubmit={handleSubmit(handleSignUp)}
      >
        <input
          type="text"
          placeholder="유저 프로필 아바타"
          required
          {...register("email")}
        />

        <input
          type="text"
          placeholder="이메일"
          required
          {...register("email")}
        />

        <input
          type="password"
          placeholder="비밀번호"
          required
          {...register("password")}
        />

        <input
          type="password"
          placeholder="비밀번호 확인"
          required
          {...register("pw check")}
        />

        <input
          type="text"
          placeholder="이름"
          required
          {...register("username")}
        />

        <input
          type="text"
          placeholder="연락처"
          required
          {...register("username")}
        />

        <input
          type="text"
          placeholder="생년월일"
          required
          {...register("username")}
        />

        <button type="submit">가입하기</button>
      </form>
    </>
  );
};

export default FormComp;
