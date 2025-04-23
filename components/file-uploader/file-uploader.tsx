"use client";

import React from "react";
import styles from "./file-uploader.module.css"; // Your custom styles if needed

interface FileUploaderProps {
  id: string;
  name: string;
  label?: string;
  accept?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FileUploader({
  id,
  name,
  label = "Upload File",
  accept = "image/jpg,image/jpeg,image/png,application/pdf",
  onChange,
}: FileUploaderProps) {
  return (
    <div className={styles.field}>
      <label>{label}</label>
      <input
        type="file"
        id={id}
        name={name}
        accept={accept}
        onChange={onChange}
        className={styles.input}
      />
    </div>
  );
}
