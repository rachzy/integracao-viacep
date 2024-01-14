import Link from "next/link";
import React from "react";

interface IProps {
  href?: string;
  icon: string;
  onClick?: () => void;
  children: React.ReactNode;
}

export default function NavItem({ href, icon, onClick, children }: IProps) {
  return (
    <li className="nav-item" onClick={onClick}>
      <Link href={href || "/"} className="nav-link">
        <i className={`nav-icon fas ${icon}`} />
        <p>{children}</p>
      </Link>
    </li>
  );
}
