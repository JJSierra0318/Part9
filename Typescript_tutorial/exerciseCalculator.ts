interface ExcersiceReturns {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExcersiceParameters {
  target: number
  hours: Array<number>;
}

const parseArguments_exercise = (target: number, daily_exercises: Array<number>): ExcersiceParameters => {
  if (daily_exercises.length < 1) throw new Error('Not enough arguments');
  if (daily_exercises.length > 7) throw new Error('Too many arguments');

  if(isNaN(target)) throw new Error('All arguments must be numbers');

  let hours: number[] = [];
  for (let i = 0; i < daily_exercises.length; i++) {
    if (isNaN(Number(daily_exercises[i]))) throw new Error('All arguments must be numbers');
    hours = hours.concat(Number(daily_exercises[i]));
  }
  return {
    target,
    hours
  };

};

const calculateExercises = (target: number, hours: Array<number>): ExcersiceReturns => {

  const average = hours.reduce((a, b) => a + b, 0) / hours.length;

  let rating;
  let ratingDescription;
  if (average >= target) {
    rating = 3;
    ratingDescription = 'Good Job!';
  } else if (average >= target/2) {
    rating = 2;
    ratingDescription = 'Not too bad but could be better';
  } else {
    rating = 1;
    ratingDescription = 'Remember to do excercise more often';
  }

  const excerciseInfo = {
    periodLength: hours.length,
    trainingDays: hours.filter(hours => hours > 0).length,
    success: average >= target,
    rating,
    ratingDescription,
    target,
    average
  };
  return excerciseInfo;
};

try {
  //const { target, hours } = parseArguments_exercise(process.argv);

} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += 'Error: ' + error.message;
  }
  console.log(errorMessage);
}

export const excerciseObject = (targetHours: number, daily_exercises: Array<number>) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const { target, hours } = parseArguments_exercise(targetHours, daily_exercises);
    return calculateExercises(target, hours);

  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += 'Error: ' + error.message;
    }
    return errorMessage;
  }
};