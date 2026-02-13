import type { Metadata } from "next";
import "./globals.css";
import SmartCursor from "@/components/SmartCursor";

export const metadata: Metadata = {
    title: "Mykola Sarnavskiy - CV",
    description: "System Administrator | IT Infrastructure & Cloud Support | Local Area Networks",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="antialiased tech-bg" suppressHydrationWarning>
                <SmartCursor />
                {children}
            </body>
        </html>
    );
}
