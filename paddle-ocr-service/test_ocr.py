from paddleocr import PaddleOCR
import cv2

ocr = PaddleOCR(
    use_angle_cls=False,
    lang="en"
)

img = cv2.imread("test_ayushii.jpg")

if img is None:
    raise RuntimeError("Image not found")

result = ocr.ocr(img)

print("\n=== OCR OUTPUT ===\n")

for line in result[0]:
    data = line[1]

    if isinstance(data, (list, tuple)):
        if len(data) == 2:
            text, conf = data
            print(f"{text}  ({conf:.2f})")
        elif len(data) == 1:
            print(data[0])
    else:
        print(data)
