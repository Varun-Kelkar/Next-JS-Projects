"use client";

import React, { useRef } from "react";
import styles from "./file-uploader.module.css"; // Your custom styles if needed

interface FileUploaderProps {
  id: string;
  name: string;
  label?: string;
  accept?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: (event: React.MouseEvent<HTMLButtonElement>) => void;
  selectedFile: File | null;
}

export default function FileUploader({
  id,
  name,
  label = "Upload File",
  accept = "image/jpg,image/jpeg,image/png,application/pdf",
  onChange,
  onClear,
  selectedFile,
}: FileUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    e.preventDefault(); // prevent default button behavior
    e.stopPropagation(); // stop event from bubbling up
    fileInputRef.current?.click(); // manually trigger input click
  };
  return (
    <div className={styles.field}>
      <label>{label}</label>
      <input
        type="file"
        id={id}
        name={name}
        accept={accept}
        onChange={(event) => onChange(event)}
        // className={styles.input}
        ref={fileInputRef}
        className={styles.hiddenInput}
      />
      <button onClick={handleButtonClick} className={styles.selectBtn}>
        {selectedFile ? "Change File" : "Select File"}
      </button>

      {selectedFile && (
        <div className={styles.fileInfo}>
          <span className={styles.fileName}>{selectedFile.name}</span>
          <button onClick={onClear} className={styles.resetBtn}>
            Remove
          </button>
        </div>
      )}
    </div>
  );
}
