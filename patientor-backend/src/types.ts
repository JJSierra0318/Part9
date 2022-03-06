export interface DiagnosesEntry {
  code: string,
  name: string,
  latin?: string
}

export type Gender = 'male' | 'female';

export interface PatientEntry {
  id: string,
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: Gender,
  occupation: string
}

export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn'>;