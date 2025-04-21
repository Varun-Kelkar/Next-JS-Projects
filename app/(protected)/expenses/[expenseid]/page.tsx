// "use client";
import styles from "./page.module.css";

import Link from "next/link";
import DataGrid, { Column } from "@/components/data-grid/page";
import DetailsView from "@/components/detail-view/page";
import { getBillsByExpenseIdAction } from "@/lib/actions";

const mockDetails = [
  { label: "Title", value: "Business Lunch" },
  { label: "Amount", value: "$120" },
  { label: "Category", value: "Food" },
  { label: "Date", value: "2025-04-19" },
];

type PageProps = {
  params: { [key: string]: string }; // Or more specific if you know the params
  searchParams: { [key: string]: string | string[] | undefined };
};
export default async function ExpenseDetails({ params }: PageProps) {
  const { expenseid } = await params;

  const expenseColumns: Array<Column> = [
    {
      id: "name",
      name: "Name",
      renderAs: "Hyperlink",
      href: `/expenses/${expenseid}/bills`,
    },
    {
      id: "amount",
      name: "Amount",
      renderAs: "Text",
    },
    {
      id: "category",
      name: "Category",
      renderAs: "Text",
    },
    {
      id: "status",
      name: "Status",
      renderAs: "Chip",
    },
    {
      id: "date",
      name: "Date",
      renderAs: "Text",
    },

    // Add more mock data
  ];

  const bills = await getBillsByExpenseIdAction(Number(expenseid));

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h2>Expense Details for {expenseid}</h2>
      </div>
      <div>
        <DetailsView details={mockDetails} />
      </div>
      <div className={styles.header}>
        <h2>Bills</h2>
        <Link
          href={`/expenses/${expenseid}/upload-bill`}
          style={{ textDecoration: "none" }}
        >
          <button className={styles.button}>Upload Bill</button>
        </Link>
      </div>

      <DataGrid columns={expenseColumns} data={bills} />
    </div>
  );
}
