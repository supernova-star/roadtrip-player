import { CLOUDINARY_BASE_URL } from "@/constants";

export const percentToHex = (colour: string, value: number) => {
  const hex = Math.round((value / 100) * 255).toString(16);
  const opacity = hex.length > 1 ? hex : 0 + hex;
  return colour + opacity;
};

export const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

export const wallpaperUrl = (name: string) =>
  `${CLOUDINARY_BASE_URL}/${name}.webp`;
