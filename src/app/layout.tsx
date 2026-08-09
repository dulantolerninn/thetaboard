import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = { title: "Theta Board", description: "Pizarras privadas para pensar y mapear ideas." };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><head><link rel="stylesheet" href="https://unpkg.com/@excalidraw/excalidraw@0.18.1/dist/prod/index.css" /></head><body>{children}</body></html>;
}
