// ! it should have a link for the author's image, or any anon for the unknown
// ! The quote body
// !  The name ( Can be مجهول)

import { cairo } from "@/app/layout";
import Image from "next/image";

export default function QuoteDisplay({
  name,
  quote,
  image_url,
  font,
  book,
  date,
}) {
  return (
    <div className="flex gap-4 bg-[#1c1c1c] p-6 rounded shadow-2xl shadow-[#1c1c1c] hover:scale-110 transition ease-out duration-300">
      <div className="font-cairo text-[#daddd8] text-end flex flex-col gap-2">
        <h1 className={` ${cairo.className} text-lg  font-extrabold`}>
          ابن خلدون
        </h1>
        <p className="text-[#eef0f2] eef0f2">
          {quote
            ? quote
            : "إن غلبة اللغة بغلبة أهلها, وأن منزلتها بين اللغات صورة لمنزلة دولتها  بين الأمم "}
        </p>
        <h3 className="text-sm text-[#ecebe4]">
          <span>{book ? book : "مقدمة ابن خلدون"}</span> - <span>1377</span>
        </h3>
      </div>
      <div className="w-20 h-20 overflow-hidden rounded-full">
        <Image
          src={
            image_url
              ? image_url
              : "https://images.gr-assets.com/authors/1734514013p8/17863957.jpg"
          }
          width={80}
          height={80}
          alt="Ibn-Khaldun"
          className="object-cover"
        />
      </div>
    </div>
  );
}
