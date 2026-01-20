"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { blogLikeCount, likeBlog } from "@/actions/blogs/blogActions";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabse/client";

export default function Blog({ author, body, created_at, title, blog_id }) {
  const [countOfLikes, setCount] = useState(0);
  // * get likes count
  const supabase = createClient();

  const getCountOfLikes = async () => {
    const { count } = await blogLikeCount(blog_id);
    if (count) {
      setCount(count);
    } else return;
  };

  useEffect(() => {
    getCountOfLikes();
  }, []);
  // * like and unlike toggle
  const toggleLike = async (blog_id) => {
    const { liked } = await likeBlog(blog_id);
    if (liked) {
      setCount((prev) => prev + 1);
    } else setCount((prev) => prev - 1);
  };

  return (
    <article
      dir="rtl"
      className="mx-auto max-w-4xl bg-[#ecebe4] rounded-xl border border-[#1c1c1c] shadow-sm mt-8 mb-8 relative"
    >
      {/* Header */}
      <header className="border-b border-[#1c1c1c] p-6 text-center">
        <h1 className="text-4xl font-extrabold text-[#1c1c1c] leading-tight">
          {title}
        </h1>

        <div className="mt-4 flex justify-center gap-6 text-sm text-[#4a4a4a]">
          <span>✍ المؤلف: {author}</span>
          <span>📅 {created_at.split("T")[0]}</span>
        </div>
        <div className="text-[#3b3b3b] absolute top-2 left-2">
          <span>{countOfLikes}</span>
          <button
            onClick={() => {
              toggleLike(blog_id);
            }}
          >
            <FavoriteIcon className="hover:scale-110 transition ease-in-out duration-100"></FavoriteIcon>
          </button>
        </div>
      </header>

      {/* Content */}
      <section className="p-8">
        <div className="prose prose-neutral max-w-none text-[#1c1c1c] prose-li:text-[#1c1c1c] prose-blockquote:border-r-4 prose-blockquote:border-[#1c1c1c] prose-blockquote:bg-[#e2e2dc] prose-blockquote:px-4 prose-blockquote:py-2 prose-blockquote:text-[#1c1c1c] prose-strong:text-[#1c1c1c]">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
        </div>
      </section>
    </article>
  );
}
