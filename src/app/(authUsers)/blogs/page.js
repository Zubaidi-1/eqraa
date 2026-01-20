import { getBlogs } from "@/actions/blogs/blogActions";
import BlogCard from "@/components/BlogCard";
import Link from "next/link";

export default async function Blogs() {
  const blogs = await getBlogs();
  console.log(blogs);

  return (
    <div className="min-h-screen bg-[#daddd8] flex flex-col justify-center items-center">
      <div>
        <h1 className="text-3xl text-[#1c1c1c] font-bold mb-8">
          أحدث المقالات
        </h1>
        <div className="flex justify-center gap-4 mb-4">
          <Link
            className="bg-[#404040] py-2 px-4 rounded text-[#daddd8] hover:bg-[#1c1c1c] transition ease-in-out duration-100"
            href={"/blogs/myblogs"}
          >
            {" "}
            مقالاتي
          </Link>
          <Link
            className="bg-[#1c1c1c] py-2 px-4 rounded  text-[#daddd8] hover:bg-[#404040] transition ease-in-out duration-100"
            href={"/blogs/create"}
          >
            {" "}
            + انشر مقال
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-8 " dir="rtl">
        {blogs.data.map((blog) => (
          <BlogCard
            title={blog.title}
            body={blog.body}
            author={blog.author}
            date={blog.created_at}
            key={blog.id}
            blog={blog.id}
          />
        ))}
      </div>
    </div>
  );
}
