import type { Metadata } from "next";
import Image from "next/image";
import UVLogo from "@/public/UVHorizontal-White.svg";
import "./globals.css";

export const metadata: Metadata = {
  title: "ERA",
  description: "an agent built using ultra vox",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* <!-- Fathom - beautiful, simple website analytics --> */}
        <script
          src="https://cdn.usefathom.com/script.js"
          data-site="ONYOCTXK"
          defer
        ></script>
        {/* <!-- / Fathom --> */}
      </head>
      <body className="bg-black text-white">
        <div className="flex mx-auto justify-between my-4 max-w-[1206px]">
          <h1 style={{ fontSize: 34 }}>ERA</h1>
        </div>
        {children}
      </body>
    </html>
  );
}
