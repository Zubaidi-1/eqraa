import QuoteDisplay from "@/components/QuoteDisplay";
import { Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

//1c1c1c  daddd8
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-[#daddd8] gap-4 lg:gap-8 lg:flex-row lg:justify-around">
      <div className="hidden lg:block">
        <QuoteDisplay />
      </div>
      <div className="flex flex-col gap-4 lg:gap-8">
        <h1 className="font-bold font-cairo leading-relaxed text-xl text-[#1c1c1c] lg:text-4xl ">
          أَعَزُّ مَكانٍ في الدُنى سَرجُ سابِحٍ <br></br>وَخَيرُ جَليسٍ في
          الزَمانِ كِتابُ
        </h1>
        <div className="flex gap-2 lg:self-start">
          <Link
            href={"/books"}
            className="bg-[#1c1c1c] py-3 px-4 rounded text-xl"
          >
            تصفح الكتب
          </Link>
          <Link
            href={"/auth/register"}
            className="text-[#1c1c1c] border py-3 px-4 rounded text-xl hover:bg-[#1c1c1c] hover:text-[white] transition ease-out duration-75"
          >
            انشاء حساب
          </Link>
        </div>
      </div>
    </div>
  );
}
