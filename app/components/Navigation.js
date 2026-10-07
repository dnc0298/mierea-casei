import Link from "next/link";
import CartButton from "./CartButton";
import UserUtilities from "./UserUtilities";

export default function Navigation() {
  return (
    <nav>
      {/* Mobile / Tablet */}
      <div className="flex xl:hidden h-9 w-9 items-center justify-center rounded-full border border-gray-200/70 bg-gray-50 transition-colors hover:bg-gray-200/70">
        <CartButton className="" />
      </div>

      {/* Desktop */}
      <div className="hidden items-center gap-10 xl:flex">
        <ul className="flex items-center gap-10 font-roboto text-base text-gray-700">
          <li className="group">
            <Link
              href="/"
              className="font-roboto text-base text-gray-700 transition-colors group-hover:text-[#385A91]"
            >
              Acasa
            </Link>
            <span className="mt-1 block h-px w-0 bg-[#385A91] transition-all duration-300 group-hover:w-full" />
          </li>

          <li className="group">
            <Link
              href="/produse"
              className="font-roboto text-base text-gray-700 transition-colors group-hover:text-[#385A91]"
            >
              Produse
            </Link>
            <span className="mt-1 block h-px w-0 bg-[#385A91] transition-all duration-300 group-hover:w-full" />
          </li>

          <li className="group">
            <Link
              href="/despre-noi"
              className="font-roboto text-base text-gray-700 transition-colors group-hover:text-[#385A91]"
            >
              Despre noi
            </Link>
            <span className="mt-1 block h-px w-0 bg-[#385A91] transition-all duration-300 group-hover:w-full" />
          </li>
        </ul>

        <UserUtilities />
      </div>
    </nav>
  );
}
