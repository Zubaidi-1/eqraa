import { getBookDetails, getBookAvgRating } from "@/actions/books/bookActions";
import BookReview from "@/components/BookReview";
import BookReviews from "@/components/BookReviews";
import Image from "next/image";
import { Rating } from "@mui/material";

export default async function bookDetail({ params }) {
  const { workid } = await params;

  // Fetch book details
  const details = await getBookDetails(workid);
  const book = details.data;

  // Fetch average rating
  const { avgRating } = await getBookAvgRating(workid);

  const coverUrl = book?.covers?.length
    ? `https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`
    : "/book-placeholder.png";

  return (
    <div className="min-h-screen bg-[#daddd8] px-20 pt-28 text-[#1c1c1c] flex flex-col items-center justify-center gap-10">
      {/* Book Card */}
      <div className="flex gap-16 items-start max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8 w-full mt-8">
        {/* Book cover */}
        <Image
          className="rounded-xl shadow-md"
          width={220}
          height={330}
          src={coverUrl}
          alt={book.title}
          priority
        />

        {/* Book info */}
        <div className="flex flex-col gap-6 flex-1">
          <h1 className="text-3xl font-extrabold text-[#2c2c2c] drop-shadow-sm">
            {book.title}
          </h1>

          {/* Average rating */}
          {avgRating > 0 && (
            <div className="flex items-center gap-2">
              <Rating value={avgRating} precision={0.1} readOnly />
              <span className="text-gray-600">{avgRating.toFixed(1)} / 5</span>
            </div>
          )}

          {/* Description */}
          <span className="max-w-prose leading-relaxed text-[#3c3c3c] bg-[#f5f5f0] shadow-inner p-5 rounded-lg">
            {typeof book.description === "string"
              ? book.description
              : book.description?.value}
          </span>

          {/* Subjects */}
          <div className="flex gap-3">
            {book.subjects?.slice(0, 3).map((subject) => (
              <span
                key={subject}
                className="bg-[#1c1c1c] text-[#daddd8] rounded px-6 py-2 shadow-md hover:bg-[#333333] transition-colors cursor-default select-none"
              >
                {subject}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Review Form */}
      <BookReview work_id={workid} />

      {/* Reviews List */}
      <BookReviews work_id={workid} />
    </div>
  );
}
