import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-[#F8F5EE] px-6">
      <div className="w-full max-w-lg rounded-[2rem] border border-black/5 bg-white p-8 text-center shadow-sm sm:p-10">
        <p className="font-playfair text-7xl font-bold text-mierealbastru/10">
          404
        </p>

        <h1 className="mt-2 font-playfair text-3xl font-bold text-mierealbastru">
          Pagina nu a fost găsită
        </h1>

        <p className="mx-auto mt-3 max-w-md font-roboto text-sm leading-6 text-gray-500">
          Pagina pe care o cauți nu există sau este posibil să fi fost mutată.
        </p>

        <Link
          href="/"
          className="mt-7 inline-flex rounded-full bg-mierealbastru px-6 py-3 font-roboto text-xs font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#1F3967]"
        >
          Înapoi acasă
        </Link>
      </div>
    </main>
  );
}
