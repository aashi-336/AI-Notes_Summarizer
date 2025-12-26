import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const res = await axios.post(
  "https://router.huggingface.co/hf-inference/models/facebook/bart-large-cnn",
  { inputs: "Artificial intelligence is changing education rapidly." },
  {
    headers: {
      Authorization: `Bearer ${process.env.HF_API_KEY}`,
      "Content-Type": "application/json",
    },
  }
);

console.log(res.data);
