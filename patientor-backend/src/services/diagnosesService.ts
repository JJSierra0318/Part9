import diagnosesData from '../../data/diagnoses.json';
import { DiagnosesEntry } from '../types';

//Tipo[] indica que devuelve un Array de tipo Tipo
const diagnoses: DiagnosesEntry[] = diagnosesData; 

const getEntries = (): DiagnosesEntry[] => {
  return diagnoses;
};

const addDiagnoses = () => {
  return null;
};

export default {
  getEntries,
  addDiagnoses
};