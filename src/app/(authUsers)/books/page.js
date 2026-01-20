import BooksLanding from "@/components/BooksLanding";
import SearchBooks from "@/components/Search";

export default function Books() {
  return (
    <div className="min-h-screen bg-[#daddd8] flex flex-col items-center  py-20 text-[#1c1c1c] gap-16">
      {/* Search */}
      <div className="w-full max-w-xl">
        <SearchBooks />
      </div>

      {/* Categories */}
      <div className="flex flex-col gap-24 w-full items-center justify-center">
        <div>
          <BooksLanding category={"fantasy"} categoryAR={"الخيال"} />
          <BooksLanding category={"horror"} categoryAR={"الرعب"} />
          <BooksLanding category={"Literature"} categoryAR={"الأدب"} />
          <BooksLanding category={"Romance"} categoryAR={"رومانسي"} />
          <BooksLanding category={"Religion"} categoryAR={"كتب دينية"} />
          <BooksLanding category={"History"} categoryAR={"التاريخ"} />
        </div>
      </div>
    </div>
  );
}

// ! “Mary on a Mary on a cross
// ! Your beauty never ever scared me
//  ! Mary on a Mary on a cross”
