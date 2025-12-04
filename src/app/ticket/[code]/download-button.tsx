"use client";

import { useState, useRef } from "react";
import { Download, Loader2 } from "lucide-react";
import { toast } from "sonner";
import QRCode from "qrcode";

interface DownloadTicketButtonProps {
  eventTitle: string;
  eventDate: string;
  eventTime: string | null;
  eventLocation: string | null;
  attendeeName: string;
  qrCode: string;
}

export function DownloadTicketButton({
  eventTitle,
  eventDate,
  eventTime,
  eventLocation,
  attendeeName,
  qrCode,
}: DownloadTicketButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleDownload = async () => {
    setIsGenerating(true);

    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas not supported");

      // Set canvas size
      canvas.width = 400;
      canvas.height = 580;

      // Background with subtle pattern
      ctx.fillStyle = "#fafafa";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Main card background
      ctx.fillStyle = "#ffffff";
      roundRect(ctx, 16, 16, canvas.width - 32, canvas.height - 32, 16);
      ctx.fill();

      // Card shadow effect
      ctx.shadowColor = "rgba(0, 0, 0, 0.1)";
      ctx.shadowBlur = 20;
      ctx.shadowOffsetY = 4;

      // Header gradient
      ctx.shadowColor = "transparent";
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      gradient.addColorStop(0, "#0d9488");
      gradient.addColorStop(1, "#14b8a6");
      ctx.fillStyle = gradient;
      roundRectTop(ctx, 16, 16, canvas.width - 32, 130, 16);
      ctx.fill();

      // Tixora logo text
      ctx.fillStyle = "rgba(255,255,255,0.3)";
      ctx.font = "bold 12px Arial, sans-serif";
      ctx.textAlign = "left";
      ctx.fillText("TIXORA", 32, 40);

      // Event title
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 18px Arial, sans-serif";
      ctx.textAlign = "center";
      const titleLines = wrapText(ctx, eventTitle, canvas.width - 60);
      let y = 75;
      titleLines.forEach(line => {
        ctx.fillText(line, canvas.width / 2, y);
        y += 22;
      });

      // Date & Time in header
      ctx.font = "13px Arial, sans-serif";
      ctx.fillStyle = "rgba(255,255,255,0.9)";
      const timeStr = eventTime ? ` • ${eventTime.split(':').slice(0, 2).join(':')} WIB` : '';
      ctx.fillText(`${eventDate}${timeStr}`, canvas.width / 2, 125);

      // Ticket cutout circles
      ctx.fillStyle = "#fafafa";
      ctx.beginPath();
      ctx.arc(16, 160, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(canvas.width - 16, 160, 12, 0, Math.PI * 2);
      ctx.fill();

      // Dashed separator
      ctx.setLineDash([6, 4]);
      ctx.strokeStyle = "#e5e5e5";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(40, 160);
      ctx.lineTo(canvas.width - 40, 160);
      ctx.stroke();
      ctx.setLineDash([]);

      // Attendee section
      ctx.fillStyle = "#a1a1aa";
      ctx.font = "11px Arial, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("PESERTA", canvas.width / 2, 195);
      
      ctx.fillStyle = "#18181b";
      ctx.font = "bold 20px Arial, sans-serif";
      ctx.fillText(attendeeName, canvas.width / 2, 222);

      // Generate QR Code
      const qrDataUrl = await QRCode.toDataURL(qrCode, {
        width: 160,
        margin: 0,
        color: { dark: "#18181b", light: "#ffffff" },
      });

      const qrImage = new Image();
      qrImage.src = qrDataUrl;
      await new Promise((resolve) => {
        qrImage.onload = resolve;
      });

      // QR Code background
      ctx.fillStyle = "#f4f4f5";
      roundRect(ctx, (canvas.width - 180) / 2, 245, 180, 180, 12);
      ctx.fill();

      // Draw QR Code
      const qrSize = 160;
      const qrX = (canvas.width - qrSize) / 2;
      ctx.drawImage(qrImage, qrX, 255, qrSize, qrSize);

      // Ticket code
      ctx.fillStyle = "#a1a1aa";
      ctx.font = "11px Arial, sans-serif";
      ctx.fillText("KODE TIKET", canvas.width / 2, 455);
      
      ctx.fillStyle = "#18181b";
      ctx.font = "bold 13px monospace";
      ctx.fillText(qrCode, canvas.width / 2, 475);

      // Location if exists
      if (eventLocation) {
        ctx.fillStyle = "#71717a";
        ctx.font = "12px Arial, sans-serif";
        ctx.fillText(eventLocation, canvas.width / 2, 505);
      }

      // Footer branding
      ctx.fillStyle = "#0d9488";
      ctx.font = "bold 11px Arial, sans-serif";
      ctx.fillText("Powered by Tixora", canvas.width / 2, canvas.height - 35);

      // Download
      const link = document.createElement("a");
      link.download = `tiket-${qrCode.toLowerCase()}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();

      toast.success("Tiket berhasil didownload");
    } catch (error) {
      console.error(error);
      toast.error("Gagal download tiket");
    }

    setIsGenerating(false);
  };

  return (
    <>
      <canvas ref={canvasRef} className="hidden" />
      <button
        onClick={handleDownload}
        disabled={isGenerating}
        className="w-full py-3 bg-gradient-to-r from-accent to-teal-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-accent/25 hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isGenerating ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Membuat tiket...
          </>
        ) : (
          <>
            <Download className="w-4 h-4" />
            Download Tiket
          </>
        )}
      </button>
    </>
  );
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let currentLine = "";

  words.forEach((word) => {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  });
  if (currentLine) lines.push(currentLine);
  return lines;
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function roundRectTop(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h);
  ctx.lineTo(x, y + h);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}
