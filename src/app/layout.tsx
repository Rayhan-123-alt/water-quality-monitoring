import type { Metadata } from "next";
import "./globals.css"

export const metadata: Metadata = {
  title: "Water Tank Monitoring System",
  description: "Monitor and control your water tank quality with real-time sensor data",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
