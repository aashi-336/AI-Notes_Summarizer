from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from ocr_engine import run_ocr

app = FastAPI(title="PaddleOCR Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # lock later in prod
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/ocr")
async def ocr_image(file: UploadFile = File(...)):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Invalid file type")

    image_bytes = await file.read()

    try:
        result = run_ocr(image_bytes)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/health")
def health():
    return {"status": "ok"}
