import type { Metadata } from "next";
import { PT_Sans } from "next/font/google";
import "./globals.css";
import StyledComponentsRegistry from "./lib/registry";
const ptSans = PT_Sans({
  variable: "--font-pt-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Исторические даты",
  description: "Исторические даты",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${ptSans.variable}`}>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
