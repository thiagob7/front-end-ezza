"use client";

import Link from "next/link";
import Logo from "../Logo";
import { signOut, useSession } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();
  const isLogged = !!session;

  return (
    <section className="w-full px-2 items-center justify-center bg-gray-100 shadow-header">
      <div className="flex mx-auto max-w-[1140px] py-2 justify-between">
        <Link href="/">
          <Logo />
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/">
            <span className="text-green-800">Monitores</span>
          </Link>

          {isLogged && (
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="text-sm text-red-600 font-semibold hover:underline"
            >
              Sair
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
