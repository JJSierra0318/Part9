import patients from '../../data/patients';
import { PatientEntry, NonSensitivePatientEntry, NewPatientEntry } from '../types';
import uuid  = require('uuid');


const getEntries = (): PatientEntry[] => {
  return patients;
};

const getEntriesById = (id: string): PatientEntry | undefined => {
  return patients.find(patient => patient.id === id);
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = ( entry: NewPatientEntry ): PatientEntry => {
  
  const id: string = uuid.v4();
  const newPatientEntry = {
    id,
    ...entry
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getEntries,
  getEntriesById,
  getNonSensitiveEntries,
  addPatient
};