import css from './error.module.css';
('use client');

type Props = {
  error: Error;
};
export default function Error({ error }: Props) {
  return (
    <div>
      <p className={css.text}>Could not fetch the list of notes. {error.message}</p>
    </div>
  );
}
