import FormData from "form-data";
import axios from "axios";

export const extractImageText = async (imageBuffer) => {
  const form = new FormData();
  form.append("file", imageBuffer, {
    filename: "image.jpg",
    contentType: "image/jpeg",
  });

  const response = await axios.post(
    "http://127.0.0.1:9000/ocr",
    form,
    { headers: form.getHeaders(), timeout: 60000 }
  );

  return response.data.text;
};
