import axios from 'axios';
import { Diary, NewDiary } from './types';

const baseUrl = 'http://localhost:3000/api/diaries';

export async function getDiaries() {
  const response = await axios.get<Diary[]>(baseUrl);
  return response.data;
}

export async function addDiary(newDiary: NewDiary) {
  try {
    const response = await axios.post<Diary>(baseUrl, newDiary);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) throw new Error(error.response?.data);
  }
}
