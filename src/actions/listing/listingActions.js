"use server";
import { createClient } from "@/utils/supabse/server";
import { cookies } from "next/headers";

export const imageUpload = async (image) => {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  console.log("we here>");

  const filePath = `${image.name}-${Date.now()}`;
  const { error } = await supabase.storage
    .from("listing")
    .upload(filePath, image);

  if (error) {
    console.error("Error Uploading: ", error.message);
    console.log(error);

    return null;
  }
  const { data } = await supabase.storage
    .from("listing")
    .getPublicUrl(filePath);
  return data.publicUrl;
};

export const addListing = async (values) => {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  console.log("we here>");

  const { error } = await supabase.from("booklisting").insert({ ...values });

  return { error };
};

export const getListings = async (category) => {
  // ! This gets listings based on category, it might be better
  // ! So we don't fetch ALL from the server if the user knows what to search
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  if (category === "all") {
    const { data, error } = await supabase.from("booklisting").select("*");
    return { data, error };
  }
  const { data, error } = await supabase
    .from("booklisting")
    .select("*")
    .eq("category", category);

  return { data, error };
};

export const deleteListing = async (listing) => {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { error } = await supabase
    .from("booklisting")
    .delete()
    .eq("id", listing);
  return { error };
};
