import axios from "axios";

const HF_MODEL = "facebook/bart-large-cnn";
const HF_ENDPOINT = `https://router.huggingface.co/hf-inference/models/${HF_MODEL}`;

export const summarizeWithHF = async (text) => {
  try {
    const response = await axios.post(
      HF_ENDPOINT,
      {
        inputs: text,
        parameters: {
          max_length: 130,
          min_length: 40,
          do_sample: false,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
        timeout: 60000, // important for cold start
      }
    );

    // HF sometimes returns array, sometimes object
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
