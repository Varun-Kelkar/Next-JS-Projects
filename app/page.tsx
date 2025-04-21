import Link from "next/link";
import styles from "./page.module.css";

export default function LandingPage() {
  return (
    <main style={{ flex: 1, overflow: "scroll" }}>
      <section className={styles.hero}>
        <div className={styles["hero-content"]}>
          <h1>Effortless Expense Filing. Instant Reimbursement.</h1>
          <p>Filing expenses has never been this easy.</p>
          <Link href="/authentication">
            <button className={styles["cta-btn"]}>Get Started</button>
          </Link>
        </div>
      </section>
      <section className={styles.features}>
        <div className={styles.feature}>
          <h2>Easy Expense Filing</h2>
          <p>
            Keep track of all your expenses in one place, and visualize your
            spending patterns.
          </p>
        </div>
        <div className={styles.feature}>
          <h2>Smart Approval Workflow</h2>
          <p>
            Create custom budgets and receive alerts when you&apos;re close to
            your limit.
          </p>
        </div>
        <div className={styles.feature}>
          <h2>Fast Reimbursements</h2>
          <p>
            Generate detailed financial reports to better understand your
            finances and make informed decisions.
          </p>
        </div>
      </section>
    </main>
  );
}
