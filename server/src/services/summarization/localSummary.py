import sys
import logging
from transformers import pipeline

logging.getLogger("transformers").setLevel(logging.ERROR)

# ⚡ FAST model (production safe)
summarizer = pipeline(
    "summarization",
    model="sshleifer/distilbart-cnn-12-6"
)

def summarize(text: str) -> str:
    text = text.strip()

    if len(text) < 50:
        return text

    # 🔥 HARD LIMIT to avoid hangs
    text = text[:2000]

    result = summarizer(
        text,
        max_length=120,
        min_length=40,
        do_sample=False
    )
    return result[0]["summary_text"]


if __name__ == "__main__":
    input_text = sys.stdin.read()

    if not input_text.strip():
        print("")
        sys.exit(0)

    print(summarize(input_text))
