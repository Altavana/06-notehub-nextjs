import css from './NoteDetails.module.css';

export default function NoteDetails() {
  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>Note title</h2>
        </div>
        {/* <p className={css.tag}>{note.tag}</p> */}
        <p className={css.content}>Note content</p>
        <p className={css.date}>Created date</p>
      </div>
    </div>
  );
}
