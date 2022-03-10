export interface DiagnosesEntry {
  code: string,
  name: string,
  latin?: string
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

export interface PatientEntry {
  id: string,
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: Gender,
  occupation: string,
  entries: Array<string>
}

export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn' | 'entries'>;

export type NewPatientEntry = Omit<PatientEntry, 'id'>;