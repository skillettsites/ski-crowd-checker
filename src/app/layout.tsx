import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ski Crowd Checker | Find the Quietest Weeks to Ski in Europe",
  description:
    "Avoid busy ski slopes by checking European school holiday overlaps. Find the quietest weeks to ski in the Alps this season.",
  keywords: [
    "ski holidays",
    "quiet ski weeks",
    "European school holidays",
    "ski crowd calendar",
    "best time to ski",
    "Alps ski season",
  ],
  openGraph: {
    title: "Ski Crowd Checker | Find the Quietest Weeks to Ski",
    description:
      "See when European school holidays overlap with ski season. Plan your trip for the quietest slopes.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
