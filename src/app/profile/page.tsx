"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { montserrat } from "@/app/fonts";
import { auth } from "@/utils/auth";
import ProfileSidebar from "@/components/Profile/ProfileSidebar";
import ProfileForm from "@/components/Profile/ProfileForm";

export default function ProfilePage() {
  const router = useRouter();

  const [user, setUser] = useState<{ name: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function fetchUser() {
      try {
        if (!auth.isAuthenticated()) {
          router.replace("/login");
          return;
        }

        const data = await auth.getUser();

        if (active) {
          setUser(data);
        }
      } catch {
        if (active) {
          setError("Unable to load your account information.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    fetchUser();

    return () => {
      active = false;
    };
  }, [router]);

  return (
    <main className="container mx-auto min-h-[70vh] px-4 pb-16 pt-6 sm:px-6 lg:px-8 lg:pb-24">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm">
        <Link
          href="/"
          className="text-neutral-500 transition-colors hover:text-[#DB4444]"
        >
          Home
        </Link>

        <span className="text-neutral-300">/</span>

        <span aria-current="page" className="font-medium text-neutral-900">
          My account
        </span>
      </nav>

      {/* Page heading */}
      <header className="flex flex-wrap items-end justify-between gap-6 border-b border-neutral-200 py-10 lg:py-14">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-[#DB4444]">
            Your account
          </span>

          <h1
            className={`${montserrat.className} mt-4 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl lg:text-5xl`}
          >
            Account settings.
          </h1>

          <p className="mt-3 text-sm leading-6 text-neutral-500">
            Manage your personal information and preferences.
          </p>
        </div>

        {user && (
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-full bg-neutral-100 text-base font-semibold text-neutral-800">
              {user.name.charAt(0).toUpperCase()}
            </div>

            <div>
              <p className="text-xs text-neutral-500">Welcome back,</p>

              <p className="mt-1 text-sm font-semibold text-neutral-900">
                {user.name}
              </p>
            </div>
          </div>
        )}
      </header>

      {/* Loading state */}
      {loading ? (
        <div
          role="status"
          aria-label="Loading your profile"
          className="mt-10 grid animate-pulse gap-8 lg:grid-cols-[260px_minmax(0,1fr)]"
        >
          <div className="h-96 rounded-xl bg-neutral-100" />

          <div className="space-y-5 rounded-xl border border-neutral-200 p-7">
            <div className="h-6 w-48 rounded bg-neutral-100" />

            <div className="grid gap-5 sm:grid-cols-2">
              {Array.from({ length: 4 }, (_, index) => (
                <div key={index} className="space-y-2">
                  <div className="h-3 w-24 rounded bg-neutral-100" />
                  <div className="h-12 rounded-lg bg-neutral-100" />
                </div>
              ))}
            </div>

            <div className="h-48 rounded-lg bg-neutral-100" />
          </div>
        </div>
      ) : !user ? (
        /* Unavailable account */
        <section className="mt-10 rounded-xl border border-neutral-200 bg-neutral-50 px-6 py-20 text-center">
          <h2 className="text-xl font-semibold text-neutral-900">
            {error || "Please sign in to continue."}
          </h2>

          <Link
            href="/login"
            className="mt-6 inline-flex rounded-lg bg-[#DB4444] px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#c33b3b]"
          >
            Sign in
          </Link>
        </section>
      ) : (
        /* Account layout */
        <div className="mt-10 grid items-start gap-8 lg:grid-cols-[260px_minmax(0,1fr)] xl:grid-cols-[280px_minmax(0,1fr)] xl:gap-12">
          <aside className="min-w-0 lg:sticky lg:top-28">
            <ProfileSidebar />
          </aside>

          <div className="min-w-0">
            <ProfileForm
              onSaved={(name) => {
                setUser((current) =>
                  current ? { ...current, name } : current,
                );
              }}
            />
          </div>
        </div>
      )}
    </main>
  );
}
