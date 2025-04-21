"use client";
import { contactUsAction } from "@/lib/actions";
import styles from "./page.module.css";
import { useActionState } from "react";

export default function ContactUs() {
  const [state, formAction] = useActionState(contactUsAction, { message: "" });

  return (
    <main className={styles.container}>
      <h2 className={styles.heading}>Contact Us</h2>
      <p className={styles.subtitle}>
        We’d love to hear from you. Send us a message!
      </p>
      <form action={formAction} className={styles.form}>
        <div className={styles.field}>
          <label htmlFor="name">Name</label>
          <input
            className={styles.input}
            type="text"
            id="name"
            name="name"
            required
          />
        </div>

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
          <label htmlFor="query">Your Message</label>
          <textarea
            className={styles.textarea}
            id="query"
            name="query"
            rows={5}
            required
          />
        </div>
        {state?.message && <p>{state.message}</p>}
        <button type="submit" className={styles.button}>
          Send Message
        </button>
      </form>
    </main>
  );
}
