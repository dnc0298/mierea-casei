export default function Loading() {
  return (
    <main className="min-h-screen bg-[#F8F5EE] px-6 py-10">
      <div className="mx-auto max-w-[1400px]">
        <div className="mx-auto h-8 w-56 animate-pulse rounded-lg bg-gray-200" />

        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-[145px] animate-pulse rounded-[1.25rem] bg-gray-200 md:h-[155px]"
            />
          ))}
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="h-80 animate-pulse rounded-3xl bg-white"
            />
          ))}
        </div>
      </div>
    </main>
  );
}
