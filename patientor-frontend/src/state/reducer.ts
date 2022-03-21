import { State } from "./state";
import { Diagnosis, Patient } from "../types";

export type Action =
    {
      type: 'SET_DIAGNOSES_LIST';
      payload: Diagnosis[];
    }
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT" | "UPDATE_PATIENT";
      payload: Patient;
    }
    ;

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "SET_DIAGNOSES_LIST":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (otherDiagnoses, diagnosis) => ({ ...otherDiagnoses, [diagnosis.code]: diagnosis }),
            {}
          ),
            ...state.diagnoses
        }
      };
    case "UPDATE_PATIENT":
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    default:
      return state;
  }
};

export const setPatientList = (patientList: Patient[]): Action => {
  return {
    type: 'SET_PATIENT_LIST',
    payload: patientList
  };
};

export const setDiagnosesList = (diagnosesList: Diagnosis[]): Action => {
  return {
    type: 'SET_DIAGNOSES_LIST',
    payload: diagnosesList
  };
};

export const addPatient = (patient: Patient): Action => {
  return {
    type: 'ADD_PATIENT',
    payload: patient
  };
};

export const updatePatient = (patient: Patient): Action => {
  return {
    type: 'UPDATE_PATIENT',
    payload: patient
  };
};