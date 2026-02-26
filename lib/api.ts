import axios from 'axios';
import type { Note, NoteTag } from '../types/note';

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}
export interface NewNote {
  title: string;
  content: string;
  tag: NoteTag;
}
const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
const api = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  headers: { Authorization: `Bearer ${myKey}` },
});

export const fetchNotes = async (search?: string, page?: number): Promise<FetchNotesResponse> => {
  const response = await api.get<FetchNotesResponse>('/notes', {
    params: {
      ...(search !== '' && { search }),
      page: page,
      perPage: 12,
    },
  });
  return response.data;
};

export const createNote = async (note: NewNote): Promise<Note> => {
  const response = await api.post<Note>('/notes', note);
  return response.data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const response = await api.delete<Note>(`/notes/${noteId}`);
  return response.data;
};
export async function fetchNoteById(id: string): Promise<Note> {
  const response = await api.get<Note>(`/notes/${id}`);
  return response.data;
}

export function formatDate(date: string) {
  return new Date(date).toLocaleString('en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
