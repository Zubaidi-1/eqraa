"use server";

import { createClient } from "@/utils/supabse/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const signOut = async () => {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error(error);
    return;
  }

  redirect("/");
};
