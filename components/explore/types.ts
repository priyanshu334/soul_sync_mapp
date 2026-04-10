export type Profile = {
  id: string;
  name: string;
  age: number;
  location: string;
  dist: string;
  zodiac: string;
  tags: string[];
  bgColors: [string, string];
};

export type OverlayType = "NOPE" | "LIKE" | "FIRE" | "SUPER" | null;
