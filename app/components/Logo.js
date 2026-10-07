import Link from "next/link";

export default function Logo({ className = "text-gray-800" }) {
  return (
    <Link href="/" className={`block ${className}`}>
      <span
        aria-label="Mierea Casei"
        role="img"
        className="block h-7 w-[170px] md:h-9 md:w-[205px] lg:h-10 lg:w-[285px] hover:text-[#2F4D7F]"
        style={{
          maskImage: "url('/logo MC.svg')",
          WebkitMaskImage: "url('/logo MC.svg')",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskPosition: "center",
          WebkitMaskPosition: "center",
          maskSize: "contain",
          WebkitMaskSize: "contain",
          backgroundColor: "currentColor",
        }}
      />
    </Link>
  );
}
