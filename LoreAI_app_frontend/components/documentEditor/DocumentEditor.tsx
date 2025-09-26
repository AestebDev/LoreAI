import { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import {
  createDocument,
  updateDocument,
  fetchDocument,
} from "@/services/documents";
import { supabase } from "@/lib/supabaseClient";

type DocumentEditorProps = {
  docId?: string | null;
  title?: string;
  tags?: string[];
  onSave?: () => void;
};

export default function DocumentEditor({
  docId: initialDocId,
  title = "",
  tags = [],
  onSave,
}: DocumentEditorProps) {
  const [docId, setDocId] = useState<string | null>(initialDocId || null);
  const [docTitle, setDocTitle] = useState(title);
  const [docTags, setDocTags] = useState<string[]>(tags);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: "<p>Start writing here...</p>",
    immediatelyRender: false,
  });

  // Load logged-in user
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUserId(data.user?.id ?? null);
    });
  }, []);

  // Load existing doc data
  useEffect(() => {
    const loadDoc = async () => {
      if (!docId || !editor) {
        setLoading(false);
        return;
      }

      try {
        const data = await fetchDocument(docId);
        if (data) {
          setDocTitle(data.title || "");
          setDocTags(data.tags || []);
          editor.commands.setContent(data.content || "<p></p>");
        }
      } catch (err) {
        console.error("Failed to load document:", err);
      } finally {
        setLoading(false);
      }
    };
    loadDoc();
  }, [docId, editor]);

  async function handleSave() {
  if (!editor) return; // only check editor

  const content = editor.getHTML();
  const markdown = editor.getText();

  const payload: any = {
    title: docTitle,
    content,
    markdown,
    tags: docTags,
  };
  if (userId) payload.author_id = userId;

  try {
    if (docId) {
      await updateDocument(docId, payload);
    } else {
      const newDoc = await createDocument(payload);
      if (newDoc?.id) setDocId(newDoc.id);
    }
    onSave?.();
  } catch (err: any) {
    console.error(err.message);
    alert("❌ Failed to save");
  }
}

  if (loading) return <p>Loading editor...</p>;
  if (!editor) return null;

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Document Title"
        className="w-full border px-3 py-2 rounded"
        value={docTitle}
        onChange={(e) => setDocTitle(e.target.value)}
      />

      <div className="flex flex-wrap gap-2">
        {docTags.map((t, i) => (
          <span
            key={i}
            className="px-2 py-1 text-xs bg-gray-200 rounded cursor-pointer"
            onClick={() => setDocTags(docTags.filter((_, idx) => idx !== i))}
          >
            #{t}
          </span>
        ))}
        <button
          className="text-sm text-blue-600"
          onClick={() => setDocTags([...docTags, "NewTag"])}
        >
          + Add Tag
        </button>
      </div>

      <div className="flex items-center gap-2 border-b pb-2">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={
            editor.isActive("bold") ? "bg-gray-300 px-2" : "bg-gray-100 px-2"
          }
        >
          B
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={
            editor.isActive("italic")
              ? "bg-gray-300 px-2 italic"
              : "bg-gray-100 px-2 italic"
          }
        >
          I
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor.isActive("heading", { level: 1 })
              ? "bg-gray-300 px-2"
              : "bg-gray-100 px-2"
          }
        >
          H1
        </button>
      </div>

      <EditorContent
        editor={editor}
        className="border rounded min-h-[300px] p-3 bg-white"
      />

      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
      >
        Save
      </button>
    </div>
  );
}