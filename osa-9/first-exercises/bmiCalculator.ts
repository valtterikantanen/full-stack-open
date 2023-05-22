interface BmiValues {
  height: number;
  weight: number;
}

function parseBmiInput(args: string[]): BmiValues {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  }

  throw new Error('Provided values were not numbers!');
}

export function calculateBmi(height: number, weight: number) {
  // Height is in centimeters and weight in kilograms
  // BMI is weight (in kilograms) divided by the square of height (in meters)
  const heightInMeters = height / 100;
  const bmi = weight / Math.pow(heightInMeters, 2);
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal weight';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
}

try {
  const { height, weight } = parseBmiInput(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong';
  if (error instanceof Error) {
    errorMessage += 'Error: ' + error.message;
  }
  console.log(errorMessage);
}
