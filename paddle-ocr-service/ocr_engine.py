from paddleocr import PaddleOCR
import cv2
import numpy as np
import tempfile
import os

# Initialize OCR ONCE (important for performance)
ocr = PaddleOCR(
    use_angle_cls=False,
    lang="en"
)

def run_ocr(image_bytes: bytes):
    # Save bytes to temp file (cv2 needs file or ndarray)
    with tempfile.NamedTemporaryFile(delete=False, suffix=".jpg") as tmp:
        tmp.write(image_bytes)
        tmp_path = tmp.name

    try:
        img = cv2.imread(tmp_path)

        if img is None:
            raise RuntimeError("Failed to read image")

        result = ocr.ocr(img)

        extracted_lines = []

        if result and len(result) > 0:
            for line in result[0]:
                data = line[1]

                if isinstance(data, (list, tuple)) and len(data) >= 1:
                    extracted_lines.append(data[0])

        text = "\n".join(extracted_lines)

        return {
            "text": text,
            "lines_detected": len(extracted_lines)
        }

    finally:
        os.remove(tmp_path)
