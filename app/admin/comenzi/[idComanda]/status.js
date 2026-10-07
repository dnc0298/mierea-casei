"use client";

import { useState } from "react";

const statuses = [
  {
    value: "pending",
    label: "În așteptare",
  },
  {
    value: "processing",
    label: "În procesare",
  },
  {
    value: "shipped",
    label: "Expediată",
  },
  {
    value: "completed",
    label: "Finalizată",
  },
  {
    value: "cancelled",
    label: "Anulată",
  },
];

export default function StatusSelect({ orderId, initialStatus, initialAwb }) {
  const [status, setStatus] = useState(initialStatus);
  const [awb, setAwb] = useState(initialAwb || "");

  const [pendingShipping, setPendingShipping] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function updateStatus(newStatus, newAwb = null) {
    const previousStatus = status;

    setSaving(true);
    setMessage("");

    try {
      const response = await fetch(`/api/admin/orders/${orderId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus,
          awb: newAwb,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Statusul nu a putut fi actualizat.");
      }

      setStatus(data.order.status);

      if (newAwb !== null) {
        setAwb(newAwb);
      }

      setMessage("Status actualizat.");
    } catch (error) {
      setStatus(previousStatus);
      setMessage(error.message);
    } finally {
      setSaving(false);
    }
  }

  function handleChange(event) {
    const newStatus = event.target.value;

    setMessage("");

    // Dacă alegem "Expediată",
    // nu salvăm încă. Cerem AWB-ul.
    if (newStatus === "shipped" && status !== "shipped") {
      setPendingShipping(true);
      return;
    }

    setPendingShipping(false);

    updateStatus(newStatus);
  }

  async function handleShipOrder() {
    const cleanAwb = awb.trim();

    if (!cleanAwb) {
      setMessage("Introdu numărul AWB înainte de expediere.");
      return;
    }

    setPendingShipping(false);

    await updateStatus("shipped", cleanAwb);
  }

  function handleCancelShipping() {
    setPendingShipping(false);
    setMessage("");
  }

  return (
    <div>
      {/* STATUS */}
      <select
        value={pendingShipping ? "shipped" : status}
        onChange={handleChange}
        disabled={saving}
        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 font-roboto text-sm font-medium text-mierealbastru outline-none transition focus:border-mierealbastru focus:ring-2 focus:ring-mierealbastru/10 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {statuses.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>

      {/* AWB */}
      {pendingShipping && (
        <div className="mt-4 rounded-2xl border border-[#EDE9E1] bg-[#FCFBF8] p-4">
          <p className="font-roboto text-sm font-bold text-mierealbastru">
            Expedierea comenzii
          </p>

          <p className="mt-1 font-roboto text-xs leading-5 text-gray-500">
            Introdu numărul AWB înainte de a marca această comandă ca expediată.
          </p>

          <label className="mt-4 mb-2 block font-roboto text-xs font-bold text-gray-600">
            Număr AWB
          </label>

          <input
            type="text"
            value={awb}
            onChange={(event) => {
              setAwb(event.target.value);
              setMessage("");
            }}
            placeholder="Ex. 1234567890"
            disabled={saving}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 font-roboto text-sm text-mierealbastru outline-none transition placeholder:text-gray-400 focus:border-mierealbastru focus:ring-2 focus:ring-mierealbastru/10 disabled:cursor-not-allowed disabled:opacity-60"
          />

          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={handleCancelShipping}
              disabled={saving}
              className="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-3 font-roboto text-xs font-bold text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Anulează
            </button>

            <button
              type="button"
              onClick={handleShipOrder}
              disabled={saving || !awb.trim()}
              className="flex-1 rounded-xl bg-mierealbastru px-4 py-3 font-roboto text-xs font-bold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? "Se salvează..." : "Expediază comanda"}
            </button>
          </div>
        </div>
      )}

      {/* AWB existent */}
      {!pendingShipping && status === "shipped" && awb && (
        <div className="mt-4 rounded-xl border border-gray-200 bg-[#FCFBF8] px-4 py-3">
          <p className="font-roboto text-[10px] font-bold uppercase tracking-wider text-gray-400">
            AWB
          </p>

          <p className="mt-1 font-roboto text-sm font-bold text-mierealbastru">
            {awb}
          </p>
        </div>
      )}

      {/* SAVING */}
      {saving && (
        <p className="mt-2 font-roboto text-xs text-gray-400">Se salvează...</p>
      )}

      {/* MESSAGE */}
      {!saving && message && (
        <p
          className={`mt-2 font-roboto text-xs ${
            message === "Status actualizat." ? "text-amber-600" : "text-red-500"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
