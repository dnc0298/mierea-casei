import { UserIcon } from "lucide-react";
import Link from "next/link";

import CartButton from "./CartButton";

function UserUtilities() {
  return (
    <ul className="hidden items-center justify-center gap-3 font-averia text-xl lg:flex">
      <li>
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200/70 bg-gray-50 transition-colors hover:bg-gray-200/70">
          <CartButton />
        </div>
      </li>

      <li>
        <Link
          href="/cont"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200/70 bg-gray-50 transition-colors hover:bg-gray-200/70"
        >
          <UserIcon
            className="text-gray-700 transition-colors hover:text-[#2F4F86]"
            size={20}
            strokeWidth={1.8}
          />
        </Link>
      </li>
    </ul>
  );
}

export default UserUtilities;
