import Link from "next/link";
import { ArrowRight, Leaf, Hexagon, Heart } from "lucide-react";

import HeroAboutus from "../components/HeroAboutus";

import { storySections } from "../data/storySections";
import AnimatedStorySection from "../components/AnimatedStorySection";
import ValueCard from "../components/ValueCard";
import StoryBadge from "../components/StoryBadge";

export const metadata = {
  title: "Povestea noastră",
  description:
    "Descoperă povestea Mierea Casei, valorile noastre și pasiunea pentru miere naturală și produse apicole.",

  alternates: {
    canonical: "https://www.miereacasei.ro/despre-noi",
  },

  openGraph: {
    title: "Povestea noastră | Mierea Casei",
    description:
      "Află mai multe despre Mierea Casei, grija pentru albine și aprecierea pentru mierea naturală și produsele apicole.",
    url: "https://www.miereacasei.ro/despre-noi",
    siteName: "Mierea Casei",
    locale: "ro_RO",
    type: "website",
    images: [
      {
        url: "/produs-hero5.png",
        alt: "Produse apicole Mierea Casei",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Povestea noastră | Mierea Casei",
    description: "Descoperă povestea și valorile din spatele Mierea Casei.",
    images: ["/produs-hero5.png"],
  },
};

export default function DespreNoiPage() {
  return (
    <main className="min-h-screen bg-[#F8F5EE] font-roboto text-gray-700">
      {/* =========================================================
          HERO
      ========================================================= */}

      <HeroAboutus />

      <a
        href="#povestea-noastra"
        className="flex flex-col items-center gap-1 bg-white py-4 text-mierealbastru transition-opacity hover:opacity-70"
      >
        <span className="font-roboto text-[10px] font-bold uppercase tracking-[0.18em] sm:text-[12px]">
          Descoperă povestea
        </span>

        <span className="animate-bounce text-lg leading-none">↓</span>
      </a>

      {/* =========================================================
          POVESTEA NOASTRĂ
      ========================================================= */}

      {storySections.map((section) => (
        <AnimatedStorySection key={section.id} {...section} />
      ))}

      {/* =========================================================
          CENTRAL STATEMENT
      ========================================================= */}

      <section className="bg-white px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-[2rem] border border-black/5 bg-[#FCFBF8] px-7 py-16 text-center sm:px-12 sm:py-24">
            <div className="absolute left-10 top-10 h-20 w-20 rounded-full border border-amber-200/50" />

            <div className="absolute bottom-8 right-10 h-28 w-28 rounded-full border border-amber-200/40" />

            <div className="relative">
              <StoryBadge>Simplu. Natural. Autentic.</StoryBadge>

              <h2 className="mx-auto mt-1 max-w-3xl font-playfair text-3xl font-light leading-tight text-gray-800 sm:text-4xl lg:text-5xl">
                Mierea bună nu are nevoie de prea multe explicații
              </h2>

              <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-gray-500 sm:text-base">
                Aurie, parfumată și diferită de la un sortiment la altul, mierea
                își păstrează farmecul tocmai prin naturalețea ei.
              </p>

              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-500 sm:text-base">
                La Mierea Casei vrem să păstrăm această simplitate. Un produs
                bun începe cu albine sănătoase, natură și răbdare și ajunge la
                tine fără să-și piardă povestea pe drum.
              </p>

              <Link
                href="/produse"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-mierealbastru px-6 py-3 text-xs font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#1F3967]"
              >
                Vezi sortimentele
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          VALORI
      ========================================================= */}

      <section className="bg-[#F8F5EE] py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="text-center">
            <StoryBadge>Ceea ce ne definește</StoryBadge>

            <h2 className="mt-1 font-playfair text-3xl font-light text-gray-800 sm:text-4xl">
              Lucrurile simple contează
            </h2>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            <ValueCard
              icon={Leaf}
              title="Naturalețe"
              text="Respectăm caracterul natural al mierii și ceea ce ne oferă fiecare recoltă."
            />

            <ValueCard
              icon={Heart}
              title="Grijă"
              text="Punem atenție în fiecare etapă, de la stup până la borcan."
            />

            <ValueCard
              icon={Hexagon}
              title="Autenticitate"
              text="Credem într-un gust sincer, simplu și apropiat de natură."
            />
          </div>
        </div>
      </section>

      {/* =========================================================
          FINAL CTA
      ========================================================= */}

      <section className="bg-mierealbastru px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <StoryBadge>Gustul naturii, în fiecare borcan</StoryBadge>

          <h2 className="mt-1 font-playfair text-3xl font-light text-white sm:text-4xl">
            Descoperă mierea de la Mierea Casei
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/70 sm:text-base">
            Alege sortimentul preferat și descoperă diferențele de gust, aromă
            și caracter pe care fiecare recoltă le aduce.
          </p>

          <Link
            href="/produse"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-amber-500 px-7 py-3.5 text-xs font-bold uppercase tracking-wide text-white transition-colors hover:bg-amber-600"
          >
            Vezi produsele
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
