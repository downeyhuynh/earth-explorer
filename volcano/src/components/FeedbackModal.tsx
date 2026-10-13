import type { ReactNode } from "react";
import { Modal } from "./Modal";

interface FeedbackModalProps {
  title: string;
  onClose: () => void;
  closeLabel?: string;
  children: ReactNode;
}

export function FeedbackModal({ title, onClose, closeLabel = "Continue", children }: FeedbackModalProps) {
  return (
    <Modal title={title} onClose={onClose}>
      {children}
      <button type="button" className="primary" onClick={onClose}>{closeLabel}</button>
    </Modal>
  );
}
