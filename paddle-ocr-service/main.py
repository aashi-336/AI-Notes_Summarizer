from fastapi import FastAPI, UploadFile, File
from paddleocr import PaddleOCR
import cv2
import numpy as np

app = FastAPI()

ocr = PaddleOCR(use_angle_cls=False, lang="en")

@app.post("/ocr")
async def ocr_image(file: UploadFile = File(...)):
    contents = await file.read()

    np_img = np.frombuffer(contents, np.uint8)
    img = cv2.imdecode(np_img, cv2.IMREAD_COLOR)

    if img is None:
        return {"text": "", "lines_detected": 0}

    result = ocr.ocr(img)

    lines = []
    for line in result[0]:
        text = line[1][0]
        lines.append(text)

    return {
        "text": "\n".join(lines),
        "lines_detected": len(lines)
    }
