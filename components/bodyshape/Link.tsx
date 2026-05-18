"use client";

import NextLink from "next/link";
import type { ComponentProps, ReactNode } from "react";

type LinkProps = Omit<ComponentProps<typeof NextLink>, "href"> & {
  to?: string;
  children?: ReactNode;
};

/** react-router-dom -> next/link shim: maps `to` to `href`. */
export const Link = ({ to, children, ...rest }: LinkProps) => {
  const href = to && to.length > 0 ? to : "#";
  return (
    <NextLink href={href} {...rest}>
      {children}
    </NextLink>
  );
};

export default Link;
