const BACKEND_URL = import.meta.env.VITE_API_BASE_URL;


export const saveNote = async ({ token, noteData }) => {
  const res = await fetch(`${BACKEND_URL}/api/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(noteData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to save note");
  }

  return data;
};
// export const fetchMyNotes = async (token) => {
//   const res = await fetch("http://localhost:5001/api/notes/my", {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   const data = await res.json();

//   if (!res.ok) {
//     throw new Error(data.message || "Failed to fetch notes");
//   }

//   return data.notes;
// };

// ---------------------------New Version with Pagination---------------------------
// export const fetchMyNotes = async (token, page = 1, limit = 5) => {
//   const res = await fetch(
//     `http://localhost:5001/api/notes/my?page=${page}&limit=${limit}`,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );

//   const data = await res.json();

//   if (!res.ok) {
//     throw new Error(data.message || "Failed to fetch notes");
//   }

//   return data;
// };

// -----------------------New Version with Search and Filters-------
export const fetchMyNotes = async (
  token,
  { page = 1, search = "", language = "", type = "" }
) => {
  const params = new URLSearchParams({
    page,
    limit: 5,
  });

  if (search) params.append("search", search);
  if (language) params.append("language", language);
  if (type) params.append("type", type);

  const res = await fetch(
    `${BACKEND_URL}/api/notes/my?${params.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch notes");
  }

  return res.json();
};

export const deleteNote = async (token, noteId) => {
  const res = await fetch(
         `${BACKEND_URL}/api/notes/${noteId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to delete note");
  }

  return data;
};
export const clearDuplicates = async (token) => {
  const res = await fetch(
    "http://localhost:5001/api/notes/clear-duplicates",
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to clear duplicates");
  }

  return data;
};
