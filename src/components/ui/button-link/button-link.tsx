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
      className="transtion-colors flex max-w-xs cursor-pointer flex-row justify-center gap-1 rounded border-b-2 border-sky-50 bg-sky-900 px-4 py-2 font-bold text-sky-50 transition ease-in-out hover:border-sky-50 hover:bg-sky-700"
      href={href}
      title={title}
      target="_blank"
    >
      {children}
      {external && <ArrowTopRightOnSquareIcon className="w-6" />}
    </Link>
  );
};
