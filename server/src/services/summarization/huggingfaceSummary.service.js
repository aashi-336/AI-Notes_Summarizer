// import axios from "axios";

// const HF_MODEL = "facebook/bart-large-cnn";
// const HF_ENDPOINT = `https://router.huggingface.co/hf-inference/models/${HF_MODEL}`;

// export const summarizeWithHF = async (text) => {
//   try {
//     const response = await axios.post(
//       HF_ENDPOINT,
//       {
//         inputs: text,
//         parameters: {
//           max_length: 500,
//           min_length: 200,
//           do_sample: false,
//         },
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
//           "Content-Type": "application/json",
//         },
//         timeout: 60000, // important for cold start
//       }
//     );

//     // HF sometimes returns array, sometimes object
//     const data = response.data;

//     if (Array.isArray(data) && data[0]?.summary_text) {
//       return data[0].summary_text;
//     }

//     if (data?.summary_text) {
//       return data.summary_text;
//     }

//     throw new Error("Unexpected HuggingFace response format");
//   } catch (error) {
//     console.error(
//       "❌ HF SUMMARY ERROR:",
//       error.response?.data || error.message
//     );
//     throw new Error("HuggingFace summarization failed");
//   }
// };
import axios from "axios";

const HF_MODEL = "facebook/bart-large-cnn";
const HF_ENDPOINT = `https://router.huggingface.co/hf-inference/models/${HF_MODEL}`;

const SUMMARY_CONFIG = {
  concise: {
    max_length: 120,
    min_length: 60,
    length_penalty: 2.0,
  },
  standard: {
    max_length: 250,
    min_length: 120,
    length_penalty: 1.0,
  },
  detailed: {
    max_length: 500,
    min_length: 250,
    length_penalty: 0.8,
  },
};

export const summarizeWithHF = async (text, summaryType = "standard") => {
  try {
    const config = SUMMARY_CONFIG[summaryType] || SUMMARY_CONFIG.standard;

    const response = await axios.post(
      HF_ENDPOINT,
      {
        inputs: text,
        parameters: {
          max_length: config.max_length,
          min_length: config.min_length,
          length_penalty: config.length_penalty,
          do_sample: false,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
        timeout: 60000,
      }
    );

    const data = response.data;

    if (Array.isArray(data) && data[0]?.summary_text) {
      return data[0].summary_text;
    }

    if (data?.summary_text) {
      return data.summary_text;
    }

    throw new Error("Unexpected HuggingFace response format");
  } catch (error) {
    console.error(
      "❌ HF SUMMARY ERROR:",
      error.response?.data || error.message
    );
    throw new Error("HuggingFace summarization failed");
  }
};
