"use client";
import Image from "next/image";
import NavLink from "./NavLink";
import NavLogo from "@/public/biztoss-nav-logo.png";
import { useSession } from "next-auth/react";

const MainHeader = () => {
  const { data: session, update } = useSession();

  return (
    <nav>
      <ul className="nav--container">
        <li>
          <NavLink href="/">
            <Image src={NavLogo} alt="biztoss Logo" className="nav--logo" />
          </NavLink>
        </li>
        <li>
          <NavLink href="/">매물 둘러보기</NavLink>
        </li>
        <li>
          <NavLink href="/">비즈니스 매각신청</NavLink>
        </li>
        <li>
          <NavLink href="/">플랜 안내</NavLink>
        </li>
        <li>
          <NavLink href="/">비즈토스 FAQ</NavLink>
        </li>
        <li>
          <NavLink href="/">About us</NavLink>
        </li>
        <li>
          <NavLink href="/">.</NavLink>
        </li>
        <li>
          {session?.user ? (
            <div>{session?.user?.name}</div>
          ) : (
            <NavLink href="/signin">로그인</NavLink>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default MainHeader;
