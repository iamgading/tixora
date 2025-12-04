"use client";

import { useState, useMemo } from "react";
import { Search, Download, Check, Users, Filter, X } from "lucide-react";
import { toast } from "sonner";
import type { Registration } from "@/lib/types/database";
import { Pagination } from "@/components/ui/pagination";

interface RegistrationsTableProps {
  registrations: Registration[];
  eventTitle: string;
}

type FilterStatus = "all" | "checked_in" | "not_checked_in";
const ITEMS_PER_PAGE = 10;

export function RegistrationsTable({ registrations, eventTitle }: RegistrationsTableProps) {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredRegistrations = useMemo(() => {
    return registrations.filter((reg) => {
      // Search filter
      const searchLower = search.toLowerCase();
      const matchesSearch = 
        reg.name.toLowerCase().includes(searchLower) ||
        reg.email.toLowerCase().includes(searchLower) ||
        (reg.phone && reg.phone.includes(search));

      // Status filter
      const matchesStatus = 
        filterStatus === "all" ||
        (filterStatus === "checked_in" && reg.checked_in_at) ||
        (filterStatus === "not_checked_in" && !reg.checked_in_at);

      return matchesSearch && matchesStatus;
    });
  }, [registrations, search, filterStatus]);

  // Reset to page 1 when filters change
  const totalPages = Math.ceil(filteredRegistrations.length / ITEMS_PER_PAGE);
  const paginatedRegistrations = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredRegistrations.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredRegistrations, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const exportToCSV = () => {
    if (filteredRegistrations.length === 0) {
      toast.error("Tidak ada data untuk diexport");
      return;
    }

    const headers = ["Nama", "Email", "Telepon", "Status", "Waktu Daftar", "Waktu Check-in"];
    const rows = filteredRegistrations.map((reg) => [
      reg.name,
      reg.email,
      reg.phone || "-",
      reg.checked_in_at ? "Checked-in" : "Belum hadir",
      new Date(reg.created_at).toLocaleString("id-ID"),
      reg.checked_in_at ? new Date(reg.checked_in_at).toLocaleString("id-ID") : "-",
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `peserta-${eventTitle.toLowerCase().replace(/\s+/g, "-")}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast.success(`${filteredRegistrations.length} data berhasil diexport`);
  };

  const clearFilters = () => {
    setSearch("");
    setFilterStatus("all");
    setCurrentPage(1);
  };

  const hasActiveFilters = search || filterStatus !== "all";

  return (
    <div className="bg-surface rounded-2xl border border-border">
      {/* Header with Search, Filter, Export */}
      <div className="px-6 py-4 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="font-semibold text-foreground">
            Daftar Peserta
            {hasActiveFilters && (
              <span className="ml-2 text-sm font-normal text-muted">
                ({filteredRegistrations.length} dari {registrations.length})
              </span>
            )}
          </h2>
          
          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <input
                type="text"
                placeholder="Cari nama, email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2 w-48 sm:w-56 text-sm border border-border rounded-xl bg-background text-foreground placeholder:text-muted focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
              />
            </div>

            {/* Filter Dropdown */}
            <div className="relative">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as FilterStatus)}
                className="appearance-none pl-9 pr-8 py-2 text-sm border border-border rounded-xl bg-background text-foreground focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all cursor-pointer"
              >
                <option value="all">Semua</option>
                <option value="checked_in">Sudah Check-in</option>
                <option value="not_checked_in">Belum Hadir</option>
              </select>
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="p-2 text-muted hover:text-foreground hover:bg-surface-hover rounded-xl transition-colors"
                title="Clear filters"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            {/* Export Button */}
            <button
              onClick={exportToCSV}
              disabled={registrations.length === 0}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-accent text-white font-medium rounded-xl hover:bg-accent-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Table */}
      {registrations.length === 0 ? (
        <div className="p-12 text-center">
          <div className="w-16 h-16 bg-surface-hover rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-muted" />
          </div>
          <h3 className="font-medium text-foreground mb-2">Belum ada pendaftar</h3>
          <p className="text-sm text-muted">Bagikan link event untuk mendapatkan pendaftar</p>
        </div>
      ) : filteredRegistrations.length === 0 ? (
        <div className="p-12 text-center">
          <div className="w-16 h-16 bg-surface-hover rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-muted" />
          </div>
          <h3 className="font-medium text-foreground mb-2">Tidak ditemukan</h3>
          <p className="text-sm text-muted">Coba ubah kata kunci atau filter</p>
          <button
            onClick={clearFilters}
            className="mt-4 text-sm text-accent hover:underline"
          >
            Reset filter
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-surface-hover text-left text-sm text-muted">
              <tr>
                <th className="px-6 py-3 font-medium">Nama</th>
                <th className="px-6 py-3 font-medium">Email</th>
                <th className="px-6 py-3 font-medium">Telepon</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Waktu Daftar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {paginatedRegistrations.map((reg) => (
                <tr key={reg.id} className="hover:bg-surface-hover transition-colors">
                  <td className="px-6 py-4 font-medium text-foreground">{reg.name}</td>
                  <td className="px-6 py-4 text-muted">{reg.email}</td>
                  <td className="px-6 py-4 text-muted">{reg.phone || "-"}</td>
                  <td className="px-6 py-4">
                    {reg.checked_in_at ? (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-400 text-xs font-medium rounded-full">
                        <Check className="w-3 h-3" />
                        Checked-in
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-xs font-medium rounded-full">
                        Belum hadir
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted">
                    {new Date(reg.created_at).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {filteredRegistrations.length > ITEMS_PER_PAGE && (
        <div className="px-6 py-4 border-t border-border">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted">
              Menampilkan {((currentPage - 1) * ITEMS_PER_PAGE) + 1}-{Math.min(currentPage * ITEMS_PER_PAGE, filteredRegistrations.length)} dari {filteredRegistrations.length}
            </p>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      )}
    </div>
  );
}
