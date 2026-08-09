"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Check, Cloud, LoaderCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const Excalidraw = dynamic(() => import("@excalidraw/excalidraw").then((module) => module.Excalidraw), { ssr: false, loading: () => <div className="grid h-full place-items-center"><LoaderCircle className="animate-spin text-zinc-600" /></div> });

type Board = { id: string; title: string; scene: { elements?: readonly unknown[] } | null };

export function BoardCanvas({ board }: { board: Board }) {
  const supabase = useMemo(createClient, []);
  const [state, setState] = useState<"saved" | "saving">("saved");
  const save = useCallback((elements: readonly unknown[]) => {
    setState("saving");
    window.clearTimeout(window.__thetaBoardSaveTimer);
    window.__thetaBoardSaveTimer = window.setTimeout(async () => {
      await supabase.from("boards").update({ scene: { elements }, updated_at: new Date().toISOString() }).eq("id", board.id);
      setState("saved");
    }, 850);
  }, [board.id, supabase]);

  useEffect(() => () => window.clearTimeout(window.__thetaBoardSaveTimer), []);

  return <div className="flex h-[calc(100vh-4rem)] flex-col"><div className="flex h-14 shrink-0 items-center justify-between border-b border-zinc-200 bg-white px-5"><h2 className="font-semibold tracking-[0.02em]">{board.title}</h2><span className="flex items-center gap-1.5 text-xs text-zinc-400">{state === "saving" ? <><Cloud size={15} /> Guardando…</> : <><Check size={15} className="text-zinc-600" /> Guardado</>}</span></div><div className="min-h-0 flex-1"><Excalidraw initialData={{ elements: board.scene?.elements as never[] ?? [] }} onChange={(elements) => save(elements)} /></div></div>;
}

declare global { interface Window { __thetaBoardSaveTimer: number; } }
