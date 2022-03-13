import { useParams } from "react-router-dom";
import { useStateValue } from "../state";
import { Patient } from "../types";
import { Male } from "@mui/icons-material";
import { Female } from "@mui/icons-material";

const PatientInfoPage = () => {
  const findPatient = (patients: Patient[]): Patient | undefined => {
    return patients.find(patient => patient.id === id);
  };

  const { id } = useParams<{ id: string }>();
  const [{patients}] = useStateValue();
  const patient = findPatient(Object.values(patients));

  if (!patient) return null;

  return <div>
    <table>
      <tbody>
        <tr>
          <td><h2>{patient.name}</h2></td>
          <td>{patient.gender === 'male' ? <Male /> : <Female />}</td>
        </tr>
      </tbody>
    </table>
    <p>ssh: {patient.ssn}</p>
    <p>occupation: {patient.occupation}</p>
    <br/><h3>entries</h3>
    {patient.entries.map(entry => <div key={entry.id}>
      <p>{entry.date} {entry.description}</p>
      <ul>
        {entry.diagnosisCodes?.map(code => <li key={code}>{code}</li>)}
      </ul>
    </div>)}
  </div>;
};
export default PatientInfoPage;