import React from "react";
import Link from "next/link";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";

interface UILinkProps {
  children: React.ReactElement;
  href: string;
  title: string;
  external?: boolean;
  center?: boolean;
}

export const UILink: React.FC<UILinkProps> = ({
  children,
  href,
  title,
  external = false,
  center = false,
}) => {
  const alignmentClass = center ? "justify-center" : "justify-normal";

  return (
    <Link
      className={`flex align-middle transition ${alignmentClass} transtion-colors cursor-pointer gap-1 text-[#38bdf8] ease-in-out hover:text-sky-50 focus:text-sky-50 active:text-sky-50 `}
      href={href}
      title={title}
      target="_blank"
    >
      {children}
      {external && <ArrowTopRightOnSquareIcon className="w-4" />}
    </Link>
  );
};
