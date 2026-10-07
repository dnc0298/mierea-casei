import Image from "next/image";

export default function CategoryButton({ cat, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative h-[145px] overflow-hidden rounded-[1.25rem] text-left transition-all duration-300 md:h-[155px] ${
        active
          ? "shadow-md ring-1 ring-mierealbastru/20"
          : "hover:-translate-y-1 hover:shadow-md"
      }`}
    >
      {/* BACKGROUND IMAGE */}
      <Image
        src={cat.image}
        alt={cat.label}
        fill
        sizes="(max-width: 768px) 50vw, 25vw"
        className={`object-cover transition-transform duration-500 ${
          active ? "scale-105" : "group-hover:scale-105"
        }`}
      />

      {/* OVERLAY */}
      <div
        className={`absolute inset-0 transition-all duration-300 ${
          active
            ? "bg-gradient-to-r from-mierealbastru via-mierealbastru/50 via-45% to-transparent"
            : "bg-gradient-to-t from-black/55 via-black/25 to-black/10"
        }`}
      />
      {/* CONTENT */}
      <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
        <h3
          className={`font-playfair text-sm font-bold uppercase leading-tight md:text-base ${
            active ? "text-white" : "text-white"
          }`}
        >
          {cat.label}
        </h3>

        <span
          className={`mt-1.5 block font-roboto text-[11px] font-medium transition-colors md:text-xs ${
            active ? "text-white/80" : "text-white/80 group-hover:text-white"
          }`}
        >
          {active ? "Selectat" : "Vezi produsele →"}
        </span>
      </div>
    </button>
  );
}
