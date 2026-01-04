/**
 * @file toast.component.tsx
 * @fileoverview This defines the toast component of the application.
 */

import React from "react";
import "./toast.component.css";

/**
 * Toast message types.
 */
export type ToastType = "info" | "success" | "warning" | "error";

/**
 * Toast message type.
 */
export type ToastMessage = {
  toastType: ToastType;
  message: string;
};

export type ToastMessageProps = {
  toastType: ToastType;
  message: string;
  onClose: () => void;
};

/**
 * A toast component that displays a message with a given type and
 * allows the user to close the toast by clicking on the close
 * button.
 *
 * @param {ToastType} [toastType="info"] - The type of the toast.
 * @param {string} message - The message to display in the toast.
 * @param {() => void} onClose - A callback function to call when the
 *   toast is closed.
 * @returns {React.ReactElement} The rendered React element.
 */
const Toast: React.FC<ToastMessageProps> = ({ toastType = "info", message, onClose }) => {
  return (
    <div className={`toast toast--${toastType}`}>
      <span>{message}</span>
      <button className="toast-close" onClick={onClose}>
        ×
      </button>
    </div>
  );
};

export default Toast;
