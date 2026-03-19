import * as React from "react";
import { Link as RouterLink } from "react-router-dom";

type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  replace?: boolean;
  prefetch?: boolean;
};

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, replace, target, children, ...props }, ref) => {
    const isInternal = href.startsWith("/") && !target;

    if (isInternal) {
      return (
        <RouterLink ref={ref} to={href} replace={replace} {...props}>
          {children}
        </RouterLink>
      );
    }

    return (
      <a ref={ref} href={href} target={target} {...props}>
        {children}
      </a>
    );
  }
);

Link.displayName = "Link";

export default Link;
