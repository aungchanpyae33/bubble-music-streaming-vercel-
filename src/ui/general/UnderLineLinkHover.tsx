import Link, { LinkProps } from "next/link";
import { ReactNode } from "react";

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
    <Link {...props} className={`${className} hover:underline`}>
      {children}
    </Link>
  );
}

export default UnderLineLinkHover;
