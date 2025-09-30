"use client";
import RequireAuth from "@/components/requireAuth/RequireAuth";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { PlusIcon, DocumentTextIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import UserMenu from "@/components/layout/UserMenu";
import DocumentDetails from "@/app/documents/[documentId]/page";
import ChatWidget from "@/components/chatWidget/ChatWidget";
import { fetchDocuments, deleteDocument } from "@/services/documents";

const DocumentEditor = dynamic(
  () => import("@/components/documentEditor/DocumentEditor"),
  {
    ssr: false,
    loading: () => <p className="text-sm text-gray-500">Loading editor...</p>,
  }
);

export default function DashboardPage() {
  const [currentView, setCurrentView] = useState<
    "dashboard" | "details" | "editor" | "allDocuments"
  >("dashboard");
  const [selectedDoc, setSelectedDoc] = useState<any | null>(null);
  const [recentDocuments, setRecentDocuments] = useState<any[]>([]);
  const [allDocuments, setAllDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDocuments();
  }, []);

  async function loadDocuments() {
    setLoading(true);
    try {
      const data = await fetchDocuments();
      setAllDocuments(data);
      setRecentDocuments(data.slice(0, 5));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    await deleteDocument(id);
    loadDocuments();
  }

  const handleViewAllClick = () => {
    setCurrentView("allDocuments");
  };

  const handleDocumentClick = (doc: any) => {
    setSelectedDoc(doc);
    setCurrentView("details");
  };

  const handleEditClick = () => {
    setCurrentView("editor");
  };

  const handleBackToDashboard = () => {
    setCurrentView("dashboard");
    setSelectedDoc(null);
  };

  const handleBackToDetails = () => {
    setCurrentView("details");
  };

  const handleCreateNew = () => {
    setSelectedDoc({ id: null, title: "", tags: [] });
    setCurrentView("editor");
  };

  const handleSaveDocument = () => {
    loadDocuments();
    setCurrentView("dashboard");
    setSelectedDoc(null);
  };

  return (
    <RequireAuth>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <h1 className="text-2xl font-bold text-gray-900">LoreAI</h1>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white font-small">
                  <UserMenu />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Layout */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-6 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {currentView !== "details" && currentView !== "editor" && (
                <button
                  className="btn-primary inline-flex items-center gap-2"
                  onClick={handleCreateNew}
                >
                  <PlusIcon className="w-4 h-4" />
                  Add document
                </button>
              )}
            </div>

            {/* Main Content NOW TAKES MORE WIDTH */}
            <main  className={currentView === "dashboard" ? "lg:col-span-4 space-y-8" : "lg:col-span-6 space-y-8"}>
              {currentView === "dashboard" && (
                <>
                  {/* Welcome */}
                  <div className="card">
                    <h2 className="text-xl font-semibold mb-4">
                      Welcome back!
                    </h2>
                    <p className="text-gray-600 mb-4">
                      Ready to explore your knowledge base? Ask the AI assistant
                      anything or browse your recent documents.
                    </p>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-blue-800 text-sm">
                        💡 <strong>Tip:</strong> Try asking "I'm new here, where
                        should I start?" to get personalized guidance.
                      </p>
                    </div>
                  </div>

                  {/* Recent Documents */}
                  <div className="card">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-semibold">
                        Recent Documents
                      </h2>
                      <Link
                        href="#"
                        className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                        onClick={handleViewAllClick}
                      >
                        View all
                      </Link>
                    </div>
                    <div className="space-y-3">
                      {recentDocuments.map((doc) => (
                        <button
                          key={doc.id}
                          onClick={() => handleDocumentClick(doc)}
                          className="flex w-full items-start space-x-3 p-2 rounded-md hover:bg-gray-50"
                        >
                          <DocumentTextIcon className="w-5 h-5 text-gray-400 mt-1" />
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-gray-900 text-left truncate">
                              {doc.title}
                            </h3>
                            <div
                              className="text-sm text-gray-500 mt-1 prose prose-sm line-clamp-3 text-left"
                              dangerouslySetInnerHTML={{
                                __html:
                                  doc.content.length > 120
                                    ? doc.markdown.slice(0, 120) + "..."
                                    : doc.content,
                              }}
                            />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {currentView === "allDocuments" && (
                <div className="card p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">All Documents</h2>
                    <button
                      className="text-sm text-gray-500 hover:underline"
                      onClick={() => setCurrentView("dashboard")}
                    >
                      ← Back dashboard
                    </button>
                  </div>

                  <div className="space-y-3">
                    {allDocuments.map((doc: any) => (
                      <div
                        key={doc.id}
                        className="p-3 border rounded hover:bg-gray-50 cursor-pointer"
                        onClick={() => handleDocumentClick(doc)}
                      >
                        <h3 className="font-medium text-gray-900">
                          {doc.title}
                        </h3>
                        <p
                          className="text-sm text-gray-500 line-clamp-2"
                          dangerouslySetInnerHTML={{
                            __html:
                              doc.content.length > 120
                                ? doc.content.slice(0, 120) + "..."
                                : doc.content,
                          }}
                        ></p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {currentView === "details" && selectedDoc && (
                <div className="card p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Document Details</h2>
                    <button
                      className="text-sm text-gray-500 hover:underline"
                      onClick={handleBackToDashboard}
                    >
                      ← Back to Dashboard
                    </button>
                  </div>
                  <DocumentDetails
                    document={selectedDoc}
                    onEdit={handleEditClick}
                    onDelete={() => {
                      handleDelete(selectedDoc.id);
                      handleBackToDashboard();
                    }}
                  />
                </div>
              )}

              {currentView === "editor" && (
                <div className="card p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">
                      {selectedDoc?.id ? "Edit Document" : "New Document"}
                    </h2>
                    <button
                      className="text-sm text-gray-500 hover:underline"
                      onClick={
                        selectedDoc?.id
                          ? handleBackToDetails
                          : handleBackToDashboard
                      }
                    >
                      ← Back
                    </button>
                  </div>
                  <DocumentEditor
                    docId={selectedDoc?.id}
                    title={selectedDoc?.title || ""}
                    tags={selectedDoc?.tags || []}
                    onSave={handleSaveDocument}
                  />
                </div>
              )}
            </main>
          </div>
        </div>

        {/* Floating Chat Assistant */}
        <ChatWidget />
      </div>
    </RequireAuth>
  );
}
