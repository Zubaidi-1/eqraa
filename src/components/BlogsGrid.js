import { use } from "react";
import BlogCard from "@/components/BlogCard";

export default function BlogsGrid({ blogsPromise }) {
  const { data } = use(blogsPromise);

  return (
    <div className="grid grid-cols-3 gap-8" dir="rtl">
      {data.map((blog) => (
        <BlogCard
          key={blog.id}
          blog={blog.id}
          title={blog.title}
          body={blog.body}
          author={blog.author}
          date={blog.created_at}
          owner
        />
      ))}
    </div>
  );
}
