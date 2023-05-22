interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseValues {
  targetAmount: number;
  exerciseHours: number[];
}

function parseExerciseInput(args: string[]): ExerciseValues {
  if (args.length < 4) throw new Error('Not enough arguments');
  const exerciseHours = [];
  let targetAmount;

  try {
    targetAmount = Number(args[2]);
    for (let i = 3; i < args.length; i++) {
      exerciseHours.push(Number(args[i]));
    }
  } catch (error) {
    throw new Error('Some of the provided values were not numbers!');
  }

  return { targetAmount, exerciseHours };
}

export function calculateExercises(targetAmount: number, exerciseHours: number[]): Result {
  const periodLength = exerciseHours.length;
  const trainingDays = exerciseHours.filter(hours => hours > 0).length;
  const average = exerciseHours.reduce((sum, current) => sum + current, 0) / periodLength;
  const success = average >= targetAmount;

  let rating;
  let ratingDescription;

  if (success) {
    rating = 3;
    ratingDescription = 'Great, keep working hard!';
  } else if (average > 0.5 * targetAmount) {
    rating = 2;
    ratingDescription = "Not too bad but I'm sure you can do better!";
  } else {
    rating = 1;
    ratingDescription = 'Do or do not. There is no try.';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target: targetAmount,
    average
  };
}

try {
  const { targetAmount, exerciseHours } = parseExerciseInput(process.argv);
  console.log(calculateExercises(targetAmount, exerciseHours));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong';
  if (error instanceof Error) {
    errorMessage += 'Error: ' + error.message;
  }
  console.log(errorMessage);
}
