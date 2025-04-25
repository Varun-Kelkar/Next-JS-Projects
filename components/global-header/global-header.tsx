"use client";
import { useState } from "react";
import Link from "next/link";
import { User } from "lucia";
import useIsMobile from "@/app/hooks";
import { logout } from "@/lib/actions";
import { FaBars } from "react-icons/fa";
import styles from "./global-header.module.css";

export default function GlobalHeader({ user }: { user: User | null }) {
  const isMobile = useIsMobile(768);
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!open);
  };
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <h1>Expense Manager</h1>
          </Link>
        </div>
        <ul className={styles["nav-links"]}>
          {!isMobile ? (
            <>
              <li>
                <Link href={"/expenses"}>My Expenses</Link>
              </li>
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
            </>
          ) : (
            <li onClick={toggleMenu}>
              <FaBars />
            </li>
          )}
        </ul>
      </nav>
      {/* <></> */}
      {isMobile && open && (
        <ul className={styles["mobile-nav-links"]}>
          <li>
            <Link href={"/expenses"}>My Expenses</Link>
          </li>
          <li>
            <Link href={"/how-it-works"}>How It Works</Link>
          </li>
          <li>
            <Link href={"/contact"}>Contact</Link>
          </li>
          <li>
            {user ? (
              <span onClick={logout}>Logout</span>
            ) : (
              <Link href={"/authentication?mode=login"}>Login</Link>
            )}
          </li>
        </ul>
      )}
    </header>
  );
}
