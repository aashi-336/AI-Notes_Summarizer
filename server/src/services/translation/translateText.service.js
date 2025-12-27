// import axios from "axios";

// const HF_BASE = "https://router.huggingface.co/hf-inference/models";



// const MODEL_MAP = {
//   hi: "Helsinki-NLP/opus-mt-en-hi",
//   gu: "Helsinki-NLP/opus-mt-en-gu",
//   mr: "Helsinki-NLP/opus-mt-en-mr",
// };

// export const translateText = async (text, targetLang) => {
//   if (!text || targetLang === "en") return text;

//   const model = MODEL_MAP[targetLang];
//   if (!model) throw new Error(`Unsupported language: ${targetLang}`);

//   try {
//     const res = await axios.post(
//       `${HF_BASE}/${model}`,
//       { inputs: text },
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
//           "Content-Type": "application/json",
//         },
//         timeout: 60000,
//       }
//     );

//     const data = res.data;

//     if (Array.isArray(data) && data[0]?.translation_text) {
//       return data[0].translation_text;
//     }

//     if (data?.translation_text) {
//       return data.translation_text;
//     }

//     throw new Error("Unexpected translation response");
//   } catch (err) {
//     console.error("❌ TRANSLATION ERROR:", err.response?.data || err.message);
//     throw new Error("Translation failed");
//   }
// };
import axios from "axios";

const HF_ENDPOINT = "https://router.huggingface.co/hf-inference/models";

const MODEL_MAP = {
  hi: "Helsinki-NLP/opus-mt-en-hi",
  gu: "Helsinki-NLP/opus-mt-en-gu",
  mr: "Helsinki-NLP/opus-mt-en-mr",
};

export const translateText = async (text, targetLang) => {
  if (!text || targetLang === "en") return text;

  const model = MODEL_MAP[targetLang];
  if (!model) throw new Error(`Unsupported language: ${targetLang}`);

  try {
    const res = await axios.post(
      `${HF_ENDPOINT}/${model}`,
      {
        inputs: text,
        task: "translation", // ⭐ THIS IS THE KEY FIX
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
        timeout: 60000,
      }
    );

    const data = res.data;

    if (Array.isArray(data) && data[0]?.translation_text) {
      return data[0].translation_text;
    }

    if (data?.translation_text) {
      return data.translation_text;
    }

    throw new Error("Unexpected translation response");
  } catch (err) {
    console.error(
      "❌ TRANSLATION ERROR:",
      err.response?.data || err.message
    );
    throw new Error("Translation failed");
  }
};
