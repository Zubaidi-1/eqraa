"use client";
import { useState } from "react";
import Link from "next/link";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteBlog } from "@/actions/blogs/blogActions";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
export default function BlogCard({
  title,
  author,
  date,
  body,
  owner,
  blog,
  onDelete,
}) {
  const [isDeleted, setIsDeleted] = useState(false);

  body = body?.slice(0, 30);
  date = date.split("T")[0];

  // Handle delete action
  const handleClick = async () => {
    const { error } = await deleteBlog(blog);
    if (error) {
      console.error(error.message);
    } else {
      setIsDeleted(true); // Mark as deleted
      if (onDelete) {
        onDelete(blog); // Notify parent component to remove the blog from the list
      }
    }
  };

  if (isDeleted) {
    return null; // Return nothing if the blog is deleted
  }

  return (
    <div className="relative border p-4 text-[#ecebe4] rounded bg-[#1c1c1c] text-start shadow shadow-[#1c1c1c] hover:scale-110 transition ease-in-out duration-100">
      {owner && (
        <button
          className="absolute top-2 left-2 cursor-pointer"
          onClick={handleClick}
        >
          <DeleteIcon />
        </button>
      )}

      <div className="flex flex-col gap-3 mb-4 border-b border-[#ecebe4] pb-1">
        <h1 className="text-lg">العنوان: {title}</h1>
        <h2>المؤلف: {author}</h2>
        <h3>التاريخ: {date}</h3>
      </div>

      <div className="text-start" dir="rtl">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
      </div>

      <Link className="underline hover:text-[#393939]" href={`/blogs/${blog}`}>
        اقرا المزيد
      </Link>
    </div>
  );
}
