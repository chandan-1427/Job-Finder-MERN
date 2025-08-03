import React from "react";

export default function FeedbackMessage({ type = "error", message }) {
  if (!message) return null;
  const styles = type === "error" ? "text-red-600" : "text-green-600";

  return (
    <p className={`text-sm text-center mb-2 ${styles}`}>
      {message}
    </p>
  );
}
