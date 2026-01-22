"use client";

import { signOut } from "@/actions/user/userActions";
import { useTransition } from "react";

export default function SignOutButton() {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(() => signOut());
  };

  return (
    <button onClick={handleClick} disabled={isPending}>
      {isPending ? "جاري تسجيل الخروج..." : "تسجيل الخروج"}
    </button>
  );
}
