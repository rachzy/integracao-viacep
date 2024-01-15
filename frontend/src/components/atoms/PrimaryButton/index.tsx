"use client";

import { useState } from "react";
import { CircularProgress } from "@mui/material";

export interface IProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void |Promise<void>;
}

export default function PrimaryButton({
  children,
  onClick,
  className,
}: IProps) {
  const [loading, setLoading] = useState(false);

  async function handleButtonClick() {
    setLoading(true);

    if (!onClick) return;
    await onClick();
    setLoading(false);
  }

  return (
    <button
      onClick={handleButtonClick}
      type="submit"
      className={`w-100 btn btn-primary d-inline-flex justify-content-center align-items-center ${className}`}
    >
      {loading ? (
        <CircularProgress size={24} style={{ color: "white" }} />
      ) : (
        children
      )}
    </button>
  );
}
