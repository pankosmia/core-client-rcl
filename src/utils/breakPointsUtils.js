import useMediaQuery from "@mui/material/useMediaQuery";

const arrayBreakPoint = ["xs", "sm", "md", "lg", "xl"];

export function getBreakPoint(theme) {
  const isXs = useMediaQuery(theme.breakpoints.only("xs"));
  const isSm = useMediaQuery(theme.breakpoints.only("sm"));
  const isMd = useMediaQuery(theme.breakpoints.only("md"));
  const isLg = useMediaQuery(theme.breakpoints.only("lg"));
  const isXl = useMediaQuery(theme.breakpoints.only("xl"));

  if (isXs) return "xs";
  if (isSm) return "sm";
  if (isMd) return "md";
  if (isLg) return "lg";
  if (isXl) return "xl";

  return "xl";
}

export function breakpointTopixel(breakpoint) {
  if (!arrayBreakPoint.includes(breakpoint)) {
    throw new Error(`Invalid breakpoint: ${breakpoint1}`);
  }
  if (breakpoint === "xs") {
    return 0;
  }
  if (breakpoint === "sm") {
    return 600;
  }
  if (breakpoint === "md") {
    return 900;
  }
  if (breakpoint === "lg") {
    return 1200;
  }
  if (breakpoint === "xl") {
    return 1536;
  }
}
export function compareBreakPoints(breakpoint1, breakpoint2, comparator) {
  if (!arrayBreakPoint.includes(breakpoint1)) {
    throw new Error(`Invalid breakpoint: ${breakpoint1}`);
  }

  if (!arrayBreakPoint.includes(breakpoint2)) {
    throw new Error(`Invalid breakpoint: ${breakpoint2}`);
  }

  const indexB1 = arrayBreakPoint.indexOf(breakpoint1);
  const indexB2 = arrayBreakPoint.indexOf(breakpoint2);

  return comparator(indexB1, indexB2);
}
