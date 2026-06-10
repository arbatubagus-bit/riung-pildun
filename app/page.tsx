import { supabase } from "../lib/supabase";
import { Trophy, Users, ShieldCheck, ShieldX } from "lucide-react";

function getCountryCode(country?: string) {
  const codes: Record<string, string> = {
    England: "gb-eng",
    Argentina: "ar",
    Brazil: "br",
    France: "fr",
    Spain: "es",
    Portugal: "pt",
    Germany: "de",
    Netherlands: "nl",
    Belgium: "be",
    Croatia: "hr",
    Morocco: "ma",
    Uruguay: "uy",
    Colombia: "co",
    Japan: "jp",
    Mexico: "mx",
    USA: "us",
  };

  return codes[country || ""] || "un";
}

export default async function Home() {
  const { data: participants } = await supabase
    .from("participants")
    .select("*")
    .order("id");

  const total = participants?.length || 0;

  const active =
    participants?.filter((p) => p.status === "ACTIVE").length || 0;

  const eliminated =
    participants?.filter((p) => p.status === "ELIMINATED").length || 0;

  return (
    <main className="min-h-screen text-white overflow-hidden relative">

      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/worldcup.jpg')",
        }}
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/70" />

      {/* GRADIENT OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-slate-950/60 to-black/95" />

      {/* GLOW EFFECTS */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 h-[500px] w-[500px] rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-purple-500/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-yellow-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* HERO */}
        <section className="min-h-screen flex flex-col justify-center items-center text-center">

          <div className="mb-4 rounded-full border border-white/20 bg-white/5 backdrop-blur-xl px-5 py-2 text-sm text-slate-200">
            FIFA WORLD CUP SURVIVOR CHALLENGE
          </div>

          <div className="flex items-center gap-4">
            <Trophy className="w-12 h-12 text-yellow-400" />

            <h1 className="text-7xl md:text-9xl font-black tracking-tight bg-gradient-to-r from-yellow-300 via-white to-blue-300 text-transparent bg-clip-text drop-shadow-2xl">
              RIUNG PILDUN
            </h1>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold mt-3 text-slate-200">
            2026
          </h2>

          <p className="mt-6 text-slate-300 max-w-2xl text-lg">
            Pilih satu negara. Jika negara gugur, kamu gugur.
            Bertahan sampai final dan jadilah juara RIUNG PILDUN 2026.
          </p>

          <div className="mt-10">
            <button className="rounded-full bg-yellow-400 text-black px-8 py-4 font-bold hover:scale-105 transition-all duration-300">
              ENTER TOURNAMENT
            </button>
          </div>

        </section>

        {/* STATS */}
        <section className="grid md:grid-cols-3 gap-6 mb-16">

          <div className="rounded-3xl bg-white/10 backdrop-blur-xl border border-white/10 p-8">
            <Users className="w-10 h-10 mb-4" />

            <h3 className="text-5xl font-black">
              {total}
            </h3>

            <p className="text-slate-300 mt-2">
              PARTICIPANTS
            </p>
          </div>

          <div className="rounded-3xl bg-white/10 backdrop-blur-xl border border-green-500/20 p-8">
            <ShieldCheck className="w-10 h-10 mb-4 text-green-400" />

            <h3 className="text-5xl font-black">
              {active}
            </h3>

            <p className="text-green-400 mt-2">
              SURVIVORS
            </p>
          </div>

          <div className="rounded-3xl bg-white/10 backdrop-blur-xl border border-red-500/20 p-8">
            <ShieldX className="w-10 h-10 mb-4 text-red-400" />

            <h3 className="text-5xl font-black">
              {eliminated}
            </h3>

            <p className="text-red-400 mt-2">
              ELIMINATED
            </p>
          </div>

        </section>

        {/* PARTICIPANTS */}
        <section className="pb-20">

          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">
              Survivor Board
            </h2>

            <span className="text-slate-300">
              {active} peserta masih bertahan
            </span>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {participants?.map((p) => (
              <div
                key={p.id}
                className={`rounded-3xl bg-white/10 backdrop-blur-xl border p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl
                ${
                  p.status === "ACTIVE"
                    ? "border-green-500/20"
                    : "border-red-500/20 opacity-70"
                }`}
              >
               <img
  className="w-16 h-12 object-cover rounded-md mb-4 border border-white/20"
  src={`https://flagcdn.com/w80/${getCountryCode(
    p.selected_team
  )}.png`}
  alt={p.selected_team || ""}
 />

                <div className="text-sm uppercase text-slate-300">
                  {p.selected_team || "No Country"}
                </div>

                <div className="text-2xl font-bold mt-2">
                  {p.username}
                </div>

                <div
                  className={`mt-4 inline-block rounded-full px-3 py-1 text-xs font-semibold
                  ${
                    p.status === "ACTIVE"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {p.status}
                </div>
              </div>
            ))}

          </div>

        </section>

      </div>
    </main>
  );
}