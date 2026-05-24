import type { Metadata } from "next";
import "./globals.css";
import { Sidebar, MobileTopbar } from "@/components/sidebar";

export const metadata: Metadata = {
  title: "Baby Mo · Content Studio",
  description: "A premium AI-powered Islamic parenting content studio.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex-1 flex flex-col min-w-0">
            <MobileTopbar />
            <main className="flex-1">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
