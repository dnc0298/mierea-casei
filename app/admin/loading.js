export default function Loading() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center bg-[#F8F5EE] px-6">
      <div className="flex flex-col items-center">
        <div className="h-9 w-9 animate-spin rounded-full border-2 border-mierealbastru/20 border-t-mierealbastru" />

        <p className="mt-4 font-roboto text-sm text-gray-500">Se încarcă...</p>
      </div>
    </main>
  );
}
