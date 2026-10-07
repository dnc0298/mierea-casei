export default function Loading() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center bg-[#F8F5EE] px-6">
      <div className="flex flex-col items-center text-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-mierealbastru/20 border-t-mierealbastru" />

        <p className="mt-5 font-playfair text-xl text-mierealbastru">
          Se încarcă...
        </p>

        <p className="mt-1 font-roboto text-sm text-gray-400">
          Te rugăm să aștepți câteva momente.
        </p>
      </div>
    </main>
  );
}
