"use client";
import React, { useRef, useState } from "react";
import styles from "./page.module.css";
import CustomDialog from "@/components/dialog/dialog";
import { redirect } from "next/navigation";
import Link from "next/link";

export default function Bills() {
  const [open, setOpen] = useState(false);

  const formRef = useRef(null);

  const handleSubmit = () => {
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const data = Object.fromEntries(formData.entries());
      console.log("Form Data:", data);
    }
    setOpen(false);
    redirect("/upload-bill");
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h2>Bills</h2>
        <Link href="/upload-bill" style={{ textDecoration: "none" }}>
          <button>Upload Bill</button>
        </Link>
      </div>

      <div>
        <CustomDialog
          open={open}
          title="Create Expense"
          content={
            <form ref={formRef} className={styles.form}>
              <div className={styles.field}>
                <label htmlFor="title">Title</label>
                <input
                  className={styles.input}
                  type="text"
                  id="title"
                  name="title"
                  required
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="description">Description</label>
                <textarea
                  className={styles.textarea}
                  id="description"
                  name="description"
                  rows={5}
                  required
                />
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
    </div>
  );
}
