'use client';
import css from './NoteDetails.module.css';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { fetchNoteById, formatDate } from '@/lib/api';

const NoteDetailsClient = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, error } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p className={css.text}> Loading...</p>;

  if (error || !data) return <p className={css.text}> Some error..</p>;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{data?.title}</h2>
        </div>
        <p className={css.tag}>{data?.tag}</p>
        <p className={css.content}>{data?.content}</p>
        <p className={css.date}>{data?.createdAt && formatDate(data.createdAt)}</p>
      </div>
    </div>
  );
};

export default NoteDetailsClient;
