"use client";
import React, { useEffect, useRef, useState } from "react";
import { createExpenseAction, getAllExpensesAction } from "@/lib/actions";
import styles from "./page.module.css";
import CustomDialog from "../../../components/dialog/dialog";
import { redirect } from "next/navigation";
import { useUser } from "@/context/user-context";
import DataGrid, { Column } from "@/components/data-grid/page";

const expenseColumns: Array<Column> = [
  {
    id: "name",
    name: "Name",
    renderAs: "Hyperlink",
    href: "/expenses/",
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

export default function ExpensesPage() {
  const [open, setOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [expenses, setExpenses] = useState<Array<any>>([]);
  const formRef = useRef(null);
  const user = useUser();

  const handleSubmit = async () => {
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const data = Object.fromEntries(formData.entries());
      console.log("Form Data:", data);
      createExpenseAction(data, user.id);
      redirect("/bills");
    }
    setOpen(false);
  };

  const loadExpenses = async () => {
    const expenses = await getAllExpensesAction(user.id);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expenses.forEach((expense: any) => {
      expense.date = new Date(expense.date).toLocaleDateString();
    });
    setExpenses(expenses);
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h2>Expenses</h2>
        <button onClick={() => setOpen(true)}>Create Expense</button>
      </div>

      <div>
        <CustomDialog
          open={open}
          title="Create Expense"
          content={
            <form ref={formRef} className={styles.form}>
              <div className={styles.field}>
                <label htmlFor="title">Name</label>
                <input
                  className={styles.input}
                  type="text"
                  id="name"
                  name="name"
                  required
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="description">Amount</label>
                <input
                  className={styles.input}
                  id="amount"
                  name="amount"
                  required
                />
              </div>

              <div className={styles.field}>
                <label>Category</label>
                <select name="category" className={styles.input}>
                  <option>Travel</option>
                  <option>Food</option>
                  <option>Office</option>
                  <option>Other</option>
                </select>
              </div>
            </form>
          }
          onClose={() => setOpen(false)}
          actions={[
            { label: "Cancel", onClick: () => setOpen(false) },
            {
              label: "Create",
              onClick: handleSubmit,
            },
          ]}
        />
      </div>

      <DataGrid columns={expenseColumns} data={expenses} />
    </div>
  );
}
