import { useState } from 'react';

import { NewDiary } from '../types';
import RadioButtonInput from './RadioButtonInput';

interface EntryFormProps {
  addNewEntry: (newDiary: NewDiary) => void;
  notification: string;
}

export default function EntryForm({ addNewEntry, notification }: EntryFormProps) {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');

  function onSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    addNewEntry({ date, visibility, weather, comment });
    setDate('');
    setVisibility('');
    setWeather('');
    setComment('');
  }

  return (
    <>
      <h2>Add new entry</h2>
      <p style={{ color: 'red' }}>{notification}</p>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={date}
            onChange={e => setDate(e.target.value)}
          />
        </div>
        <div>
          Visibility
          <RadioButtonInput label="great" value={visibility} setValue={setVisibility} />
          <RadioButtonInput label="good" value={visibility} setValue={setVisibility} />
          <RadioButtonInput label="ok" value={visibility} setValue={setVisibility} />
          <RadioButtonInput label="poor" value={visibility} setValue={setVisibility} />
        </div>
        <div>
          Weather
          <RadioButtonInput label="sunny" value={weather} setValue={setWeather} />
          <RadioButtonInput label="rainy" value={weather} setValue={setWeather} />
          <RadioButtonInput label="cloudy" value={weather} setValue={setWeather} />
          <RadioButtonInput label="stormy" value={weather} setValue={setWeather} />
          <RadioButtonInput label="windy" value={weather} setValue={setWeather} />
        </div>
        <div>
          <label htmlFor="comment">Comment</label>
          <input
            type="text"
            id="comment"
            name="comment"
            value={comment}
            onChange={e => setComment(e.target.value)}
          />
        </div>
        <button type="submit">Add</button>
      </form>
    </>
  );
}
