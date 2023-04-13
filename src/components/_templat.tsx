import React from "react";

interface FooProps {
  value?: string;
}

export const Foo: React.FC<FooProps> = ({ value = "" }) => {
  return <></>;
};
