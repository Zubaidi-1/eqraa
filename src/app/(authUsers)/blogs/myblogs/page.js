import { Suspense } from "react";
import { getMyBlogs } from "@/actions/blogs/blogActions";
import Animations from "@/components/BooksLandingSkeleton";
import BlogsGrid from "@/components/BlogsGrid";

export default function MyBlogs() {
  const blogsPromise = getMyBlogs();

  return (
    <div className="min-h-screen bg-[#daddd8] flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-8 text-[#1c1c1c]">مقالاتي</h1>

      <Suspense fallback={<Animations />}>
        <BlogsGrid blogsPromise={blogsPromise} />
      </Suspense>
    </div>
  );
}
