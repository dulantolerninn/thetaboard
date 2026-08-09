"use client";

import { FormEvent, useEffect, useState } from "react";
import { ArrowRight, CheckCircle2, LoaderCircle, Mail, Sparkles } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Workspace } from "@/components/workspace";

const ALLOWED_EMAIL = "dulantopruebas@gmail.com";

export default function Home() {
  const [status, setStatus] = useState<"loading" | "signed-out" | "signed-in" | "unauthorized">("loading");
  const [email, setEmail] = useState(ALLOWED_EMAIL);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return setStatus("signed-out");
      setStatus(user.email?.toLowerCase() === ALLOWED_EMAIL ? "signed-in" : "unauthorized");
    });
  }, []);

  async function requestLink(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (email.trim().toLowerCase() !== ALLOWED_EMAIL) {
      setError("Esta aplicación está configurada para una única cuenta.");
      return;
    }
    setSending(true);
    const { error: signInError } = await createClient().auth.signInWithOtp({
      email: email.trim(),
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    });
    setSending(false);
    if (signInError) setError(`No se pudo enviar el enlace: ${signInError.message}`);
    else setSent(true);
  }

  if (status === "loading") {
    return <main className="grid min-h-screen place-items-center"><LoaderCircle className="animate-spin text-indigo-600" /></main>;
  }

  if (status === "signed-in") return <Workspace />;

  return (
    <main className="grid min-h-screen place-items-center bg-[#f6f7fb] p-6 text-slate-900">
      <section className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-900/5 sm:p-10">
        <div className="mb-8 flex size-12 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/25"><Sparkles size={23} /></div>
        <p className="mb-2 text-sm font-semibold tracking-wide text-indigo-600">THETA BOARD</p>
        <h1 className="text-3xl font-semibold tracking-tight">Tus ideas, en su lugar.</h1>
        <p className="mt-3 leading-6 text-slate-600">Un espacio privado en la nube para tus proyectos y pizarras.</p>

        {sent ? (
          <div className="mt-8 rounded-2xl bg-emerald-50 p-5 text-emerald-950">
            <CheckCircle2 className="mb-3 text-emerald-600" size={24} />
            <p className="font-semibold">Revisa tu correo</p>
            <p className="mt-1 text-sm leading-5">Te enviamos un enlace seguro para entrar. Puedes cerrar esta pestaña mientras tanto.</p>
          </div>
        ) : (
          <form className="mt-8 space-y-4" onSubmit={requestLink}>
            <label className="block text-sm font-medium text-slate-700" htmlFor="email">Correo autorizado</label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100" required />
            </div>
            {error && <p className="text-sm text-rose-600">{error}</p>}
            <button disabled={sending} className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-60">
              {sending ? <LoaderCircle className="animate-spin" size={18} /> : <>Enviar enlace de acceso <ArrowRight size={18} /></>}
            </button>
          </form>
        )}
      </section>
    </main>
  );
}
