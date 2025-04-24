"use client";
import { useActionState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import styles from "./page.module.css";
import { uploadBillAction } from "@/lib/actions";
import Link from "next/link";
import { useUser } from "@/context/user-context";
import { useFileUpload } from "@/components/file-uploader/useFileUploader";
import FileUploader from "@/components/file-uploader/file-uploader";

export default function BillUploadPreview() {
  const { expenseid } = useParams();
  const user = useUser();

  const [state, formAction] = useActionState(
    uploadBillAction.bind(
      null,
      expenseid as unknown as number,
      user.id as unknown as number
    ),
    { message: "" }
  );

  const { file, fileType, previewUrl, handleFileChange, clear } =
    useFileUpload();

  return (
    <main className={styles.page}>
      <section className={styles.left}>
        <h2>Upload Bill</h2>
        <form className={styles.form} action={formAction}>
          <div className={styles.field}>
            <label>Title</label>
            <input name="name" required className={styles.input} />
          </div>

          <div className={styles.field}>
            <label>Description</label>
            <input name="description" className={styles.input} />
          </div>
          <div className={styles.field}></div>
          <label>Amount</label>
          <input
            name="amount"
            type="number"
            required
            className={styles.input}
          />

          <div className={styles.field}>
            <label>Category</label>
            <select name="category" className={styles.input}>
              <option>Travel</option>
              <option>Food</option>
              <option>Office</option>
              <option>Other</option>
            </select>
          </div>

          <div className={styles.field}>
            <label>Date</label>
            <input type="date" name="date" required className={styles.input} />
          </div>

          <FileUploader
            id="url"
            name="url"
            label="Upload Bill"
            accept="image/jpg,image/jpeg,image/png,application/pdf"
            onChange={handleFileChange}
            onClear={clear}
            selectedFile={file}
          />
          {state?.message && <p>{state.message}</p>}
          <div
            style={{ display: "flex", gap: "1rem", justifyContent: "flex-end" }}
          >
            <button type="submit">Upload</button>

            <Link
              href={`/expenses/${expenseid}`}
              style={{ textDecoration: "none" }}
            >
              <button className={styles.secondaryButton}>Cancel</button>
            </Link>
          </div>
        </form>
      </section>
      <section className={styles.right}>
        <h2>Preview</h2>
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
      </section>
    </main>
  );
}
