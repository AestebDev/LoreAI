"use client";

import { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { supabase } from "@/lib/supabaseClient";

type DocumentEditorProps = {
  docId?: string | null;
  title?: string;
  tags?: string[];
  onSave?: () => void;   // 👈 new callback
};

export default function DocumentEditor({ docId, title = "", tags = [], onSave }: DocumentEditorProps) {
  const [docTitle, setDocTitle] = useState(title);
  const [docTags, setDocTags] = useState<string[]>(tags);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUserId(data.user?.id ?? null);
    });
  }, []);

  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: "<p>Start writing here...</p>",
    immediatelyRender: false,
  });

  async function handleSave() {
    if (!editor || !userId) return;

    const content = editor.getHTML();
    const markdown = editor.getText();

    const payload = {
      title: docTitle,
      content,
      markdown,
      tags: docTags,
      author_id: userId,   // match column name!
    };

    try {
      if (docId) {
        const { error } = await supabase.from("documents")
          .update(payload as Record<string, any>)
          .eq("id", docId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("documents")
          .insert([payload as Record<string, any>]);
        if (error) throw error;
      }

      alert("✅ Document saved!");
      if (onSave) onSave();   // 👈 notify dashboard on success
    } catch (err: any) {
      console.error("Error saving document:", err.message);
    }
  }

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

      {/* Tags */}
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

      {/* Toolbar */}
      <div className="flex items-center gap-2 border-b pb-2">
        <button onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "bg-gray-300 px-2" : "bg-gray-100 px-2"}>B</button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "bg-gray-300 px-2 italic" : "bg-gray-100 px-2 italic"}>I</button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor.isActive("heading", { level: 1 }) ? "bg-gray-300 px-2" : "bg-gray-100 px-2"}>H1</button>
      </div>

      <EditorContent editor={editor} className="border rounded min-h-[300px] p-3 bg-white" />

      <button onClick={handleSave}
        className="bg-blue-600 text-white px-4 py-2 rounded mt-4">Save</button>
    </div>
  );
}