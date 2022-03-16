import { Gender, NewPatientEntry, Entry, Discharge, SickLeave, HealthCheckRating, baseEntry, NewEntry } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

//Patients

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }
  return name;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }
  return ssn;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date');
  }
  return date;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }
  return occupation;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender');
  }
  return gender;
};

const parseEntries = (_entries: unknown): Array<Entry> => {
  /*if (!entries || !Array.isArray(entries)) {
    throw new Error('Incorrect or missing entries');
  }*/
  return [] as Array<Entry>;
};

type Fields = { name: unknown, ssn: unknown, dateOfBirth: unknown, occupation: unknown, gender: unknown, entries: unknown };

const toNewPatientEntry = ({ name, ssn, dateOfBirth, occupation, gender, entries }: Fields): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    name: parseName(name),
    ssn: parseSsn(ssn),
    dateOfBirth: parseDate(dateOfBirth),
    occupation: parseOccupation(occupation),
    gender: parseGender(gender),
    entries: parseEntries(entries)
  };
  return newEntry;
};

//Entries

// eslint-disable-next-line @typescript-eslint/no-explicit-any
/*const isType = (param: any): param is Type => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Type).includes(param);
};*/

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isDischarge = (param: any): param is Discharge => {
  if (!param.date || param.criteria) {
    return false;
  }
  return true;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isSickLeave = (param:any): param is SickLeave => {
  if (!param.startDate || !param.endDate) {
    return false;
  }
  return true;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(param);
};

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error('Incorrect or missing description');
  }
  return description;
};

/*const parseType = (type: unknown): Type => {
  if (!type || !isType(type)) {
    throw new Error('Incorrect or missing type');
  }
  return type;
};*/

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error('Incorrect or missing specialist');
  }
  return specialist;
};

const parseDiagnosisCodes = (diagnosisCodes: unknown): string[] => {
  if (!Array.isArray(diagnosisCodes)) {
    throw new Error('Incorrect or missing diagnosis codes');
  }
  return diagnosisCodes as string[];
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (!discharge || !isDischarge(discharge)) {
    throw new Error('Incorrect or missing discharge');
  }
  return discharge;
};

const parseEmployerName = (employerName: unknown): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error('Incorrect or missing employer name');
  }
  return employerName;
};

const parseSickLeave = (sickLeave: unknown): SickLeave => {
  if (!sickLeave || !isSickLeave(sickLeave)) {
    throw new Error('Incorrect or missing sick leave');
  }
  return sickLeave;
};

const parseHealthCheckRating = (healthCheckRating: unknown) => {
  if (!healthCheckRating || !isHealthCheckRating(healthCheckRating)) {
    throw new Error('Incorrect or missing health check rating');
  }
  return healthCheckRating;
};

type EntryFields = {description: unknown, date: unknown, specialist: unknown, diagnosisCodes?: unknown, type: unknown,
healthCheckRating?: unknown, employerName?:unknown, sickLeave?: unknown, discharge?: unknown};

const toNewEntry = ({description, date, specialist, diagnosisCodes, type, healthCheckRating, employerName, sickLeave, discharge}: EntryFields)
: NewEntry => {
  const newEntry: Omit<baseEntry,'id'> = {
    date: parseDate(date),
    specialist: parseSpecialist(specialist),
    description: parseDescription(description),
  };
  if (diagnosisCodes) newEntry.diagnosisCodes = parseDiagnosisCodes(diagnosisCodes);
  switch (type) {
    case 'Hospital':
      return {...newEntry, discharge: parseDischarge(discharge), type: 'Hospital'};
    case 'OccupationalHealthcare':
      return {...newEntry, employerName: parseEmployerName(employerName), sickLeave: parseSickLeave(sickLeave), type:'OccupationalHealthcare',};
    case 'HealthCheck':
      return {...newEntry, healthCheckRating: parseHealthCheckRating(healthCheckRating), type:'HealthCheck'};
    default:
      throw new Error('Something went wrong');
  }
};

export default { toNewEntry, toNewPatientEntry };