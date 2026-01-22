import { showSpecificBlog } from "@/actions/blogs/blogActions";
import Blog from "@/components/Blog";

export default async function BlogContent({ blogParam }) {
  const { blogId } = await blogParam;
  const { data, error } = await showSpecificBlog(blogId);

  if (error) throw error;

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
        blog_id={blogId}
      />
    </div>
  );
}
