import { Diary } from '../types';

interface EntryProps {
  entry: Diary;
}

export default function Entry({ entry }: EntryProps) {
  return (
    <>
      <h4>{entry.date}</h4>
      <div>visibility: {entry.visibility}</div>
      <div>weather: {entry.weather}</div>
      <div>
        comment: <em>{entry.comment}</em>
      </div>
    </>
  );
}
