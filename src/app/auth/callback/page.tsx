"use client";

import { useEffect } from "react";
import { LoaderCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function AuthCallbackPage() {
  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");
    if (!code) return window.location.replace("/");
    createClient().auth.exchangeCodeForSession(code).finally(() => window.location.replace("/"));
  }, []);

  return <main className="grid min-h-screen place-items-center"><LoaderCircle className="animate-spin text-indigo-600" /></main>;
}
