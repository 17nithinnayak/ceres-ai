import axios from "axios";

export async function translateText(text, targetLang = "kn") {
  try {
    const res = await axios.post("https://libretranslate.com/translate", {
      q: text,
      source: "en",
      target: targetLang,
      format: "text"
    });
    return res.data.translatedText;
  } catch (error) {
    console.error("Translation error:", error);
    return text; // fallback to original
  }
}
