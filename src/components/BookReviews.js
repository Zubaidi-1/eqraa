"use client";

import { getReviews } from "@/actions/books/bookActions";
import { useEffect, useState } from "react";
import { Rating } from "@mui/material";
import { createClient } from "@/utils/supabse/client";

export default function BookReviews({ work_id }) {
  const supabase = createClient();

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);

  // 🔐 Get current user
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUserId(data?.user?.id ?? null);
    });
  }, []);

  // 📥 Initial fetch
  useEffect(() => {
    if (!work_id) return;

    const fetchReviews = async () => {
      try {
        setLoading(true);
        const { data, error } = await getReviews(work_id);
        if (error) throw error;
        setReviews(data || []);
      } catch (err) {
        console.error(err);
        setError("حدث خطأ أثناء تحميل المراجعات");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [work_id]);

  // 🔴 Realtime subscription
  useEffect(() => {
    if (!work_id) return;

    const channel = supabase
      .channel("reviews-realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "reviews",
          filter: `work_id=eq.${work_id}`,
        },
        (payload) => {
          setReviews((current) => {
            switch (payload.eventType) {
              case "INSERT":
                return [payload.new, ...current];
              case "UPDATE":
                return current.map((r) =>
                  r.id === payload.new.id ? payload.new : r,
                );
              case "DELETE":
                return current.filter((r) => r.id !== payload.old.id);
              default:
                return current;
            }
          });
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [work_id]);

  // 🗑 Delete review
  const handleDelete = async (id) => {
    const ok = confirm("هل أنت متأكد من حذف هذه المراجعة؟");
    if (!ok) return;

    await supabase.from("reviews").delete().eq("id", id);
    // Realtime will update UI automatically
  };

  // ⏳ Loading
  if (loading) {
    return (
      <div className="w-full text-center py-10 text-lg text-gray-600">
        جارٍ تحميل المراجعات…
      </div>
    );
  }

  // ❌ Error
  if (error) {
    return <div className="w-full text-center py-10 text-red-600">{error}</div>;
  }

  // 📭 Empty
  if (reviews.length === 0) {
    return (
      <div className="w-full text-center py-10">
        <h3 className="text-xl font-semibold">لا توجد مراجعات بعد</h3>
        <p className="text-gray-600 mt-1">كن أول من يكتب مراجعة لهذا الكتاب</p>
      </div>
    );
  }

  // ⭐ Reviews list
  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-6 mb-8">
      <h2 className="text-2xl font-bold text-[#2c2c2c]">آراء القرّاء</h2>

      {reviews.map((review) => (
        <div
          key={review.id}
          className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-3"
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <Rating value={review.rating} readOnly />
            <span className="text-sm text-gray-500">
              {new Date(review.created_at).toLocaleDateString("ar-SA")}
            </span>
          </div>

          {/* Review text */}
          <p className="text-gray-800 leading-relaxed">
            {review.review || "لم يتم إضافة نص للمراجعة"}
          </p>

          {/* Actions */}
          {userId === review.user_id && (
            <div className="flex justify-end">
              <button
                onClick={() => handleDelete(review.id)}
                className="
                  px-4 py-1.5
                  text-sm font-semibold
                  text-red-700
                  border border-red-300
                  rounded-md
                  hover:bg-red-50
                  hover:border-red-400
                  active:scale-95
                  transition
                  cursor-pointer
                "
              >
                حذف
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
