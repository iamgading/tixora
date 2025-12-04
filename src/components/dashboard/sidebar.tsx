"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Calendar, 
  LogOut,
  Menu,
  X,
  BarChart3,
  Home,
} from "lucide-react";
import { ThemeToggleMinimal } from "@/components/ui/theme-toggle";

interface SidebarProps {
  user: {
    fullName: string | null;
    email: string;
  };
  logoutAction: () => Promise<void>;
}

export function Sidebar({ user, logoutAction }: SidebarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/dashboard/analytics", icon: BarChart3, label: "Analytics" },
    { href: "/dashboard/events", icon: Calendar, label: "Kelola Event" },
  ];

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname.startsWith(href);
  };

  const userInitial = (user.fullName || user.email || "U").charAt(0).toUpperCase();

  return (
    <>
      {/* Mobile Header - Full Width Navbar */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-surface/95 backdrop-blur-md border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-accent via-teal-400 to-emerald-500 rounded-lg flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)]" />
              <span className="text-white font-black text-base tracking-tighter">tx</span>
            </div>
            <span className="text-lg font-bold text-foreground">Tixora</span>
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggleMinimal />
            <button 
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="p-2.5 text-muted hover:text-foreground hover:bg-surface-hover rounded-xl transition-colors"
            >
              {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileOpen && (
          <div className="absolute top-full left-0 right-0 bg-surface border-b border-border shadow-xl">
            <div className="p-4 space-y-2">
              {/* User Info */}
              <div className="flex items-center gap-3 p-3 bg-surface-hover rounded-xl mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-accent to-teal-500 rounded-full flex items-center justify-center text-white font-bold">
                  {userInitial}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {user.fullName || "Organizer"}
                  </p>
                  <p className="text-xs text-muted truncate">{user.email}</p>
                </div>
              </div>

              {/* Navigation Links */}
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
                      active 
                        ? 'bg-accent/10 text-accent' 
                        : 'text-foreground hover:bg-surface-hover'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                );
              })}

              {/* Divider */}
              <div className="border-t border-border my-2" />

              {/* Back to Home */}
              <Link
                href="/"
                onClick={() => setIsMobileOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-muted hover:text-foreground hover:bg-surface-hover rounded-xl transition-colors"
              >
                <Home className="w-5 h-5" />
                Kembali ke Beranda
              </Link>

              {/* Logout */}
              <form action={logoutAction}>
                <button
                  type="submit"
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/50 rounded-xl transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </form>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Overlay for closing */}
      {isMobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-40 bg-black/20"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed inset-y-0 left-0 z-40 w-64 bg-surface border-r border-border flex-col p-4">
        {/* Desktop Logo with Theme Toggle */}
        <div className="flex items-center justify-between mb-6 px-3">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-gradient-to-br from-accent via-teal-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-accent/20 relative overflow-hidden group-hover:shadow-accent/40 transition-shadow">
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)]" />
              <span className="text-white font-black text-lg tracking-tighter">tx</span>
            </div>
            <span className="text-xl font-bold text-foreground">Tixora</span>
          </Link>
          <ThemeToggleMinimal />
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-all ${
                  active 
                    ? 'bg-accent/10 text-accent' 
                    : 'text-muted hover:text-foreground hover:bg-surface-hover'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User Section */}
        <div className="border-t border-border pt-4 mt-4 space-y-2">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-9 h-9 bg-gradient-to-br from-accent to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
              {userInitial}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {user.fullName || "Organizer"}
              </p>
              <p className="text-xs text-muted truncate">{user.email}</p>
            </div>
          </div>
          <Link
            href="/"
            className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-muted hover:text-foreground hover:bg-surface-hover rounded-lg transition-colors"
          >
            <Home className="w-5 h-5" />
            Kembali ke Beranda
          </Link>
          <form action={logoutAction}>
            <button
              type="submit"
              className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-muted hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/50 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
