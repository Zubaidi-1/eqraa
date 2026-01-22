import { Suspense } from "react";
import Animations from "@/components/BooksLandingSkeleton";
import BlogContent from "@/components/BlogContent";

export default function RenderBlog({ params }) {
  // Pass the promise down — page stays sync
  return (
    <Suspense fallback={<Animations />}>
      <BlogContent blogParam={params} />
    </Suspense>
  );
}
