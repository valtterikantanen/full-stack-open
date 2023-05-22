import { Diary } from '../types';
import Entry from './Entry';

interface EntryListProps {
  entries: Diary[];
}

export default function EntryList({ entries }: EntryListProps) {
  return (
    <>
      <h2>Entries</h2>
      {entries.map(entry => (
        <Entry key={entry.id} entry={entry} />
      ))}
    </>
  );
}
