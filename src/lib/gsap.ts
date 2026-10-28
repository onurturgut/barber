import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
}

/** Media query used everywhere motion is allowed. */
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";
export const DESKTOP_MOTION =
  "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";

export { gsap, ScrollTrigger, SplitText, useGSAP };
