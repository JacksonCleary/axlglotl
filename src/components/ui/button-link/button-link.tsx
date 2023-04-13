import React from "react";
import Link from "next/link";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";

interface UIButtonLinkProps {
  children: React.ReactElement;
  href: string;
  title: string;
  external?: boolean;
}

export const UIButtonLink: React.FC<UIButtonLinkProps> = ({
  children,
  href,
  title,
  external = false,
}) => {
  return (
    <Link
      className="transtion-colors flex max-w-xs cursor-pointer flex-row justify-center gap-1 rounded-xl bg-white/10 p-4 align-middle text-[#f0f9ff] transition ease-in-out hover:bg-white/20"
      href={href}
      title={title}
      target="_blank"
    >
      {children}
      {external && <ArrowTopRightOnSquareIcon className="w-6" />}
    </Link>
  );
};
