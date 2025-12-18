import localFont from "next/font/local";
import "./globals.css";
import ThemeRegistry from "../components/ThemeRegistry/ThemeRegistry";

const helvetica = localFont({
  src: [
    {
      path: "../../public/Fonts/HelveticaNowText-Light.woff",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/Fonts/HelveticaNowText-Medium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/Fonts/HelveticaNowText-Bold.woff",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-helvetica",
});

export const metadata = {
  title: "Masters Academy",
  description: "LMS for Masters Academy",
};

import NavBar from "./components/NavBar/navBar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={helvetica.variable}>
        <ThemeRegistry>
          <NavBar />
          {children}
        </ThemeRegistry>
      </body>
    </html>
  );
}
