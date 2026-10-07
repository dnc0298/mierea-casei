export default function ValueCard({ icon: Icon, title, text }) {
  return (
    <div className="rounded-3xl border border-black/5 bg-white p-7 text-center shadow-sm">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#F8F5EE] text-amber-600">
        <Icon className="h-5 w-5" />
      </div>

      <h3 className="mt-5 font-playfair text-xl font-bold text-mierealbastru">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-6 text-gray-500">{text}</p>
    </div>
  );
}
