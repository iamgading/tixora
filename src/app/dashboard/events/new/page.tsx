import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CreateEventForm } from "./create-form";

export default function NewEventPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <Link 
          href="/dashboard" 
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Dashboard
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Buat Event Baru</h1>
        <p className="text-muted">Isi detail event yang akan kamu buat</p>
      </div>

      <div className="bg-surface rounded-2xl border border-border p-6 lg:p-8">
        <CreateEventForm />
      </div>
    </div>
  );
}
