import type { Metadata } from "next";
import "./globals.css";
import styles from "./page.module.css";
import { verifyAuth } from "@/lib/auth";
import GlobalHeader from "@/components/global-header/global-header";

export const metadata: Metadata = {
  title: "Expense Manager",
  description: "Manage your expenses efficiently",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await verifyAuth();
  return (
    <html lang="en">
      <body>
        <GlobalHeader user={user} />
        {children}
        <footer className={styles.footer}>
          <p>&copy; 2025 Expense Manager. All Rights Reserved.</p>
        </footer>
      </body>
    </html>
  );
}
