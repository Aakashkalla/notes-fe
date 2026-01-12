import { useNavigate } from "react-router-dom";
import api from "../lib/axios";
import { useEffect, useRef, useState } from "react";

type Note = {
  _id: string;
  title: string;
  content: string;
};

const Dashboard = () => {
  const navigate = useNavigate();

  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLInputElement>(null);

  async function logout() {
    await api.post("/auth/logout");
    navigate("/login");
  }

  async function addNote() {
    const title = titleRef.current?.value;
    const content = contentRef.current?.value;

    if (!title || !content) {
      setError("Title and content are required");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const response = await api.post("/notes", { title, content });
      setNotes((prev) => [...prev, response.data.note]);
      titleRef.current!.value = "";
      contentRef.current!.value = "";
    } catch {
      setError("Failed to add note");
    } finally {
      setLoading(false);
    }
  }

  async function deleteNote(noteId: string) {
    setError(null);
    setLoading(true);

    try {
      await api.delete(`/notes/${noteId}`);
      setNotes((prev) => prev.filter((note) => note._id !== noteId));
    } catch {
      setError("Failed to delete note");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      try {
        const response = await api.get("/notes");
        setNotes(response.data.notes);
      } catch {
        setError("Failed to load notes");
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="max-w-5xl mx-auto flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">My Notes</h1>
        <button
          onClick={logout}
          className="text-sm px-4 py-2 bg-black text-white rounded-md hover:opacity-90"
        >
          Logout
        </button>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Notes Section */}
        <div className="md:col-span-2 space-y-4">
          {loading && <p>Loading notes...</p>}
          {error && <p className="text-red-600">{error}</p>}

          {!loading && notes.length === 0 && (
            <p className="text-gray-500">No notes yet. Add one!</p>
          )}

          {notes.map((note) => (
            <div
              key={note._id}
              className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-start"
            >
              <div>
                <h3 className="font-medium text-lg">{note.title}</h3>
                <p className="text-gray-600 mt-1">{note.content}</p>
              </div>
              <button
                onClick={() => deleteNote(note._id)}
                disabled={loading}
                className="text-sm text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        {/* Add Note Section */}
        <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
          <h2 className="text-lg font-medium">Add Note</h2>

          <input
            ref={titleRef}
            placeholder="Title"
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />

          <textarea
            ref={contentRef as any}
            placeholder="Content"
            rows={4}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />

          <button
            onClick={addNote}
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded-md hover:opacity-90 disabled:opacity-50"
          >
            Add Note
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
