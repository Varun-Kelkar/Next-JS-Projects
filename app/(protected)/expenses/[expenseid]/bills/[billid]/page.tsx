/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { redirect, useParams } from "next/navigation";
import { getBillByIdAction, updateBillByIdAction } from "@/lib/actions";
import PageHeader from "@/components/page-header/page-header";
import FileUploader from "@/components/file-uploader/file-uploader";
import { useFileUpload } from "@/components/file-uploader/useFileUploader";
import styles from "./page.module.css";
import "@/app/globals.css";

export type Bill = {
  id?: number;
  name?: string;
  amount?: string;
  category?: string;
  status?: string;
  date?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  url?: any;
  user_id?: number;
  expense_id?: number;
};
export default function BillDetailPage() {
  const { expenseid, billid } = useParams();
  const {
    file,
    fileType,
    previewUrl,
    handleFileChange,
    handleSetFileType,
    handleSetPreviewUrl,
    clear,
  } = useFileUpload();

  const [billDetails, setBillDetails] = useState<Bill>({
    name: "",
    amount: "",
    category: "",
    date: "",
    url: "",
  });
  const [isdisabled, setIsdisabled] = useState(true);

  const loadBillDetails = async () => {
    const billDetails = await getBillByIdAction(Number(billid));
    setBillDetails(billDetails as Bill);
    handleSetPreviewUrl((billDetails as Bill)?.url as string);
    handleSetFileType((billDetails as Bill)?.url?.split(".").pop() as string);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setBillDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await updateBillByIdAction(Number(billid), {
      ...(billDetails as Bill),
      url: file ?? previewUrl,
    });
    redirect(`/expenses/${expenseid}`);
  };

  const enableEditMode = () => {
    setIsdisabled(false);
  };

  useEffect(() => {
    loadBillDetails();
  }, []);

  return (
    <main>
      <PageHeader
        title="Bill Details"
        actions={[{ label: "Edit Bill", onClickCallback: enableEditMode }]}
      />

      <section className={styles.container}>
        {/* Left: Form */}
        <div className={styles.left}>
          <h3>Upload Bill</h3>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.field}>
              <label>Title</label>
              <input
                name="name"
                required
                className={styles.input}
                disabled={isdisabled}
                onChange={handleChange}
                value={billDetails?.name}
              />
            </div>

            <div className={styles.field}></div>
            <label>Amount</label>
            <input
              name="amount"
              type="number"
              required
              className={styles.input}
              disabled={isdisabled}
              value={billDetails?.amount}
              onChange={handleChange}
            />

            <div className={styles.field}>
              <label>Category</label>
              <select
                name="category"
                className={styles.input}
                disabled={isdisabled}
                value={billDetails?.category}
                onChange={handleChange}
              >
                <option>Travel</option>
                <option>Food</option>
                <option>Office</option>
                <option>Other</option>
              </select>
            </div>

            <div className={styles.field}>
              <label>Date</label>
              <input
                type="date"
                name="date"
                required
                className={styles.input}
                disabled={isdisabled}
                value={billDetails?.date}
                onChange={handleChange}
              />
            </div>

            {!isdisabled && (
              <FileUploader
                id="url"
                name="url"
                label="Upload Bill"
                accept="image/jpg,image/jpeg,image/png,application/pdf"
                onChange={handleFileChange}
                selectedFile={file}
                onClear={clear}
              />
              // <div className={styles.field}>
              //   <label>Upload Bill</label>
              //   <input
              //     id="url"
              //     type="file"
              //     ref={fileRef}
              //     name="url"
              //     accept="image/jpg,image/jpeg,image/png,application/pdf"
              //     onChange={handleFileChange}
              //     className={styles.input}
              //     disabled={isdisabled}
              //   />
              // </div>
            )}

            {/* {state?.message && <p>{state.message}</p>} */}
            <div
              style={{
                display: "flex",
                gap: "1rem",
                justifyContent: "flex-end",
              }}
            >
              <button type="submit">Save</button>

              <Link
                href={`/expenses/${expenseid}`}
                style={{ textDecoration: "none" }}
              >
                <button className={styles.secondaryButton}>Cancel</button>
              </Link>
            </div>
          </form>
        </div>

        {/* Right: Preview */}
        <div className={styles.right}>
          <h3>Preview</h3>
          {previewUrl ? (
            fileType === "pdf" || fileType === "application/pdf" ? (
              <iframe
                src={previewUrl}
                className={styles.previewFrame}
                style={{ height: "100%" }}
              />
            ) : (
              <Image
                src={previewUrl}
                alt="Bill Preview"
                width={500}
                height={600}
                className={styles.previewImage}
              />
            )
          ) : (
            <p>No file uploaded</p>
          )}
        </div>
      </section>
    </main>
  );
}
