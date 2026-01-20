import Link from "next/link";

export default function Nav() {
  return (
    <nav className="bg-[#1c1c1c] p-4 flex justify-between lg:p-5">
      <div className="flex gap-3 items-center">
        <Link href={"/"}>تسجيل خروج</Link>

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
