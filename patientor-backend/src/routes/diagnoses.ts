import express from "express";
import diagnosesService from "../services/diagnosesService";

const diagnosesRouter = express.Router();

diagnosesRouter.get('/', (_req, res) => {
  console.log('here');
  res.send(diagnosesService.getEntries());
});

diagnosesRouter.post('/', (_req, res) => {
  res.send('saving a Diagnoses');
});

export default diagnosesRouter;