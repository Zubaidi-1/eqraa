"use server";
import { createClient } from "@/utils/supabse/server";
import { cookies } from "next/headers";

export const getBooks = async (category) => {
  // ! I see fetching 6 categories with one call (and break them later) is better than 6 different calls at the first page
  // !  if the user asked specifically for a category we will have a different function
  const api_url = `https://openlibrary.org/search.json?q=${category}&fields=key,title,author_name,language,cover_i&limit=30`;

  // * headers ( i took it from documentation)
  const headers = new Headers({
    "User-Agent": "rewaq/1.0 (Haykomouridian@gmail.com)",
  });
  const options = {
    method: "GET",
    headers: headers,
  };
  try {
    const response = await fetch(api_url, options);
    const data = await response.json();
    if (!response.ok) {
      return { error: `An error has occured :${data.error}` };
    }
    return { data };
  } catch (e) {
    return { error: `An error has occured :${e.message}` };
  }
};

export const getBookDetails = async (workId) => {
  const headers = new Headers({
    "User-Agent": "rewaq/1.0 (Haykomouridian@gmail.com)",
  });
  const options = {
    method: "GET",
    headers: headers,
  };
  const api_url = `https://openlibrary.org/works/${workId}.json`;
  try {
    const response = await fetch(api_url, options);
    const data = await response.json();
    if (!response.ok) {
      return { error: `An error has occured :${data.error}` };
    }
    return { data };
  } catch (e) {
    return { error: `An error has occured :${e.message}` };
  }
};

export const postReview = async (values) => {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { error } = await supabase.from("reviews").insert({ ...values });
  if (error) {
    return { error };
  }
  return { error };
};

export const getReviews = async (work_id) => {
  console.log(work_id);

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("work_id", work_id);
  return { data, error };
};

// *  avg Rating

export const getBookAvgRating = async (work_id) => {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("reviews")
    .select("rating")
    .eq("work_id", work_id);

  if (error) return { avgRating: null, error };

  if (!data || data.length === 0) return { avgRating: 0, error: null };

  // Loop over ratings and calculate average
  const total = data.reduce((sum, review) => sum + review.rating, 0);
  const avgRating = total / data.length;

  return { avgRating, error: null };
};

// search

export const searchBooks = async (search) => {
  const api_url = "https://openlibrary.org/search.json?q=";
  const query = encodeURIComponent(search);
  const url = `${api_url}${query}&limit=5`;

  const headers = new Headers({
    "User-Agent": "rewaq/1.0 (Haykomouridian@gmail.com)",
  });
  const options = {
    method: "GET",
    headers: headers,
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    if (!response.ok) {
      return { error: `An error has occured :${data.error}` };
    }
    return { data };
  } catch (e) {
    return { error: `An error has occured :${e.message}` };
  }
};
