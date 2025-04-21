import styles from "./page.module.css";

interface DetailItem {
  label: string;
  value: string | number;
}

export default function DetailsView({ details }: { details: DetailItem[] }) {
  return (
    <div className={styles.detailsContainer}>
      {details.map((item, index) => (
        <div key={index} className={styles.detailItem}>
          <label className={styles.label}>{item.label}</label>
          <div className={styles.value}>{item.value}</div>
        </div>
      ))}
    </div>
  );
}
