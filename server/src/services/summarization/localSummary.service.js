import { spawn } from "child_process";
import path from "path";

export const summarizeLocally = (text) => {
  return new Promise((resolve, reject) => {

    // ✅ ABSOLUTE Python path (Anaconda env)
    const PYTHON_PATH = "C:\\Anaconda\\envs\\paddleocr\\python.exe";

    const scriptPath = path.join(
      process.cwd(),
      "src/services/summarization/localSummary.py"
    );

    const py = spawn(PYTHON_PATH, [scriptPath], {
      stdio: ["pipe", "pipe", "pipe"],
    });

    let output = "";
    let error = "";

    // 🔥 SEND OCR TEXT THROUGH STDIN
    py.stdin.write(text);
    py.stdin.end();

    py.stdout.on("data", (data) => {
      output += data.toString();
    });

    py.stderr.on("data", (data) => {
      error += data.toString();
    });

    py.on("close", (code) => {
      if (code !== 0) {
        console.error("🐍 Python summarizer crashed:", error);
        reject(new Error("Local summarization failed"));
      } else {
        resolve(output.trim());
      }
    });
    py.on("close", (code) => {
  if (code !== 0 || error) {
    reject(new Error("Local summarization failed"));
  } else {
    resolve(output.trim());
  }
});

// ⏱️ Kill Python if it hangs
setTimeout(() => {
  py.kill("SIGKILL");
  reject(new Error("Summarization timed out"));
}, 60_000); // 60 seconds max

  });
};
