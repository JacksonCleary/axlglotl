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
      className={`flex align-middle transition ${alignmentClass} transtion-colors cursor-pointer gap-1 text-[#38bdf8] ease-in-out hover:text-[#f0f9ff] focus:text-[#f0f9ff] active:text-[#f0f9ff] `}
      href={href}
      title={title}
      target="_blank"
    >
      {children}
      {external && <ArrowTopRightOnSquareIcon className="w-4" />}
    </Link>
  );
};
