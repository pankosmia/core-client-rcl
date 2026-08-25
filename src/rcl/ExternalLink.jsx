// PanExternalLink.jsx
import { forwardRef } from "react";

const ExternalLink = forwardRef(function ExternalLink(
  { href, netEnabled, children, ...rest },
  ref,
) {
  return (
    <a
      ref={ref}
      href={netEnabled ? href : undefined}
      target={netEnabled ? "_blank" : undefined}
      rel="noopener noreferrer"
      style={
        netEnabled
          ? undefined
          : { color: "inherit", textDecoration: "none", cursor: "default" }
      }
      {...rest}
    >
      {children}
    </a>
  );
});

export default ExternalLink;
