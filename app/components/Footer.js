import Link from "next/link";
import Image from "next/image";

const companyLinks = [
  { label: "Despre noi", href: "/despre-noi", underline: true },
  { label: "Produse", href: "/produse" },
];

const socialLinks = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "TikTok", href: "https://tiktok.com" },
];

const usefulLinks = [
  { label: "Termeni și condiții", href: "/termeni-si-conditii" },
  { label: "Confidențialitate", href: "/politica-confidentialitate" },
  { label: "Cookies", href: "/politica-cookies" },
  { label: "Livrare și retur", href: "/politica-retur" },
];

export default function Footer() {
  return (
    <footer className="w-full bg-mierealbastru font-roboto text-blue-200 px-6 py-12 lg:px-16">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_1fr_0.8fr] gap-10 lg:gap-0">
        <div className="grid grid-cols-2 gap-6 lg:border-r lg:border-blue-200 lg:pr-10">
          <div className="flex flex-col gap-3">
            <span className="text-mierelight font-medium">Company</span>
            {companyLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`text-sm text-blue-200 hover:text-white transition-colors ${
                  link.underline ? "underline" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-mierelight font-medium">Social</span>
            {socialLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-blue-200 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="border-t border-blue-200 pt-8 mt-8 lg:border-t-0 lg:border-r lg:pt-0 lg:mt-0 lg:pr-10 lg:pl-10">
          <span className="text-mierelight font-medium block mb-3">
            Linkuri utile
          </span>
          <div className="flex flex-col gap-3">
            {usefulLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-blue-200 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="border-t border-blue-200 pt-8 mt-8 lg:border-t-0 lg:pt-0 lg:mt-0 lg:pl-10">
          <div className="flex flex-col items-start">
            <Link
              href="https://consumer-redress.ec.europa.eu/index_en"
              target="_blank"
              rel="nofollow"
            >
              <Image
                className="w-[250px] h-[74px] m-[5px]"
                src="/anpc-sol.png"
                alt="Solutionarea Alternativa a Litigiilor"
                width={250}
                height={74}
                sizes="250px"
              />
            </Link>

            <Link
              href="https://reclamatiisal.anpc.ro/"
              target="_blank"
              rel="nofollow"
            >
              <Image
                className="w-[250px] h-[74px] m-[5px]"
                src="/anpc-sal.png"
                alt="Solutionarea Online a Litigiilor"
                width={250}
                height={74}
                sizes="250px"
              />
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-blue-200 mt-10 pt-6 text-center">
        <p className="text-sm text-blue-200">
          © 2026 MiereaCasei. | All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
