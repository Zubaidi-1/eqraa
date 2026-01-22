import { createClient } from "@/utils/supabse/server";
import { cookies } from "next/headers";
import Link from "next/link";
import Signout from "./Signout";

export default async function Nav() {
  return (
    <nav className="bg-[#1c1c1c] p-4 flex justify-between lg:p-5">
      <div className="flex gap-3 items-center">
        <Signout>تسجيل خروج</Signout>

        <Link href={"/blogs"}>المقالات</Link>
        <Link className="hidden lg:block" href={"/store"}>
          المتجر
        </Link>

        <Link href={"/books"}>الكتب</Link>
      </div>
      <h1 className="text-xl lg:text-2xl">رِوَاق</h1>
    </nav>
  );
}
