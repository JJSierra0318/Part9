import patients from '../../data/patients';
import { PatientEntry, NonSensitivePatientEntry, NewPatientEntry, NewEntry } from '../types';
import uuid  = require('uuid');


const getEntries = (): PatientEntry[] => {
  return patients;
};

const getEntriesById = (id: string): PatientEntry => {
  const patient = patients.find(patient => patient.id === id);
  if (!patient) throw new Error(`Could not find a patient with id ${id}`);
  return patient;
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

const addEntry = (patientID: PatientEntry['id'], entry: NewEntry): PatientEntry => {
  const id: string = uuid.v4();
  const newEntry = {
    id: id,
    ...entry
  };

  const patient = getEntriesById(patientID);
  patient.entries = [...patient.entries, newEntry];
  return patient;
};

export default {
  getEntries,
  getEntriesById,
  getNonSensitiveEntries,
  addPatient,
  addEntry
};