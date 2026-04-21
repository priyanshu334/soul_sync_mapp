import { MaterialCommunityIcons } from "@expo/vector-icons";
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
      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
      fill="none"
      stroke="#ff6b9d"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </Svg>
);

export function Example() {
  return <MaterialCommunityIcons name="heart" color="#c41c1cff" size={24} />;
}

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
