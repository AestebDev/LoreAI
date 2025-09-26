// frontend/services/documents.ts
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

export const fetchDocuments = async (workspaceId?: string) => {
  const { data } = await axios.get(`${API_URL}/api/documents`, {
    params: { workspace_id: workspaceId },
  });
  return data;
};

export const fetchDocument = async (id: string) => {
  const { data } = await axios.get(`${API_URL}/api/documents/${id}`);
  return data;
};

export const createDocument = async (payload: {
  title: string;
  content: string;
  workspace_id?: string;
  tags?: string[];
}) => {
  const { data } = await axios.post(`${API_URL}/api/documents`, payload);
  return data;
};

export const updateDocument = async (
  id: string,
  payload: { title: string; content: string; tags?: string[] }
) => {
  const { data } = await axios.put(`${API_URL}/api/documents/${id}`, payload);
  return data;
};

export const deleteDocument = async (id: string) => {
  await axios.delete(`${API_URL}/api/documents/${id}`);
};