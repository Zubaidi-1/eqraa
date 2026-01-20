"use client";

import { registerSchema } from "@/schemas/auth/authSchema";
import { createClient } from "@/utils/supabse/client";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Register() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values) => {
    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        data: {
          display_name: values.name,
        },
      },
    });

    setLoading(false);

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    reset();
    setSuccessMessage("الرجاء التحقق من البريد الإلكتروني لإكمال التسجيل");
  };

  return (
    <div className="min-h-screen bg-[#daddd8] flex justify-center items-center px-4">
      <div className="bg-[#1c1c1c] rounded-xl shadow-lg w-full max-w-2xl">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 p-6 lg:p-10"
        >
          <h1 className="text-[#eef0f2] font-cairo text-lg lg:text-3xl font-bold text-center">
            انشاء حساب
          </h1>

          {errorMessage && (
            <p className="text-red-500 text-sm text-center">{errorMessage}</p>
          )}

          {successMessage && (
            <p className="text-green-500 text-sm text-center">
              {successMessage}
            </p>
          )}

          {/* Inputs */}
          <div className="flex flex-col gap-4 lg:grid lg:grid-cols-2 lg:gap-6">
            {/* Email */}
            <div className="flex flex-col text-end gap-1">
              <label
                className={`text-sm ${
                  errors.email ? "text-red-500" : "text-[#eef0f2]"
                }`}
              >
                البريد الالكتروني
              </label>
              <input
                {...register("email")}
                type="email"
                placeholder="example@email.com"
                className="text-end bg-transparent border p-2.5 rounded lg:text-lg focus:outline-0"
                style={{
                  borderColor: errors.email ? "red" : "#daddd8",
                }}
              />
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Name */}
            <div className="flex flex-col text-end gap-1">
              <label
                className={`text-sm ${
                  errors.name ? "text-red-500" : "text-[#eef0f2]"
                }`}
              >
                الاسم
              </label>
              <input
                {...register("name")}
                placeholder="الاسم"
                className="text-end bg-transparent border p-2.5 rounded lg:text-lg focus:outline-0"
                style={{
                  borderColor: errors.name ? "red" : "#daddd8",
                }}
              />
              {errors.name && (
                <p className="text-xs text-red-500">{errors.name.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col text-end gap-1">
              <label
                className={`text-sm ${
                  errors.password ? "text-red-500" : "text-[#eef0f2]"
                }`}
              >
                كلمة السر
              </label>
              <input
                {...register("password")}
                type="password"
                placeholder="••••••••"
                className="text-end bg-transparent border p-2.5 rounded lg:text-lg focus:outline-0"
                style={{
                  borderColor: errors.password ? "red" : "#daddd8",
                }}
              />
              {errors.password && (
                <p className="text-xs text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col text-end gap-1">
              <label
                className={`text-sm ${
                  errors.confirm_password ? "text-red-500" : "text-[#eef0f2]"
                }`}
              >
                تأكيد كلمة السر
              </label>
              <input
                {...register("confirm_password")}
                type="password"
                placeholder="••••••••"
                className="text-end bg-transparent border p-2.5 rounded lg:text-lg focus:outline-0"
                style={{
                  borderColor: errors.confirm_password ? "red" : "#daddd8",
                }}
              />
              {errors.confirm_password && (
                <p className="text-xs text-red-500">
                  {errors.confirm_password.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit */}
          <button
            disabled={loading}
            className={`py-3 rounded text-lg lg:text-xl font-semibold transition
              ${
                loading
                  ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                  : "bg-[#daddd8] text-[#1c1c1c] hover:bg-[#eef0f2]"
              }`}
          >
            {loading ? "جاري الانشاء..." : "انشاء"}
          </button>

          {/* Login */}
          <p className="text-end text-sm text-[#daddd8]">
            لديك حساب بالفعل؟{" "}
            <Link
              href="/auth/login"
              className="text-[#eef0f2] underline hover:opacity-80"
            >
              تسجيل الدخول
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
