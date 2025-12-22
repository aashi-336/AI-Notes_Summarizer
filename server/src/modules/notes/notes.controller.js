import Note from "./notes.model.js";

export const createNote = async (req, res) => {
  try {
    const note = await Note.create({
      userId: req.userId,
      summary: {
        text: "Dummy summary",
        type: "concise",
        language: "en"
      }
    });

    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
