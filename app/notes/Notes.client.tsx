'use client';
import css from './NotesPage.module.css';

import Modal from '@/components/Modal/Modal';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import NoteForm from '@/components/NoteForm/NoteForm';
import NoteList from '@/components/NoteList/NoteList';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useDebouncedCallback } from 'use-debounce';

export default function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isModOpen, setIsModOpen] = useState(false);

  const { data, isSuccess } = useQuery({
    queryFn: () => fetchNotes(query, page),
    queryKey: ['notes', query, page],
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const changeQuery = useDebouncedCallback((query: string) => {
    setQuery(query);
    setPage(1);
  }, 250);

  const closeModal = () => {
    setIsModOpen(false);
  };
  const totalPages = data?.totalPages ?? 0;
  const notes = data?.notes ?? [];
  useEffect(() => {
    if (isSuccess && notes.length === 0) {
      toast.error('No notes found for your request.');
    }
  }, [isSuccess, notes]);
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={changeQuery} />
        {isSuccess && totalPages > 1 && (
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        )}

        <button className={css.button} onClick={() => setIsModOpen(true)}>
          Create note +
        </button>
      </header>

      {isModOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onCancel={closeModal} />
        </Modal>
      )}
      {notes.length > 0 && <NoteList notes={notes} />}
      <Toaster position="top-center" />
    </div>
  );
}
