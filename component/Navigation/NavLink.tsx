"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
// import classes from "./main-header.module.css";
import { ReactNode } from "react";

const NavLink: React.FC<{ href: string; children: ReactNode }> = (props) => {
  const path = usePathname();

  return (
    <Link
      href={props.href}
      // className={path.startsWith(props.href) ? classes.active : undefined}
    >
      {props.children}
    </Link>
  );
};

export default NavLink;
