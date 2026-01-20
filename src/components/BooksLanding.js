"use client";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { getBooks } from "@/actions/books/bookActions";
import BookCard from "@/components/BookCard";
import { useEffect, useState } from "react";

export default function BooksLanding({ category, categoryAR }) {
  const [books, setBooks] = useState([]);
  const [filter, setFilter] = useState(0);

  useEffect(() => {
    getBooks(category).then((res) => setBooks(res.data?.docs));
  }, []);

  const handleFilter = (type) => {
    if (type === "decrement") {
      setFilter((prev) => (prev === 0 ? 25 : prev - 5));
    }
    if (type === "increment") {
      setFilter((prev) => (prev === 25 ? 0 : prev + 5));
    }
  };

  return (
    <div className="w-full max-w-7xl flex flex-col gap-8 mt-8">
      {/* Title */}
      <h1 className="text-4xl font-bold tracking-wide text-right border-r-4           border-[#a3b18a] pr-4">
        {categoryAR}
      </h1>

      {/* Slider */}
      <div className="flex items-center gap-6 bg-[#ecebe4]    p-8 rounded-3xl shadow-lg">
        <button
          onClick={() => handleFilter("decrement")}
          className="p-3 rounded-full bg-white shadow    hover:scale-110 transition"
        >
          <NavigateBeforeIcon fontSize="large" />
        </button>

        <div className="flex gap-6 overflow-hidden">
          {books.slice(filter, filter + 5).map((book, i) => (
            <BookCard
              work_id={book.key}
              key={`${book.cover_i}-${i}`}
              author={book.author_name}
              title={book.title}
              languages={book.language}
              cover={book.cover_i}
            />
          ))}
        </div>

        <button
          onClick={() => handleFilter("increment")}
          className="p-3 rounded-full bg-white shadow  hover:scale-110 transition"
        >
          <NavigateNextIcon fontSize="large" />
        </button>
      </div>
    </div>
  );
}
