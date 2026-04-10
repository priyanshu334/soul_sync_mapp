import React from "react";
import Svg, { Circle, Line, Path, Polygon } from "react-native-svg";

export const IconClose = () => (
  <Svg width={22} height={22} viewBox="0 0 24 24">
    <Circle
      cx="12"
      cy="12"
      r="11"
      fill="none"
      stroke="#ff6b6b"
      strokeWidth="1.5"
      opacity="0.8"
    />
    <Line
      x1="8"
      y1="8"
      x2="16"
      y2="16"
      stroke="#ff6b6b"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <Line
      x1="16"
      y1="8"
      x2="8"
      y2="16"
      stroke="#ff6b6b"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </Svg>
);

export const IconStar = () => (
  <Svg width={22} height={22} viewBox="0 0 24 24">
    <Polygon
      points="12,2 15.09,8.26 22,9.27 17.77,14.14 18.54,21.09 12,17.77 5.46,21.09 6.23,14.14 2,9.27 8.91,8.26"
      fill="none"
      stroke="#ffd700"
      strokeWidth="1.2"
      strokeLinejoin="round"
    />
  </Svg>
);

export const IconFire = () => (
  <Svg width={22} height={22} viewBox="0 0 24 24">
    <Path
      d="M12 2C12 2 13 6 13 9C13 10.5 12.2 11.8 11 12.5C11.5 11.5 11.5 10.2 10.5 9.5C10.5 11 9.5 12 8.5 12.5C8 11.5 8 10 9 9C7.5 10 7 11.5 7 13C7 15.8 8.8 18 12 18C15.2 18 17 15.8 17 13C17 13 18 10.5 18 7.5C18 4 16 2 12 2Z"
      fill="none"
      stroke="#ff8c42"
      strokeWidth="1.2"
      strokeLinejoin="round"
    />
  </Svg>
);

export const IconHeart = () => (
  <Svg width={22} height={22} viewBox="0 0 24 24">
    <Path
      d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
      fill="none"
      stroke="#ff1493"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const IconProfile = () => (
  <Svg width={18} height={18} viewBox="0 0 24 24">
    <Circle
      cx="12"
      cy="8"
      r="4"
      fill="none"
      stroke="#a8a8b8"
      strokeWidth="1.2"
    />
    <Path
      d="M4 20c0-4.418 3.582-8 8-8s8 3.582 8 8"
      stroke="#a8a8b8"
      strokeWidth="1.2"
      strokeLinecap="round"
      fill="none"
    />
  </Svg>
);

export const IconSend = () => (
  <Svg width={18} height={18} viewBox="0 0 24 24">
    <Path
      d="M3 3l18 9-18 9V13L8 12 3 11v-8z"
      fill="none"
      stroke="#a8a8b8"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
