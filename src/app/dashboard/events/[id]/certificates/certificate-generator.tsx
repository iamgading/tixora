"use client";

import { useState, useRef } from "react";
import { Download, Loader2, Eye } from "lucide-react";
import { toast } from "sonner";
import type { Event, Registration } from "@/lib/types/database";

interface CertificateGeneratorProps {
  event: Event;
  attendees: Registration[];
}

export function CertificateGenerator({ event, attendees }: CertificateGeneratorProps) {
  const [selectedAttendee, setSelectedAttendee] = useState<Registration | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateCertificate = async (attendee: Registration) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size (A4 landscape)
    canvas.width = 1123;
    canvas.height = 794;

    // Background gradient
    const bgGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    bgGradient.addColorStop(0, "#f8fafc");
    bgGradient.addColorStop(1, "#f1f5f9");
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Decorative corner elements
    ctx.fillStyle = "#0d9488";
    // Top left corner
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(120, 0);
    ctx.lineTo(0, 120);
    ctx.closePath();
    ctx.fill();
    // Top right corner
    ctx.beginPath();
    ctx.moveTo(canvas.width, 0);
    ctx.lineTo(canvas.width - 120, 0);
    ctx.lineTo(canvas.width, 120);
    ctx.closePath();
    ctx.fill();
    // Bottom left corner
    ctx.beginPath();
    ctx.moveTo(0, canvas.height);
    ctx.lineTo(120, canvas.height);
    ctx.lineTo(0, canvas.height - 120);
    ctx.closePath();
    ctx.fill();
    // Bottom right corner
    ctx.beginPath();
    ctx.moveTo(canvas.width, canvas.height);
    ctx.lineTo(canvas.width - 120, canvas.height);
    ctx.lineTo(canvas.width, canvas.height - 120);
    ctx.closePath();
    ctx.fill();

    // Main content area with subtle border
    ctx.strokeStyle = "#e2e8f0";
    ctx.lineWidth = 2;
    ctx.strokeRect(60, 60, canvas.width - 120, canvas.height - 120);

    // Inner decorative line
    ctx.strokeStyle = "#0d9488";
    ctx.lineWidth = 1;
    ctx.setLineDash([8, 4]);
    ctx.strokeRect(75, 75, canvas.width - 150, canvas.height - 150);
    ctx.setLineDash([]);

    // Award icon circle
    ctx.beginPath();
    ctx.arc(canvas.width / 2, 130, 45, 0, Math.PI * 2);
    const iconGradient = ctx.createLinearGradient(canvas.width / 2 - 45, 85, canvas.width / 2 + 45, 175);
    iconGradient.addColorStop(0, "#0d9488");
    iconGradient.addColorStop(1, "#14b8a6");
    ctx.fillStyle = iconGradient;
    ctx.fill();

    // Star icon in circle
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 40px Arial";
    ctx.textAlign = "center";
    ctx.fillText("★", canvas.width / 2, 145);

    // Certificate title
    ctx.fillStyle = "#0f172a";
    ctx.font = "bold 52px Georgia, serif";
    ctx.textAlign = "center";
    ctx.fillText("SERTIFIKAT", canvas.width / 2, 230);

    // Subtitle with decorative lines
    ctx.fillStyle = "#64748b";
    ctx.font = "18px Arial, sans-serif";
    ctx.fillText("— Penghargaan Partisipasi —", canvas.width / 2, 270);

    // "Diberikan kepada" text
    ctx.fillStyle = "#64748b";
    ctx.font = "16px Arial, sans-serif";
    ctx.fillText("Dengan bangga diberikan kepada", canvas.width / 2, 330);

    // Attendee name with underline effect
    ctx.fillStyle = "#0f172a";
    ctx.font = "bold 44px Georgia, serif";
    ctx.fillText(attendee.name, canvas.width / 2, 400);

    // Decorative line under name
    const nameWidth = ctx.measureText(attendee.name).width;
    const lineGradient = ctx.createLinearGradient(
      canvas.width / 2 - nameWidth / 2 - 40, 0,
      canvas.width / 2 + nameWidth / 2 + 40, 0
    );
    lineGradient.addColorStop(0, "transparent");
    lineGradient.addColorStop(0.2, "#0d9488");
    lineGradient.addColorStop(0.8, "#0d9488");
    lineGradient.addColorStop(1, "transparent");
    ctx.strokeStyle = lineGradient;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2 - nameWidth / 2 - 40, 420);
    ctx.lineTo(canvas.width / 2 + nameWidth / 2 + 40, 420);
    ctx.stroke();

    // Participation text
    ctx.fillStyle = "#64748b";
    ctx.font = "16px Arial, sans-serif";
    ctx.fillText("Atas partisipasi dan kehadiran dalam acara", canvas.width / 2, 480);

    // Event name
    ctx.fillStyle = "#0d9488";
    ctx.font = "bold 28px Arial, sans-serif";
    ctx.fillText(event.title, canvas.width / 2, 530);

    // Date and location
    const eventDate = new Date(event.event_date).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    ctx.fillStyle = "#64748b";
    ctx.font = "15px Arial, sans-serif";
    const locationText = event.location ? ` • ${event.location}` : "";
    ctx.fillText(`${eventDate}${locationText}`, canvas.width / 2, 570);

    // Signature area
    ctx.strokeStyle = "#cbd5e1";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2 - 100, 670);
    ctx.lineTo(canvas.width / 2 + 100, 670);
    ctx.stroke();
    
    ctx.fillStyle = "#64748b";
    ctx.font = "12px Arial, sans-serif";
    ctx.fillText("Penyelenggara", canvas.width / 2, 690);

    // Certificate ID
    ctx.fillStyle = "#94a3b8";
    ctx.font = "11px monospace";
    ctx.textAlign = "left";
    ctx.fillText(`No: ${attendee.qr_code}`, 90, canvas.height - 40);

    // Tixora branding
    ctx.textAlign = "right";
    ctx.fillStyle = "#0d9488";
    ctx.font = "bold 13px Arial, sans-serif";
    ctx.fillText("Powered by Tixora", canvas.width - 90, canvas.height - 40);

    return canvas.toDataURL("image/png");
  };

  const handlePreview = async (attendee: Registration) => {
    setSelectedAttendee(attendee);
    await generateCertificate(attendee);
  };

  const handleDownload = async (attendee: Registration) => {
    setIsGenerating(true);
    try {
      const dataUrl = await generateCertificate(attendee);
      if (dataUrl) {
        const link = document.createElement("a");
        link.download = `sertifikat-${attendee.name.toLowerCase().replace(/\s+/g, "-")}.png`;
        link.href = dataUrl;
        link.click();
        toast.success("Sertifikat berhasil didownload");
      }
    } catch {
      toast.error("Gagal membuat sertifikat");
    }
    setIsGenerating(false);
  };

  const handleDownloadAll = async () => {
    setIsGenerating(true);
    toast.info(`Membuat ${attendees.length} sertifikat...`);
    
    for (const attendee of attendees) {
      await handleDownload(attendee);
      await new Promise(resolve => setTimeout(resolve, 500)); // Delay between downloads
    }
    
    setIsGenerating(false);
    toast.success("Semua sertifikat berhasil didownload");
  };

  return (
    <div className="space-y-6">
      {/* Preview Canvas */}
      <div className="bg-surface rounded-2xl border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground">Preview Sertifikat</h3>
          <button
            onClick={handleDownloadAll}
            disabled={isGenerating}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-accent rounded-xl hover:bg-accent-dark transition-all disabled:opacity-50"
          >
            {isGenerating ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Download className="w-4 h-4" />
            )}
            Download Semua ({attendees.length})
          </button>
        </div>

        <div className="bg-zinc-100 dark:bg-zinc-900 rounded-xl p-4 overflow-auto">
          <canvas
            ref={canvasRef}
            className="mx-auto border border-border shadow-lg"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>

        {!selectedAttendee && (
          <p className="text-center text-sm text-muted mt-4">
            Klik &quot;Preview&quot; pada peserta untuk melihat sertifikat
          </p>
        )}
      </div>

      {/* Attendees List */}
      <div className="bg-surface rounded-2xl border border-border">
        <div className="px-6 py-4 border-b border-border">
          <h3 className="font-semibold text-foreground">
            Peserta Hadir ({attendees.length})
          </h3>
        </div>
        <div className="divide-y divide-border">
          {attendees.map((attendee) => (
            <div
              key={attendee.id}
              className="flex items-center justify-between px-6 py-4 hover:bg-surface-hover transition-colors"
            >
              <div>
                <p className="font-medium text-foreground">{attendee.name}</p>
                <p className="text-sm text-muted">{attendee.email}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePreview(attendee)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-muted hover:text-foreground hover:bg-surface-hover rounded-lg transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  Preview
                </button>
                <button
                  onClick={() => handleDownload(attendee)}
                  disabled={isGenerating}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-accent hover:bg-accent/10 rounded-lg transition-colors disabled:opacity-50"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
