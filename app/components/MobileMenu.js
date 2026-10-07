"use client";

import { useState } from "react";
import Link from "next/link";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/", label: "Acasa" },
    { href: "/produse", label: "Produse" },
    { href: "/despre-noi", label: "Despre noi" },
    { href: "/cont", label: "Cont" },
  ];

  return (
    <>
      {/* Buton meniu */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-gray-100/70 transition-colors hover:bg-gray-200/70 xl:hidden"
        aria-label={open ? "Închide meniul" : "Deschide meniul"}
        aria-expanded={open}
      >
        <span
          className={`relative flex h-5 w-5 items-center justify-center transition-transform duration-500 ease-in-out ${
            open ? "rotate-180" : "rotate-0"
          }`}
        >
          {/* Bara 1 */}
          <span
            className={`absolute h-0.5 w-5 rounded-full bg-gray-700 transition-all duration-300 ease-in-out ${
              open ? "rotate-45" : "-translate-y-[6px]"
            }`}
          />

          {/* Bara 2 */}
          <span
            className={`absolute h-0.5 w-5 rounded-full bg-gray-700 transition-all duration-200 ${
              open ? "scale-0 opacity-0" : "scale-100 opacity-100"
            }`}
          />

          {/* Bara 3 */}
          <span
            className={`absolute h-0.5 w-5 rounded-full bg-gray-700 transition-all duration-300 ease-in-out ${
              open ? "-rotate-45" : "translate-y-[6px]"
            }`}
          />
        </span>
      </button>

      {/* Meniu */}
      <ul
        className={`absolute left-0 top-full z-50 flex w-full flex-col gap-4 overflow-hidden border-b border-gray-100 bg-white p-6 font-roboto text-lg text-gray-700 shadow-md transition-all duration-300 ease-out xl:hidden ${
          open
            ? "max-h-96 translate-y-0 opacity-100"
            : "pointer-events-none max-h-0 -translate-y-2 opacity-0"
        }`}
      >
        {links.map((link, index) => (
          <li
            key={link.href}
            className={`transition-all duration-300 ${
              open ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
            }`}
            style={{
              transitionDelay: open ? `${index * 40}ms` : "0ms",
            }}
          >
            <Link
              href={link.href}
              className="block transition-colors hover:text-[#385A91]"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
