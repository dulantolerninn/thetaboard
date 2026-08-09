"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowLeft, Check, Cloud, LoaderCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const Excalidraw = dynamic(() => import("@excalidraw/excalidraw").then((module) => module.Excalidraw), { ssr: false, loading: () => <div className="grid h-full place-items-center"><LoaderCircle className="animate-spin text-zinc-600" /></div> });

type Board = { id: string; title: string; scene: { elements?: readonly unknown[] } | null };

export function BoardCanvas({ board, onBack }: { board: Board; onBack: () => void }) {
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

  return <main className="h-screen w-screen"><Excalidraw initialData={{ elements: board.scene?.elements as never[] ?? [] }} onChange={(elements) => save(elements)} renderTopRightUI={() => <div className="flex items-center gap-2 rounded-lg bg-white/90 p-1.5 shadow-sm"><button onClick={onBack} className="flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-medium text-zinc-600 hover:bg-zinc-100"><ArrowLeft size={15} /> Proyecto</button><span className="hidden max-w-40 truncate border-l border-zinc-200 pl-2 text-xs font-medium text-zinc-700 sm:block">{board.title}</span><span className="hidden items-center gap-1.5 border-l border-zinc-200 pl-2 text-xs text-zinc-400 md:flex">{state === "saving" ? <><Cloud size={14} /> Guardando…</> : <><Check size={14} className="text-zinc-600" /> Guardado</>}</span></div>} /></main>;
}

declare global { interface Window { __thetaBoardSaveTimer: number; } }
