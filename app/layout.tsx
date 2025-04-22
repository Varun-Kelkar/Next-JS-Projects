import type { Metadata } from "next";
import "./globals.css";
import styles from "./page.module.css";
import Link from "next/link";
import { logout } from "@/lib/actions";
import { verifyAuth } from "@/lib/auth";

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
        <header className={styles.header}>
          <nav className={styles.nav}>
            <div className={styles.logo}>
              <Link href="/" style={{ textDecoration: "none" }}>
                <h1>Expense Manager</h1>
              </Link>
            </div>
            <ul className={styles["nav-links"]}>
              <li>
                <Link href={"/how-it-works"}>How It Works</Link>
              </li>
              <li>
                <Link href={"/contact"}>Contact</Link>
              </li>
              <li>
                {user ? (
                  <form action={logout}>
                    <button type="submit" className={styles.button}>
                      Logout
                    </button>
                  </form>
                ) : (
                  <Link href={"/authentication?mode=login"}>Login</Link>
                )}
              </li>
            </ul>
          </nav>
        </header>
        {children}
        <footer className={styles.footer}>
          <p>&copy; 2025 Expense Manager. All Rights Reserved.</p>
        </footer>
      </body>
    </html>
  );
}
