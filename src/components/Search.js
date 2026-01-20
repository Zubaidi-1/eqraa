"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { searchBooks } from "@/actions/books/bookActions";

export default function BookSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);
  const router = useRouter();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setResults([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounced search
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timeout = setTimeout(async () => {
      setLoading(true);
      const res = await searchBooks(query);
      setResults(res?.data?.docs || []);
      setLoading(false);
    }, 350);

    return () => clearTimeout(timeout);
  }, [query]);

  const handleSelect = (key) => {
    const workId = key.split("/").pop();
    setResults([]);
    setQuery("");
    router.push(`/books/works/${workId}`);
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-xl mx-auto">
      {/* Search Input */}
      <div className="flex items-center gap-2 rounded-xl border bg-white px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500">
        <span className="text-gray-400">🔍</span>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search books, authors..."
          className="w-full outline-none text-sm"
        />
      </div>

      {/* Dropdown */}
      {(loading || results.length > 0) && (
        <div className="absolute z-20 mt-2 w-full rounded-xl border bg-white shadow-lg overflow-hidden">
          {loading && (
            <p className="px-4 py-3 text-sm text-gray-500">Searching…</p>
          )}

          {results.map((book) => (
            <div
              key={book.key}
              onClick={() => handleSelect(book.key)}
              className="flex gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50 transition"
            >
              {/* Cover */}
              <img
                src={
                  book.cover_i
                    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-S.jpg`
                    : "/book-placeholder.png"
                }
                alt={book.title}
                className="h-12 w-9 rounded object-cover bg-gray-100"
              />

              {/* Info */}
              <div className="min-w-0">
                <p className="truncate font-medium text-sm">{book.title}</p>
                {book.author_name && (
                  <p className="truncate text-xs text-gray-500">
                    {book.author_name[0]}
                  </p>
                )}
              </div>
            </div>
          ))}

          {!loading && results.length === 0 && (
            <p className="px-4 py-3 text-sm text-gray-500">No results found</p>
          )}
        </div>
      )}
    </div>
  );
}
