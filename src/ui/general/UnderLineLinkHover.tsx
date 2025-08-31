import { LinkProps } from "next/link";
import { ReactNode } from "react";
import NoThankYouPreFetchLink from "./NoThankYouPreFetchLink";

interface UnderLineLinkHoverProps extends LinkProps {
  children: ReactNode;
  className?: string;
}
function UnderLineLinkHover({
  children,
  className = "",
  ...props
}: UnderLineLinkHoverProps) {
  return (
    <NoThankYouPreFetchLink
      {...props}
      className={`${className} hover:underline`}
    >
      {children}
    </NoThankYouPreFetchLink>
  );
}

export default UnderLineLinkHover;
