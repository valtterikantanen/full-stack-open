import { useEffect, useState } from 'react';

import EntryList from './components/EntryList';
import EntryForm from './components/EntryForm';
import { Diary, NewDiary } from './types';
import { getDiaries, addDiary } from './diaryService';

export default function App() {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    getDiaries().then(data => setDiaries(data));
  }, []);

  function showNotification(message: string) {
    setNotification(message);
    setTimeout(() => setNotification(''), 5_000);
  }

  async function addNewEntry(newDiary: NewDiary) {
    try {
      const addedEntry = await addDiary(newDiary);
      if (addedEntry !== undefined) {
        setDiaries([...diaries, addedEntry]);
      }
    } catch (error) {
      if (error instanceof Error) {
        showNotification(error.message);
      }
    }
  }

  return (
    <div>
      <h1>Flight diary</h1>
      <EntryForm addNewEntry={addNewEntry} notification={notification} />
      <EntryList entries={diaries} />
    </div>
  );
}
