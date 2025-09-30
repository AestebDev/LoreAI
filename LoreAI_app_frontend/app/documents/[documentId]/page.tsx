'use client'

import { useState, useEffect } from "react";
import { PencilIcon, TrashIcon, TagIcon, CalendarIcon, UserIcon } from "@heroicons/react/24/outline";
import { fetchDocument } from "@/services/documents";

type DocumentDetailsProps = {
  document: any;
  onEdit: () => void;
  onDelete: () => void;
};

export default function DocumentDetails({ document, onEdit, onDelete }: DocumentDetailsProps) {
  const [fullDocument, setFullDocument] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFullDocument = async () => {
      if (!document?.id) {
        setLoading(false);
        return;
      }

      try {
        const data = await fetchDocument(document.id);
        setFullDocument(data);
      } catch (err) {
        console.error("Failed to load document details:", err);
        setFullDocument(document); // Fallback to the basic document data
      } finally {
        setLoading(false);
      }
    };

    loadFullDocument();
  }, [document]);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this document? This action cannot be undone.")) {
      onDelete();
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="h-32 bg-gray-200 rounded"></div>
      </div>
    );
  }

  const doc = fullDocument || document;

  return (
    <div className="space-y-6">
      {/* Document Header */}
      <div className="border-b pb-4">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{doc.title || "Untitled Document"}</h1>
            
            {/* Document Metadata */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              {doc.created_at && (
                <div className="flex items-center gap-1">
                  <CalendarIcon className="w-4 h-4" />
                  <span>Created {new Date(doc.created_at).toLocaleDateString()}</span>
                </div>
              )}
              
              {doc.updated_at && doc.updated_at !== doc.created_at && (
                <div className="flex items-center gap-1">
                  <CalendarIcon className="w-4 h-4" />
                  <span>Updated {new Date(doc.updated_at).toLocaleDateString()}</span>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 ml-4">
            <button
              onClick={onEdit}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <PencilIcon className="w-4 h-4" />
              Edit
            </button>
            
            <button
              onClick={handleDelete}
              className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <TrashIcon className="w-4 h-4" />
              Delete
            </button>
          </div>
        </div>

        {/* Tags */}
        {doc.tags && doc.tags.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            <TagIcon className="w-4 h-4 text-gray-400" />
            {doc.tags.map((tag: string, index: number) => (
              <span
                key={index}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Document Content */}
      <div className="prose max-w-none">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Content Preview</h3>
        
        {doc.markdown ? (
          <div className="bg-gray-50 border rounded-lg p-4 max-h-96 overflow-y-auto whitespace-pre-wrap">
            {doc.markdown}
          </div>
        ) : doc.content ? (
          <div 
            className="bg-gray-50 border rounded-lg p-4 max-h-96 overflow-y-auto"
            dangerouslySetInnerHTML={{ __html: doc.content }}>
          </div>
        ) : (
          <div className="bg-gray-50 border rounded-lg p-4 text-gray-500 italic">
            No content available for this document.
          </div>
        )}
      </div>

      {/* Document Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">
            {doc.content ? doc.content.replace(/<[^>]*>/g, '').length : 0}
          </div>
          <div className="text-sm text-gray-500">Characters</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">
                 {doc.content ? doc.content.replace(/&nbsp;/g, ' ').trim().split(/\s+/).filter(Boolean).length : 0}
          </div>
          <div className="text-sm text-gray-500">Words</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">
            {doc.tags ? doc.tags.length : 0}
          </div>
          <div className="text-sm text-gray-500">Tags</div>
        </div>
      </div>
    </div>
  );
}