"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { redirect } from "next/navigation";

export default function LogsLayout({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();

  if (status === "loading") return null;
  if (!session) redirect("/login");

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 p-4">
        <h1 className="text-xl font-bold mb-6">LogSnap</h1>

        <nav className="space-y-2">
          <Link className="block rounded px-3 py-2 hover:bg-white/10" href="/logs">
            Dashboard
          </Link>
          <Link className="block rounded px-3 py-2 hover:bg-white/10" href="/logs/logs">
            Logs
          </Link>
          <Link className="block rounded px-3 py-2 hover:bg-white/10" href="/logs/ingest">
            Ingest
          </Link>
        </nav>

        <div className="mt-auto pt-6">
          <p className="text-sm text-white/60">{session.user?.email}</p>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="mt-2 w-full rounded bg-white/10 py-2 hover:bg-white/20"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
