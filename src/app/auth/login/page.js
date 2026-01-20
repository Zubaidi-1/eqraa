"use client";

import { signinSchema } from "@/schemas/auth/authSchema";
import { createClient } from "@/utils/supabse/client";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signinSchema),
  });

  const onSubmit = async (values) => {
    setLoading(true);
    setAuthError("");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    setLoading(false);

    if (error) {
      setAuthError("البريد الإلكتروني أو كلمة المرور غير صحيحة");
      return;
    }

    reset();
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#daddd8] flex justify-center items-center px-4">
      <div className="bg-[#1c1c1c] rounded-xl shadow-lg w-full max-w-md">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 p-6 lg:p-10"
        >
          <h1 className="text-[#eef0f2] font-cairo text-lg lg:text-3xl font-bold text-center">
            تسجيل الدخول
          </h1>

          {/* Global auth error */}
          {authError && (
            <p className="text-red-400 text-sm text-center">{authError}</p>
          )}

          <div className="flex flex-col gap-4">
            {/* Email */}
            <div className="flex flex-col text-end gap-1">
              <label className="text-sm text-[#eef0f2]">
                البريد الالكتروني
              </label>
              <input
                {...register("email")}
                type="email"
                placeholder="example@email.com"
                className="text-end bg-transparent border p-2.5 rounded border-[#daddd8] focus:outline-0 focus:border-[#eef0f2] lg:text-lg"
              />
              {errors.email && (
                <span className="text-red-400 text-xs">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col text-end gap-1">
              <label className="text-sm text-[#eef0f2]">كلمة السر</label>
              <input
                {...register("password")}
                type="password"
                placeholder="••••••••"
                className="text-end bg-transparent border p-2.5 rounded border-[#daddd8] focus:outline-0 focus:border-[#eef0f2] lg:text-lg"
              />
              {errors.password && (
                <span className="text-red-400 text-xs">
                  {errors.password.message}
                </span>
              )}
            </div>
          </div>

          <button
            disabled={loading}
            className={`py-3 rounded text-[#1c1c1c] text-lg lg:text-xl font-semibold transition
              ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#daddd8] hover:bg-[#eef0f2]"
              }
            `}
          >
            {loading ? "جاري تسجيل الدخول..." : "دخول"}
          </button>

          <p className="text-end text-sm text-[#daddd8]">
            ليس لديك حساب؟{" "}
            <Link
              href="/auth/register"
              className="text-[#eef0f2] underline cursor-pointer"
            >
              انشاء حساب
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
