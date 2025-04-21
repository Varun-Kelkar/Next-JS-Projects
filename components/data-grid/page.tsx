import Link from "next/link";
import styles from "./page.module.css";
import clsx from "clsx";
export type Column = {
  id: string;
  name: string;
  renderAs: "Hyperlink" | "Chip" | "Text";
  href?: string;
};

export default function DataGrid({
  columns,
  data,
}: {
  columns: Column[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
}) {
  return (
    <table className={styles.grid}>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.id}>{column.name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data?.length === 0 ? (
          <tr>
            <td colSpan={columns.length}>
              <div className={styles.noData}>
                <p className={styles.noDataText}>No expenses to show yet!</p>
              </div>
            </td>
          </tr>
        ) : (
          data.map((row, idx) => (
            <tr key={idx}>
              {columns.map((column) => (
                <td key={column.id}>
                  {column.renderAs === "Text" && row[column.id]}
                  {column.renderAs === "Hyperlink" && (
                    <Link
                      href={column?.href ? `${column.href}/${row.id}` : "#"}
                    >
                      <span className={styles.link}>{row[column.id]}</span>
                    </Link>
                  )}
                  {column.renderAs === "Chip" && (
                    <span
                      className={clsx(
                        styles.chip,
                        styles[
                          row[column.id].toLowerCase().replace(/\s+/g, "-")
                        ]
                      )}
                    >
                      {row[column.id]}
                    </span>
                  )}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
