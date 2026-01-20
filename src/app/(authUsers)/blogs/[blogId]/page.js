import { showSpecificBlog } from "@/actions/blogs/blogActions";
import Blog from "@/components/Blog";
import BlogInteractions from "@/components/BlogInteractions";

export default async function RenderBlog({ params }) {
  const { blogId } = await params;
  console.log(blogId);

  const { data, error } = await showSpecificBlog(blogId);
  console.log(data, error);
  const blog = data[0];
  return (
    <div
      className="min-h-screen bg-[#daddd8] flex justify-around items-around"
      dir="rtl"
    >
      <Blog
        author={blog.author}
        title={blog.title}
        body={blog.body}
        created_at={blog.created_at}
        key={blogId}
        blog_id={blogId}
      />
    </div>
  );
}
