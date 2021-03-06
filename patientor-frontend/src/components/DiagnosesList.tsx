import React from "react";
import { Diagnosis } from "../types";

const DiagnosesList: React.FC<{diagnoses: Array<Diagnosis>}> = ({diagnoses}) => (
  <ul>
    {diagnoses.map((diagnosis => <li key={diagnosis.code}>{diagnosis.code}: <em>{diagnosis.name}</em></li>))}
  </ul>
);

export default DiagnosesList;