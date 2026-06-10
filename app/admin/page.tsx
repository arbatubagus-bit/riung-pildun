"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { countries } from "./countries";

type Participant = {
  id: number;
  username: string;
  selected_team: string | null;
  status: string;
};

export default function AdminPage() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [username, setUsername] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");
  const [loading, setLoading] = useState(false);

  async function loadParticipants() {
    setLoading(true);

    const { data, error } = await supabase
      .from("participants")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.error("LOAD ERROR:", error);
      alert("Load error: " + error.message);
      setLoading(false);
      return;
    }

    setParticipants(data || []);
    setLoading(false);
  }

  useEffect(() => {
    loadParticipants();
  }, []);

  async function addParticipant() {
    if (!username || !selectedTeam) {
      alert("Isi nama dan negara");
      return;
    }

    const { error } = await supabase.from("participants").insert({
      username,
      selected_team: selectedTeam,
      status: "ACTIVE",
    });

    if (error) {
      console.error("INSERT ERROR:", error);
      alert("Insert error: " + error.message);
      return;
    }

    setUsername("");
    setSelectedTeam("");
    await loadParticipants();
  }

  async function deleteParticipant(id: number) {
    if (!confirm("Hapus peserta?")) return;

    const { error } = await supabase
      .from("participants")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
      alert(error.message);
      return;
    }

    loadParticipants();
  }

  async function eliminateParticipant(id: number) {
    const { error } = await supabase
      .from("participants")
      .update({ status: "ELIMINATED" })
      .eq("id", id);

    if (error) {
      console.error(error);
      alert(error.message);
      return;
    }

    loadParticipants();
  }

  async function activateParticipant(id: number) {
    const { error } = await supabase
      .from("participants")
      .update({ status: "ACTIVE" })
      .eq("id", id);

    if (error) {
      console.error(error);
      alert(error.message);
      return;
    }

    loadParticipants();
  }

  async function changeTeam(id: number) {
    const newTeam = prompt("Masukkan negara baru");
    if (!newTeam) return;

    const { error } = await supabase
      .from("participants")
      .update({ selected_team: newTeam })
      .eq("id", id);

    if (error) {
      console.error(error);
      alert(error.message);
      return;
    }

    loadParticipants();
  }

  return (
    <main style={{ padding: 30 }}>
      <h1>🏆 ADMIN RIUNG PILDUN 2026</h1>

      <hr />

      <h2>Tambah Peserta</h2>

      <input
        placeholder="Nama Peserta"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <select
        value={selectedTeam}
        onChange={(e) => setSelectedTeam(e.target.value)}
      >
        <option value="">Pilih Negara</option>
        {countries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>

      <button onClick={addParticipant}>Tambah</button>

      <hr />

      <h2>Daftar Peserta</h2>

      {loading && <p>Loading...</p>}

      {!loading && participants.length === 0 && (
        <p>Tidak ada peserta</p>
      )}

      {participants.map((p) => (
        <div
          key={p.id}
          style={{
            border: "1px solid #ccc",
            padding: 10,
            marginBottom: 10,
          }}
        >
          <b>{p.username}</b>
          <br />
          Negara: {p.selected_team}
          <br />
          Status: {p.status}

          <br /><br />

          <button onClick={() => changeTeam(p.id)}>
            Edit Negara
          </button>

          <button onClick={() => deleteParticipant(p.id)}>
            Hapus
          </button>

          {p.status === "ACTIVE" ? (
            <button onClick={() => eliminateParticipant(p.id)}>
              Gugurkan
            </button>
          ) : (
            <button onClick={() => activateParticipant(p.id)}>
              Aktifkan
            </button>
          )}
        </div>
      ))}
    </main>
  );
}