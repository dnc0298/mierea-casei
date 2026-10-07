import Link from "next/link";

function BrandHighlights() {
  const stats = [
    { value: "Multiple", label: "SORTIMENTE" },
    { value: "100%", label: "NATURAL" },
    { value: "01", label: "MISIUNE" },
    { value: "∞", label: "BUCURIE" },
  ];

  return (
    <section className="w-full bg-olive-100 py-16 px-6">
      <div className="min-w-0 text-center">
        <span className="inline-block bg-mierelight md:text-sm text-gray-800 text-[13px] font-semibold tracking-wide px-4 py-2 border-1 border-mieregri rounded-full mb-8">
          CE NE DEFINEȘTE?
        </span>

        {/* Titlu */}
        <h2 className="font-playfair text-4xl font-light lg:text-6xl text-gray-800 mb-6">
          Miere autentică. Aleasă cu grijă.
        </h2>

        {/* Paragraf */}
        <p className="text-gray-700 text-base lg:text-[20px] leading-relaxed mb-8 max-w-[800px] mx-auto">
          Multiple sortimente, experiențe și același respect pentru ceea ce ne
          oferă natura. Mierea Casei aduce în fiecare borcan gustul autentic al
          mierii, într-o formă simplă și atent aleasă.
        </p>
        <div className="max-w-[800px] mx-auto grid grid-cols-2 md:grid-cols-4 border-t border-b border-slate-200 mb-10">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`
        py-8 px-4 text-center
        border-slate-200
        ${index % 2 === 0 ? "border-r" : ""}
        ${index < 2 ? "border-b md:border-b-0" : ""}
        md:border-r md:last:border-r-0
      `}
            >
              <div className="font-playfair text-3xl md:text-4xl text-gray-700 mb-2">
                {stat.value}
              </div>
              <div className="text-xs tracking-wide text-slate-700 uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <Link
          href="/produse"
          className="group inline-flex items-center gap-2 bg-mierealbastru text-white font-semibold px-5 py-3 rounded-full hover:bg-[#1F3967] transition-colors no-underline"
        >
          Descoperă acum
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </section>
  );
}

export default BrandHighlights;
