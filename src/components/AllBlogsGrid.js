import { getBlogs } from "@/actions/blogs/blogActions";
import BlogCard from "@/components/BlogCard";

export default async function AllBlogs({}) {
  const blogs = await getBlogs();
  return (
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
  );
}
