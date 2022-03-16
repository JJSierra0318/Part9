export type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

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

export enum Type {
  Hospital = 'Hospital',
  OccupationalHealthcare = 'OccupationalHealthcare',
  HealthCheck = 'HealthCheck'
}

export enum HealthCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3
}

export interface Discharge {
  date: string,
  criteria: string
}

export interface SickLeave {
  startDate: string,
  endDate: string
}

export interface baseEntry {
  id: string,
  description: string,
  date: string,
  specialist: string,
  diagnosisCodes?: Array<DiagnosesEntry['code']>
}

export interface HealthCheckEntry extends baseEntry {
  type: 'HealthCheck',
  healthCheckRating: number
}

export interface HospitalEntry extends baseEntry{
  type: 'Hospital',
  discharge: Discharge
}

export interface OccupationalHealthcareEntry extends baseEntry{
  type: 'OccupationalHealthcare',
  employerName: string,
  sickLeave?: SickLeave
}

export type Entry = HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry;

export interface PatientEntry {
  id: string,
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: Gender,
  occupation: string,
  entries: Array<Entry>
}

export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn' | 'entries'>;

export type NewPatientEntry = Omit<PatientEntry, 'id'>;

export type NewEntry = UnionOmit<Entry, 'id'>;