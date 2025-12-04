"use client";

import { useEffect, useRef } from "react";
import QRCode from "qrcode";

export function QRCodeDisplay({ value }: { value: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, value, {
        width: 200,
        margin: 2,
        color: {
          dark: "#18181b",
          light: "#ffffff",
        },
      });
    }
  }, [value]);

  return (
    <div className="p-4 bg-white rounded-xl border border-border">
      <canvas ref={canvasRef} />
    </div>
  );
}
