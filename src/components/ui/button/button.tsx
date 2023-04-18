import React from "react";

interface UIButtonProps {
  children: React.ReactElement;
  title: string;
  action: () => void;
  disabled?: boolean;
}

export const UIButton: React.FC<UIButtonProps> = ({
  children,
  title,
  action,
  disabled = false,
}) => {
  const disabledClass = disabled
    ? "cursor-not-allowed disabled:opacity-25"
    : "cursor-allowed";

  return (
    <button
      className={`${disabledClass} transtion-colors text-1xl flex max-w-xs cursor-pointer flex-row justify-center gap-1 rounded border-b-2 border-sky-50 bg-sky-900 px-4 py-2 text-center font-bold text-sky-50 transition ease-in-out hover:border-sky-50 hover:bg-sky-700`}
      title={title}
      onChange={action}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
