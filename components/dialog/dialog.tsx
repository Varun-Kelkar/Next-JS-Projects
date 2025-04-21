import React from "react";
import styles from "./dialog.module.css";

interface CustomDialogProps {
  open: boolean;
  title: string;
  content: React.ReactNode;
  actions?: { label: string; onClick: () => void }[];
  onClose: () => void;
}

export default function CustomDialog({
  open,
  title,
  content,
  actions = [],
  onClose,
}: CustomDialogProps) {
  if (!open) return null;

  return (
    <div className={styles.backdrop}>
      <div className={styles.dialog}>
        <div className={styles.header}>
          <h3>{title}</h3>
          <button className={styles.closeBtn} onClick={onClose}>
            ×
          </button>
        </div>
        <div className={styles.content}>{content}</div>
        <div className={styles.actions}>
          {actions.map((action, index) => (
            <button
              key={index}
              className={styles.actionButton}
              onClick={action.onClick}
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
