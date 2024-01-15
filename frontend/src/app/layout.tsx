import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import "admin-lte/dist/css/adminlte.min.css";
import "admin-lte/plugins/fontawesome-free/css/all.min.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Integração ViaCEP",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <body>{children}</body>
    </html>
  );
}