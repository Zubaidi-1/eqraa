"use server";
import { createClient } from "@/utils/supabse/server";
import { cookies } from "next/headers";

export const addBlog = async (values) => {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase
    .from("blogs")
    .insert({ title: values.title, body: values.body, author: values.author });
  return { data, error };
};

// ! we get recent
export const getBlogs = async () => {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  // Fetch blogs
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .order("created_at", { ascending: false });
  return { data, error };
};

// ! logged in user's blogs

export const getMyBlogs = async () => {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const user = (await supabase.auth.getUser()).data.user.id;
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("user_id", user);

  return { data, error };
};

// ! delete blogs

export const deleteBlog = async (blog_id) => {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase.from("blogs").delete().eq("id", blog_id);
  return { error };
};

export const showSpecificBlog = async (blog_id) => {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("id", blog_id);
  return { data, error };
};

export const blogLikeCount = async (blog_id) => {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { count } = await supabase
    .from("bloglikes")
    .select("*", { count: "exact", head: true })
    .eq("blog_id", blog_id);

  return { count };
};

export const likeBlog = async (blog_id) => {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const user_id = (await supabase.auth.getUser()).data.user.id;

  const { data: existing } = await supabase
    .from("bloglikes")
    .select("*")
    .eq("blog_id", blog_id)
    .eq("user_id", user_id)
    .maybeSingle();

  console.log(existing, "existing");

  if (existing) {
    const { error } = await supabase
      .from("bloglikes")
      .delete()
      .eq("blog_id", blog_id)
      .eq("user_id", user_id);

    console.log(error, "delete");
  } else {
    const { error } = await supabase.from("bloglikes").insert({ blog_id });
    console.log(error, "insert");
  }
  return {
    liked: !existing,
  };
};
