"use client";

import { FormEvent, useEffect, useState } from "react";
import { ArrowRight, KeyRound, LoaderCircle, Mail, Sparkles } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Workspace } from "@/components/workspace";

const ALLOWED_EMAIL = "dulantopruebas@gmail.com";

export default function Home() {
  const [status, setStatus] = useState<"loading" | "signed-out" | "signed-in" | "unauthorized">("loading");
  const [email, setEmail] = useState(ALLOWED_EMAIL);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return setStatus("signed-out");
      setStatus(user.email?.toLowerCase() === ALLOWED_EMAIL ? "signed-in" : "unauthorized");
    });
  }, []);

  async function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (email.trim().toLowerCase() !== ALLOWED_EMAIL) {
      setError("Esta aplicación está configurada para una única cuenta.");
      return;
    }
    setSending(true);
    const { error: signInError } = await createClient().auth.signInWithPassword({ email: email.trim(), password });
    setSending(false);
    if (signInError) setError("Correo o contraseña incorrectos.");
    else window.location.reload();
  }

  if (status === "loading") {
    return <main className="grid min-h-screen place-items-center"><LoaderCircle className="animate-spin text-zinc-600" /></main>;
  }

  if (status === "signed-in") return <Workspace />;

  return (
    <main className="grid min-h-screen place-items-center bg-zinc-100 p-6 text-zinc-800">
      <section className="w-full max-w-md rounded-3xl border border-zinc-200 bg-white p-8 shadow-xl shadow-zinc-500/10 sm:p-10">
        <div className="mb-8 flex size-12 items-center justify-center rounded-2xl bg-zinc-700 text-white shadow-lg shadow-zinc-500/20"><Sparkles size={23} /></div>
        <p className="mb-2 text-sm font-semibold tracking-[0.09em] text-zinc-500">THETA BOARD</p>
        <h1 className="text-3xl font-semibold tracking-[0.025em]">Tus ideas, en su lugar.</h1>
        <p className="mt-3 leading-6 text-zinc-600">Un espacio privado en la nube para tus proyectos y pizarras.</p>

        <form className="mt-8 space-y-4" onSubmit={signIn}>
            <label className="block text-sm font-medium text-zinc-700" htmlFor="email">Correo autorizado</label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
              <input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="w-full rounded-xl border border-zinc-200 py-3 pl-11 pr-4 outline-none transition focus:border-zinc-500 focus:ring-4 focus:ring-zinc-200" required />
            </div>
            <label className="block pt-1 text-sm font-medium text-zinc-700" htmlFor="password">Contraseña</label>
            <div className="relative">
              <KeyRound className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
              <input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="w-full rounded-xl border border-zinc-200 py-3 pl-11 pr-4 outline-none transition focus:border-zinc-500 focus:ring-4 focus:ring-zinc-200" required />
            </div>
            {error && <p className="text-sm text-rose-600">{error}</p>}
            <button disabled={sending} className="flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-700 py-3 font-semibold text-white transition hover:bg-zinc-800 disabled:opacity-60">
              {sending ? <LoaderCircle className="animate-spin" size={18} /> : <>Entrar a Theta Board <ArrowRight size={18} /></>}
            </button>
          </form>
      </section>
    </main>
  );
}
