"use client";

export default function Error({ error, reset }) {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-[#F8F5EE] px-6">
      <div className="w-full max-w-lg rounded-[2rem] border border-black/5 bg-white p-8 text-center shadow-sm sm:p-10">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-50 text-amber-600">
          <span className="font-playfair text-2xl">!</span>
        </div>

        <h1 className="mt-6 font-playfair text-3xl font-bold text-mierealbastru">
          Ceva nu a mers cum trebuie
        </h1>

        <p className="mx-auto mt-3 max-w-md font-roboto text-sm leading-6 text-gray-500">
          Nu am putut încărca această pagină. Verifică conexiunea la internet și
          încearcă din nou.
        </p>

        <button
          type="button"
          onClick={() => reset()}
          className="mt-7 rounded-full bg-mierealbastru px-6 py-3 font-roboto text-xs font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#1F3967]"
        >
          Încearcă din nou
        </button>
      </div>
    </main>
  );
}
