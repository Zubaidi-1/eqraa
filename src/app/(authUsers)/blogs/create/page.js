"use client";

import { addBlog } from "@/actions/blogs/blogActions";
import { addBlogSchema } from "@/schemas/blogs/blogSchema";
import { createClient } from "@/utils/supabse/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function create() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const {
    register,
    reset,
    isSubmitting,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addBlogSchema),
  });

  const onSubmit = async (values) => {
    const supabase = createClient();
    let author;
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      author = user?.user_metadata?.display_name;
    } catch (error) {
      console.log("Auth error:", error);
    }
    values.author = author;
    const { data, error } = await addBlog(values);
    if (error) {
      setErrorMessage(error.message);
      setSuccessMessage(null);
      return;
    }
    setSuccessMessage("تم نشر المقال بنجاح");
    setErrorMessage(null);
    reset();
  };

  return (
    <div className="min-h-screen bg-[#daddd8] flex flex-col justify-center items-center p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-[#1c1c1c] p-6 rounded-xl shadow-lg min-w-[24rem] max-w-3xl w-full flex flex-col gap-6"
      >
        <h1 className="font-cairo text-2xl mb-4 text-end text-white">
          هنا تُكتب الحكايات التي خلّفتها القراءة
        </h1>

        {successMessage && (
          <p className="text-end text-green-500 font-semibold">
            {successMessage}
          </p>
        )}
        {errorMessage && (
          <p className="text-end text-red-500 font-semibold">{errorMessage}</p>
        )}

        <div className="flex flex-col gap-1">
          <label className="text-end text-gray-200 font-semibold">
            العنوان
          </label>
          <input
            {...register("title")}
            className="text-end border border-gray-600 p-3 rounded-lg bg-[#2a2a2a] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#9ca3af]"
            placeholder="عنوان يضيء المحتوى"
          />
          {errors.title && (
            <p className="text-end text-sm text-red-500">
              {errors.title.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-end text-gray-200 font-semibold">المقال</label>
          <textarea
            dir="rtl"
            {...register("body")}
            className="text-end border border-gray-600 p-3 rounded-lg bg-[#2a2a2a] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#9ca3af] min-h-[200px] resize-none"
            placeholder="سطر من روحك"
          />
          {errors.body && (
            <p className="text-end text-sm text-red-500">
              {errors.body.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="self-end bg-[#9ca3af] text-black font-semibold px-6 py-3 rounded-lg hover:bg-[#b0b6bc] transition-colors duration-200"
        >
          إرسال
        </button>
      </form>
    </div>
  );
}
