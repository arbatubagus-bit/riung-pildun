export const dynamic = "force-dynamic";
export const revalidate = 0;

import { Trophy, Users, ShieldCheck, ShieldX } from "lucide-react";

const SUPABASE_URL = "https://ehprddsjphmcftzvzhyj.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVocHJkZHNqcGhtY2Z0enZ6aHlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA5OTc3MzMsImV4cCI6MjA5NjU3MzczM30.wt0NXCMqxjlqSFO-tTHCUDToYEAa1LoLzCRi8_XPLDQ";

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
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/participants?select=*`,
    {
      method: "GET",
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
      cache: "no-store",
    }
  );

  const participants = await res.json();

  const safeData = Array.isArray(participants) ? participants : [];

  const total = safeData.length;

  const active = safeData.filter(
    (p) => (p.status || "").toUpperCase() === "ACTIVE"
  ).length;

  const eliminated = safeData.filter(
    (p) => (p.status || "").toUpperCase() === "ELIMINATED"
  ).length;

  return (
    <main className="min-h-screen text-white relative overflow-hidden">

      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/worldcup.jpg')" }}
      />
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        <section className="min-h-screen flex flex-col justify-center items-center text-center">
          <div className="flex items-center gap-4">
            <Trophy className="w-12 h-12 text-yellow-400" />
            <h1 className="text-7xl font-black bg-gradient-to-r from-yellow-300 via-white to-blue-300 text-transparent bg-clip-text">
              RIUNG PILDUN
            </h1>
          </div>

          <h2 className="text-5xl mt-3">2026</h2>
        </section>

        <section className="grid md:grid-cols-3 gap-6 mb-16">

          <div className="bg-white/10 p-8 rounded-3xl">
            <Users className="w-10 h-10 mb-4" />
            <h3 className="text-5xl font-black">{total}</h3>
            <p>PARTICIPANTS</p>
          </div>

          <div className="bg-white/10 p-8 rounded-3xl">
            <ShieldCheck className="w-10 h-10 mb-4 text-green-400" />
            <h3 className="text-5xl font-black">{active}</h3>
            <p>ACTIVE</p>
          </div>

          <div className="bg-white/10 p-8 rounded-3xl">
            <ShieldX className="w-10 h-10 mb-4 text-red-400" />
            <h3 className="text-5xl font-black">{eliminated}</h3>
            <p>ELIMINATED</p>
          </div>

        </section>

        <section className="pb-20 grid md:grid-cols-3 gap-6">

          {safeData.map((p: any) => (
            <div key={p.id} className="bg-white/10 p-6 rounded-3xl">

              <div className="text-xl font-bold">{p.username}</div>

              <div className="text-sm opacity-70">
                {p.selected_team}
              </div>

              <div className="mt-2 text-sm">
                {(p.status || "").toUpperCase()}
              </div>

            </div>
          ))}

        </section>

      </div>
    </main>
  );
}