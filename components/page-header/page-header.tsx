import Link from "next/link";
import styles from "./page-header.module.css";

type Actions = {
  label: string;
  onClickCallback?: () => void;
  href?: string;
};

type PageHeaderProps = {
  title: string;
  actions?: Actions[];
};

export default function PageHeader({ title, actions }: PageHeaderProps) {
  return (
    <section id="page-header" className={styles.header}>
      <h2>{title}</h2>
      {actions &&
        actions.map((action) => {
          if (action.href) {
            return (
              <Link
                href={action.href}
                style={{ textDecoration: "none" }}
                key={action.label}
              >
                <button className={styles.button}>{action.label}</button>
              </Link>
            );
          }

          return (
            <button onClick={action.onClickCallback} key={action.label}>
              {action.label}
            </button>
          );
        })}
    </section>
  );
}
