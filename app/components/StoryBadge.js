export default function StoryBadge({ children }) {
  return (
    <span className="mb-6 inline-block rounded-full border border-mieregri bg-mierelight px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-gray-800 md:text-sm">
      {children}
    </span>
  );
}
