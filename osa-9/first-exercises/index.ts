import express from 'express';
const app = express();

import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;
  if (isNaN(Number(height)) || isNaN(Number(weight))) {
    res.status(400).json({ error: 'malformatted parameters' });
  } else {
    const bmi = calculateBmi(Number(height), Number(weight));
    res.json({ weight: Number(weight), height: Number(height), bmi });
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { dailyExercises, target } = req.body;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (dailyExercises === undefined || dailyExercises.length === 0 || target === undefined) {
    return res.status(400).json({ error: 'parameters missing' });
  }
  if (isNaN(Number(target)) || !Array.isArray(dailyExercises)) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }
  const dailyExercisesAsNumbers: number[] = [];
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dailyExercises.forEach((exercise: any) => {
      const exerciseAsNumber = Number(exercise);
      if (isNaN(exerciseAsNumber)) {
        throw new Error();
      }
      dailyExercisesAsNumbers.push(Number(exercise));
    });
  } catch (error: unknown) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }
  const result = calculateExercises(Number(target), dailyExercisesAsNumbers);
  return res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
