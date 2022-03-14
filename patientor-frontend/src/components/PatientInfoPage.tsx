import { useParams } from "react-router-dom";
import { useStateValue } from "../state";
import { Entry, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry, Patient } from "../types";
import { Male } from "@mui/icons-material";
import { Female } from "@mui/icons-material";
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import FavoriteIcon from '@mui/icons-material/Favorite';
import WorkIcon from '@mui/icons-material/Work';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

//Component for HealthCheck entry
const HealthCheck = (entry: HealthCheckEntry) => {
  const heartColor = (rating: number): string => {
    switch (rating) {
      case 0:
        return 'green';
      case 1:
        return 'gold';
      case 2:
        return 'orange';
      case 3:
        return 'maroon';
      default:
        return '';
    }
  };

  return (
    <div style={{ border: '1px solid' }}>
      <ul>
        <li>{entry.date} <MedicalServicesIcon/></li>
      </ul>
      <p>{entry.description}</p>
      <FavoriteIcon style={{ color: heartColor(entry.healthCheckRating) }}/>
      <p>diagnose by {entry.specialist}</p>
    </div>
  );
};

//Component for OccupationalHealthcare Entry
const OccupationalHealthcare = (entry: OccupationalHealthcareEntry) => {
  return (
    <div style={{ border: '1px solid' }}>
      <ul>
        <li>{entry.date} <WorkIcon /> <em>{entry.employerName}</em></li>
      </ul>
      <p>{entry.description}</p>
      {entry.sickLeave 
        ? <p>Authorized sick leave from {entry.sickLeave.startDate} to {entry.sickLeave.endDate}</p>
        : null}
      <p>diagnose by {entry.specialist}</p>
    </div>
  );
};

//Component for Hospital Entry
const Hospital = (entry: HospitalEntry) => {
  return (
    <div style={{ border: '1px solid' }}>
      <ul>
        <li>{entry.date} <LocalHospitalIcon /></li>
      </ul>
      <p>{entry.description}</p>
      <p>Patient will be discharged on {entry.discharge.date} when: {entry.discharge.criteria}</p>
      <p>diagnose by {entry.specialist}</p>
    </div>
  );
};

const EntryDetails = (entry: Entry) => {
  const assertNever = (value: never): never => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
  };

  switch (entry.type) {
    case 'HealthCheck':
      return <HealthCheck {...entry}/>;
    case 'Hospital':
      return <Hospital {...entry}/>;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcare {...entry}/>;
    default:
      return assertNever(entry);
  }
};

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
    {patient.entries.map(entry => <EntryDetails key={entry.id} {...entry}/>)}
  </div>;
};
export default PatientInfoPage;