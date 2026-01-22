"use client";

import { addListing, imageUpload } from "@/actions/listing/listingActions";
import { ListingSchema } from "@/schemas/listing/listingSchema";
import { createClient } from "@/utils/supabse/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function CreateListing() {
  useEffect(() => {
    const checkUser = async () => {
      const supabase = createClient();
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        redirect("/auth/login");
      }
    };
    checkUser();
  }, []);
  // ! form handling
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ListingSchema),
  });

  // ! image handling
  const [listingImage, setListingImage] = useState(null);

  // ! messages
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setListingImage(e.target.files[0]);
    }
  };

  const onSubmit = async (values) => {
    setSuccessMessage("");
    setErrorMessage("");

    let image_url = null;
    if (listingImage) {
      image_url = await imageUpload(listingImage);
      values.image_url = image_url;
    }

    const { error } = await addListing(values);

    if (error) {
      setErrorMessage("حدث خطأ أثناء رفع الكتاب");
    } else {
      setSuccessMessage("تم رفع الكتاب بنجاح");
      reset();
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#d2d2d2] p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-[#1c1c1c] text-white p-6 rounded-lg shadow-md flex flex-col gap-5"
        dir="rtl"
      >
        <h1 className="text-3xl font-bold text-center mb-4">اعرض كتابك</h1>

        {successMessage && (
          <p className="text-sm text-green-400 text-center">{successMessage}</p>
        )}

        {errorMessage && (
          <p className="text-sm text-red-500 text-center">{errorMessage}</p>
        )}

        <div className="flex flex-col">
          <label className="mb-1 text-sm font-semibold">عنوان الكتاب</label>
          <input
            {...register("name")}
            className="p-2 rounded bg-[#111111] border border-[#161616] focus:outline-none focus:ring-2 focus:ring-[#777777]"
            placeholder="مقدمة ابن خلدون"
          />
          {errors.name ? (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          ) : (
            ""
          )}
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-semibold">المؤلف</label>
          <input
            {...register("author")}
            className="p-2 rounded bg-[#111111] border border-[#161616] focus:outline-none focus:ring-2 focus:ring-[#777777]"
            placeholder="ابن خلدون"
          />
          {errors.author ? (
            <p className="text-sm text-red-500">{errors.author.message}</p>
          ) : (
            ""
          )}
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-semibold">
            رقم الكتاب (اختياري)
          </label>
          <input
            {...register("isbn")}
            className="p-2 rounded bg-[#111111] border border-[#161616] focus:outline-none focus:ring-2 focus:ring-[#777777]"
            placeholder="ISBN"
          />
          {errors.isbn ? (
            <p className="text-sm text-red-500">{errors.isbn.message}</p>
          ) : (
            ""
          )}
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-semibold">السعر</label>
          <input
            {...register("price")}
            className="p-2 rounded bg-[#111111] border border-[#161616] focus:outline-none focus:ring-2 focus:ring-[#777777]"
            placeholder="5 دنانير"
            type="number"
          />
          {errors.price ? (
            <p className="text-sm text-red-500">{errors.price.message}</p>
          ) : (
            ""
          )}
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-semibold">رقم الهاتف</label>
          <input
            {...register("phone_number")}
            className="p-2 rounded bg-[#111111] border border-[#161616] focus:outline-none focus:ring-2 focus:ring-[#777777]"
            placeholder="07777777777"
          />
          {errors.phone_number ? (
            <p className="text-sm text-red-500">
              {errors.phone_number.message}
            </p>
          ) : (
            ""
          )}
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-semibold">
            اسمك (او الاسم الذي تحب)
          </label>
          <input
            {...register("display_name")}
            className="p-2 rounded bg-[#111111] border border-[#161616] focus:outline-none focus:ring-2 focus:ring-[#777777]"
            placeholder="07777777777"
          />
          {errors.display_name ? (
            <p className="text-sm text-red-500">
              {errors.display_name.message}
            </p>
          ) : (
            ""
          )}
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-semibold"> نوع الكتاب</label>
          <select
            {...register("category")}
            className="p-2 rounded bg-[#111111] border border-[#161616] focus:outline-none focus:ring-2 focus:ring-[#777777]"
          >
            <option value={"روايات"}>روايات</option>
            <option value={"تطوير الذات"}> تطوير الذات</option>
            <option value={"تاريخ"}>تاريخ</option>
            <option value={"علوم دينية"}>علوم دينية</option>
            <option value={"كتب اطفال"}>كتب اطفال</option>
            <option value={"كنب جامعية"}>كتب جامعية</option>
            <option value={"اخر"}>اخر</option>
          </select>

          {errors.category ? (
            <p className="text-sm text-red-500">{errors.category.message}</p>
          ) : (
            ""
          )}
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-sm font-semibold">كيفية البيع</label>
          <select
            {...register("buy_or_trade")}
            className="p-2 rounded bg-[#111111] border border-[#161616] focus:outline-none focus:ring-2 focus:ring-[#777777]"
          >
            <option value={"بيع"}>بيع</option>
            <option value={"البدل"}>للبدل</option>
          </select>
          {errors.buy_or_trade ? (
            <p className="text-sm text-red-500">
              {errors.buy_or_trade.message}
            </p>
          ) : (
            ""
          )}
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-sm font-semibold">
            امكانية التوصيل (يرجى ادخال تكلفة التوصيل مع السعر المراد)
          </label>
          <select
            {...register("delivery")}
            className="p-2 rounded bg-[#111111] border border-[#161616] focus:outline-none focus:ring-2 focus:ring-[#777777]"
          >
            <option value={"نعم"}>نعم</option>
            <option value={"لا"}>لا</option>
          </select>
          {errors.delivery ? (
            <p className="text-sm text-red-500">{errors.delivery.message}</p>
          ) : (
            ""
          )}
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-sm font-semibold">صورة للكتاب</label>
          <input
            onChange={(e) => {
              handleFileChange(e);
            }}
            type="file"
            className="p-2 rounded bg-[#111111] border border-[#161616] focus:outline-none focus:ring-2 focus:ring-[#777777]"
          />
        </div>

        <button
          type="submit"
          className="mt-4 bg-[#777777] hover:bg-[#494949] transition-colors p-2 rounded font-semibold"
        >
          رفع الكتاب
        </button>
      </form>
    </div>
  );
}
