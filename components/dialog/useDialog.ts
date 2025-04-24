import { useState, useCallback } from "react";

export interface DialogControl {
  open: () => void;
  close: () => void;
  isOpen: boolean;
}

export function useDialog(): DialogControl {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return { open, close, isOpen };
}
