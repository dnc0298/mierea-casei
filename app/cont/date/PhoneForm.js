"use client";

import { useState } from "react";

export default function PhoneForm({ initialPhone }) {
  const [phone, setPhone] = useState(initialPhone);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/users/phone", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.error || "Telefonul nu a putut fi salvat.");
        return;
      }

      setMessage("Numărul de telefon a fost salvat.");
    } catch {
      setMessage("A apărut o eroare. Încearcă din nou.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label className="mb-2 block font-roboto text-xs font-bold uppercase tracking-wide text-gray-400">
        Număr de telefon
      </label>

      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="tel"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          placeholder="07xx xxx xxx"
          className="min-w-0 flex-1 rounded-xl border border-gray-200 bg-white px-4 py-3 font-roboto text-sm text-gray-700 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
        />

        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-mierealbastru px-5 py-3 font-roboto text-sm font-bold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Se salvează..." : "Salvează"}
        </button>
      </div>

      {message && (
        <p className="mt-3 font-roboto text-sm text-amber-700">{message}</p>
      )}
    </form>
  );
}
