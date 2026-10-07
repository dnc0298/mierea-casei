export default function Loading() {
  return (
    <main className="min-h-screen bg-[#F8F5EE] px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="h-10 w-56 animate-pulse rounded-lg bg-gray-200" />

        <div className="mt-8 space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="h-40 animate-pulse rounded-3xl bg-white shadow-sm"
            />
          ))}
        </div>
      </div>
    </main>
  );
}
