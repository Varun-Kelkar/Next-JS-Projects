"use client";
import { auth } from "@/lib/actions";
import styles from "./auth-form.module.css";
import { useActionState } from "react";
import Link from "next/link";

export default function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const [actionState, formAction] = useActionState(auth.bind(null, mode), {
    errors: {} as { email?: string; password?: string },
  });

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>
        {mode === "login" ? "Login" : "Sign Up"}
      </h2>

      <form action={formAction} className={styles.form}>
        <div className={styles.field}>
          <label htmlFor="email">Email</label>
          <input
            className={styles.input}
            type="email"
            id="email"
            name="email"
            required
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="name">Password</label>
          <input
            className={styles.input}
            type="password"
            id="password"
            name="password"
            required
          />
        </div>
        {actionState.errors && (
          <ul id="form-errors">
            {Object.keys(actionState.errors).map((key) => (
              <li key={key}>
                {actionState.errors[key as keyof typeof actionState.errors]}
              </li>
            ))}
          </ul>
        )}
        <button type="submit" className={styles.button}>
          {mode === "login" ? "Log In" : "Sign Up"}
        </button>
        {mode === "login" ? (
          <Link
            href="/authentication?mode=signup"
            style={{ textDecoration: "none", color: "#66a6ff" }}
          >
            Haven&apos;t signed up yet? Create Account
          </Link>
        ) : (
          <Link
            href="/authentication?mode=login"
            style={{ textDecoration: "none", color: "#66a6ff" }}
          >
            Already have an account? Log in
          </Link>
        )}
      </form>
    </div>
  );
}
