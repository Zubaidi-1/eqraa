"use server";
export async function translateText(text, target = "ar") {
  if (!text) return "";

  const res = await fetch("https://libretranslate.com/translate", {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      q: text,
      source: "en",
      target,
      format: "text",
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("TRANSLATE ERROR:", res.status, errorText);
    return text; // fallback
  }

  const data = await res.json();
  return data.translatedText;
}
