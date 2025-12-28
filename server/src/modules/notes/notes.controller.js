// import Note from "./notes.model.js";

// export const createNote = async (req, res) => {
//   try {
//     const note = await Note.create({
//       userId: req.userId,
//       summary: {
//         text: "Dummy summary",
//         type: "concise",
//         language: "en"
//       }
//     });

//     res.status(201).json(note);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
import Note from "./notes.model.js";

export const createNote = async (req, res) => {
  try {
    const {
      originalFile,
      summary
    } = req.body;

    if (!originalFile?.url || !summary?.text) {
      return res.status(400).json({ message: "Invalid note data" });
    }

    const note = await Note.create({
      userId: req.userId, // 🔐 from JWT
      originalFile,
      summary
    });

    res.status(201).json({
      message: "Note saved successfully",
      note
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// export const getMyNotes = async (req, res) => {
//   try {
//     const notes = await Note.find({ userId: req.userId })
//       .sort({ createdAt: -1 });

//     res.json({ notes });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };


// // ---------------------------New Version with Pagination---------------------------
// export const getMyNotes = async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 5;

//     const skip = (page - 1) * limit;

//     const [notes, total] = await Promise.all([
//       Note.find({ userId: req.userId })
//         .sort({ createdAt: -1 })
//         .skip(skip)
//         .limit(limit),
//       Note.countDocuments({ userId: req.userId }),
//     ]);

//     res.json({
//       notes,
//       page,
//       totalPages: Math.ceil(total / limit),
//       totalNotes: total,
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// -----------------------New Version with Search and Filters-------
export const getMyNotes = async (req, res) => {
  try {
    const userId = req.userId;

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const { search, language, type } = req.query;

    // 🔍 Build query dynamically
    const query = { userId };

    if (search) {
      query["summary.text"] = { $regex: search, $options: "i" };
    }

    if (language) {
      query["summary.language"] = language;
    }

    if (type) {
      query["summary.type"] = type;
    }

    const total = await Note.countDocuments(query);

    const notes = await Note.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      notes,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch notes" });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    const note = await Note.findOne({
      _id: id,
      userId: req.userId, // 🔐 ownership check
    });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    await note.deleteOne();

    res.json({ message: "Note deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const clearDuplicateNotes = async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.userId })
      .sort({ createdAt: -1 });

    const seen = new Set();
    const duplicates = [];

    for (const note of notes) {
      const key = `${note.originalFile.publicId}_${note.summary.type}_${note.summary.language}`;

      if (seen.has(key)) {
        duplicates.push(note._id);
      } else {
        seen.add(key);
      }
    }

    if (duplicates.length > 0) {
      await Note.deleteMany({ _id: { $in: duplicates } });
    }

    res.json({
      message: "Duplicates cleared",
      removed: duplicates.length,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
