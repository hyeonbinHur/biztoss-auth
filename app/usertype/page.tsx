"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

// type UserType = "Seller" | "Buyer" | undefined;

const page = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleClickSeller = () => {
    if (session?.user) {
      //유저정보 셀러로 바로 업데이트
    } else {
      document.cookie = "userType=seller; path=/; max-age=300";
      router.push("/signUpType/seller");
    }
  };

  const handleClickBuyer = () => {
    if (session?.user) {
      //유저정보 바이어로 바로 업데이트
    } else {
      document.cookie = "userType=buyer; path=/; max-age=300";
      router.push("/signUpType/buyer");
    }
  };

  return (
    <section className="signup-usertype">
      <div className="signup-item__1">
        <span>어떠한 목적으로 비즈토스에 가입하시나요?</span>
      </div>
      <div className="signup-item__2">
        <button
          className="btn-user-type btn-user-type__1"
          onClick={() => handleClickSeller()}
        >
          <p>Seller 회원</p>
          <p>온라인 비즈니스를 양도하기 위해 가입해요.</p>
        </button>
        <button
          className="btn-user-type btn-user-type__2"
          onClick={() => handleClickBuyer()}
        >
          <p>Buyer 회원</p>
          <p>온라인 비즈니스를 양수하기 위해 가입해요.</p>
        </button>
      </div>
    </section>
  );
};

export default page;
