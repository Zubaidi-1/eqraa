"use client";

import { reviewSchema } from "@/schemas/review/reviewSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Rating from "@mui/material/Rating";
import { useState } from "react";
import { postReview } from "@/actions/books/bookActions";

export default function BookReview({ work_id }) {
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(reviewSchema),
  });

  // rating state
  const [value, setValue] = useState(0);
  const [ratingError, setRatingError] = useState("");
  const [submitError, setSubmitError] = useState("");

  const onSubmit = async (values) => {
    setSubmitError("");
    setRatingError("");

    if (!value) {
      setRatingError("الرجاء اختيار التقييم");
      return;
    }

    values.rating = value;
    values.work_id = work_id;

    const { error } = await postReview(values);

    if (error) {
      console.log(error);

      setSubmitError("حدث خطأ أثناء إرسال التقييم، حاول مرة أخرى");
      return;
    }

    reset();
    setValue(0);
  };

  return (
    <div className="max-w-5xl w-full bg-white p-8 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold text-[#2c2c2c] mb-4 text-right">
        أضف تقييمك
      </h2>

      <form
        className="flex flex-col gap-4"
        dir="rtl"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Review textarea */}
        <div>
          <textarea
            {...register("review")}
            placeholder="اكتب مراجعتك هنا..."
            rows={5}
            className="p-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-right"
          />
          {errors.review && (
            <p className="text-red-500 text-sm mt-1">{errors.review.message}</p>
          )}
        </div>

        {/* Rating */}
        <div dir="ltr">
          <Rating
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
              setRatingError("");
            }}
          />
          {ratingError && (
            <p className="text-red-500 text-sm mt-1">{ratingError}</p>
          )}
        </div>

        {/* Submission error */}
        {submitError && (
          <p className="text-red-600 text-sm text-right">{submitError}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-[#1c1c1c] disabled:opacity-60 disabled:cursor-not-allowed text-[#daddd8] px-6 py-3 rounded-lg shadow-md hover:bg-[#333333] transition-colors font-semibold"
        >
          {isSubmitting ? "جاري الإرسال..." : "إرسال التقييم"}
        </button>
      </form>
    </div>
  );
}
