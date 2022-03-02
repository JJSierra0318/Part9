
interface bmiParameters {
  value1: number;
  value2: number;
}

interface bmiObject {
  weight: number;
  height: number;
  bmi: string
}

//validar parámetros, y convertir a números
const parseArguments_bmi = (weight: number, height: number): bmiParameters => {

  if (!isNaN(weight) && !isNaN(height)) {
    return {
      value1: Number(height),
      value2: Number(weight)
    };
  } else {
    throw new Error('arguments were not numbers');
  }
};

export const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / Math.pow(height/100, 2);

  if (bmi < 16) return 'Underweight (Severe thinness)';
  else if (bmi < 17)  return 'Underweight (Moderate thinness)';
  else if (bmi < 18.5) return 'Underweight (Mild thinness)';
  else if (bmi < 25) return 'Normal Range (Healthy)';
  else if (bmi < 30) return 'Overweight (Pre-obese)';
  else if (bmi < 35) return 'Obese (Class I)';
  else if (bmi < 40) return 'Obese (Class II)';
  else if (bmi >= 40) return 'Obese (Class III)';
  return '';
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const bmiObject = (weight: number, height: number): bmiObject | {error: string} => {

  try {

    const { value1, value2 } = parseArguments_bmi(weight, height);

    return {
      weight: value2,
      height: value1,
      bmi: calculateBmi(height, weight)
    };
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += 'Error: ' + error.message;
  }
  return {error: errorMessage};
  }
};