"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useRef, useState } from "react";
import "@/app/globals.css";
// import { useParams } from "next/navigation";
import Link from "next/link";

export default function BillDetailPage() {
  // const { expenseid, billid } = useParams();
  const [previewUrl, setPreviewUrl] = useState("");
  const [fileType, setFileType] = useState("");
  const fileRef = useRef(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFileChange = (event: any) => {
    const file = event?.target?.files[0];
    if (!file) {
      setPreviewUrl("");
      return;
    }
    setFileType(file.type);
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  const [isReadOnly, setIsReadOnly] = useState(true);

  return (
    <main style={{ flex: 1, overflow: "scroll", padding: "1rem" }}>
      <section className={styles.header}>
        <h2>Bills</h2>

        <button
          onClick={() => {
            setIsReadOnly(false);
          }}
        >
          Edit Bill
        </button>
      </section>
      <section className={styles.container}>
        {/* Left: Form */}
        <div className={styles.left}>
          <h3>Upload Bill</h3>
          <form className={styles.form}>
            <div className={styles.field}>
              <label>Title</label>
              <input
                name="name"
                required
                className={styles.input}
                readOnly={isReadOnly}
              />
            </div>

            <div className={styles.field}>
              <label>Description</label>
              <input
                name="description"
                className={styles.input}
                readOnly={isReadOnly}
              />
            </div>
            <div className={styles.field}></div>
            <label>Amount</label>
            <input
              name="amount"
              type="number"
              required
              className={styles.input}
              readOnly={isReadOnly}
            />

            <div className={styles.field}>
              <label>Category</label>
              <select
                name="category"
                className={styles.input}
                disabled={isReadOnly}
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
                readOnly={isReadOnly}
              />
            </div>

            <div className={styles.field}>
              <label>Upload Bill</label>
              <input
                id="url"
                type="file"
                ref={fileRef}
                name="url"
                accept="image/jpg,image/jpeg,image/png,application/pdf"
                onChange={handleFileChange}
                className={styles.input}
                readOnly={isReadOnly}
              />
            </div>
            {/* {state?.message && <p>{state.message}</p>} */}
            <div
              style={{
                display: "flex",
                gap: "1rem",
                justifyContent: "flex-end",
              }}
            >
              <button type="submit" className={styles.button}>
                Save
              </button>

              <Link href="/bills" style={{ textDecoration: "none" }}>
                <button className={styles.button}>Cancel</button>
              </Link>
            </div>
          </form>
        </div>

        {/* Right: Preview */}
        <div className={styles.right}>
          <h3>Preview</h3>
          {previewUrl ? (
            fileType === "application/pdf" ? (
              <iframe src={previewUrl} className={styles.previewFrame} />
            ) : (
              <Image
                src={previewUrl}
                alt="Bill Preview"
                width={500}
                height={500}
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
