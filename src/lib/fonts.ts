import {
  Josefin_Sans as FontSans,
  Space_Grotesk as Grotesk,
} from "next/font/google";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: "700",
});

export const grotesk = Grotesk({
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-grotesk",
  subsets: ["latin"],
});
