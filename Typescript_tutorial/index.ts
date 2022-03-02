import express from 'express';
import { bmiObject } from './bmiCalculator';
import { excerciseObject } from './exerciseCalculator';
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  res.json(bmiObject(Number(req.query.weight), Number(req.query.height)));
});

app.post('/excercise', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const {targetHours, daily_exercises} = req.body;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = excerciseObject(targetHours, daily_exercises);
  console.log(result);
  res.send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});