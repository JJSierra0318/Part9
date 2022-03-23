import { Button, Grid } from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import { DiagnosisSelection, SelectField, TextField, TypeOptions } from "../AddPatientModal/FormField";
import { useStateValue } from "../state";
import { baseEntry, Entry, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from "../types";

export interface EntryFormValues extends 
  Omit<HospitalEntry, 'type' | 'id'>, 
  Omit<OccupationalHealthcareEntry, 'type' | 'id'>,
  Omit<HealthCheckEntry, 'type' | 'id'> { 
    type: Entry['type'] | ''
}

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const typeOptions: TypeOptions[] = [
  {value: 'HealthCheck', label: 'HealtCheck'},
  {value: 'Hospital', label: 'Hospital'},
  {value: 'OccupationalHealthcare', label: 'OccupationalHealthcare'}
];

const baseValues: Omit<baseEntry, 'type' | 'id'> = {
  description: '',
  date: '',
  specialist: '',
  diagnosisCodes: []
};

const HospitalValues: Omit<HospitalEntry, 'id'> = {
  ...baseValues,
  type: 'Hospital',
  discharge : {
    date: '',
    criteria: ''
  }
};

const OccupationalHealthcareValues: Omit<OccupationalHealthcareEntry, 'id'> = {
  ...baseValues,
  type: 'OccupationalHealthcare',
  employerName: '',
  sickLeave: {
    startDate: '',
    endDate: ''
  }
};

const HealthCheckValues: Omit<HealthCheckEntry, 'id'> = {
  ...baseValues,
  type: 'HealthCheck',
  healthCheckRating: 0
};

const initialValues: EntryFormValues = {
  ...baseValues,
  ...HospitalValues,
  ...OccupationalHealthcareValues,
  ...HealthCheckValues,
  type: 'Hospital'
};

export const AddEntryForm = ({onSubmit, onCancel}: Props) => {
  const [{ diagnoses }] = useStateValue();
  //const [selectedType, setSelectedType] = useState('');

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = 'Field is required';
        const errors: { [field: string]: ({ [subfield: string]: string} | string ) }  = {};
        if (!values.description) errors.description = requiredError;
        if (!values.date) errors.date = requiredError;
        if (values.date && (values.date.length !== 10 || isNaN(Date.parse(values.date)))) errors.date = 'invalid date format. Use YYYY-MM-DD';
        if (!values.specialist) errors.specialist = requiredError;
        if (values.type === 'Hospital') {
          if (!values.discharge.criteria) errors.discharge = { criteria: requiredError };
          if (!values.discharge.date) errors.discharge = { date: requiredError };
          if (values.discharge.date && (values.discharge.date.length !== 10 || isNaN(Date.parse(values.discharge.date)))) {
            errors.discharge = {date: 'invalid date format. Use YYYY-MM-DD'};
          }
        }
        if (values.type === 'HealthCheck') {
          const value = Number(values.healthCheckRating);
          if (!values.healthCheckRating) errors.healthCheckRating = requiredError;
          if (!value) errors.healthCheckRating = 'Field must be a number';
          if (value > 3 || value < 0) {
            errors.healthCheckRating = 'Rating must be a number between 0 and 3';
          }
        }
        if (values.type === 'OccupationalHealthcare') {
          if (!values.employerName) errors.employerName = requiredError;
          if (values.sickLeave?.startDate && (values.sickLeave?.startDate.length !== 10 || isNaN(Date.parse(values.sickLeave?.startDate)))) {
            errors.sickLeave = { startDate: 'invalid date format. Use YYYY-MM-DD' };
          }
          if (values.sickLeave?.endDate && (values.sickLeave?.endDate.length !== 10 || isNaN(Date.parse(values.sickLeave?.endDate)))) {
            errors.sickLeave = { endDate: 'invalid date format. Use YYYY-MM-DD' };
          }
        }
        return errors;
      }}
    >
      {// eslint-disable-next-line @typescript-eslint/no-unused-vars
      ({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {

        return (
          <Form className="form ui">
            <SelectField label="Type" name="type" options={typeOptions}/>
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <Field
              label='Description'
              placeholder='description'
              name='description'
              component={TextField}
            />
            <Field
              label='Date'
              placeholder='YYYY-MM-DD'
              name='date'
              component={TextField}
            />
            {values.type === 'Hospital'
              ? <>
                  <Field
                    label='Criteria'
                    placeholder='criteria'
                    name='discharge.criteria'
                    component={TextField}
                  />
                  <Field
                    label='Date of discharge'
                    placeholder='YYYY-MM-DD'
                    name='discharge.date'
                    component={TextField}
                  />
                </>
              : values.type === 'HealthCheck'
              ? <Field
                  label='Health Check Rating'
                  placeholder='rating (0 - 3)'
                  name='healthCheckRating'
                  component={TextField}
                />
              : <>
                  <Field
                    label='Employer Name'
                    placeholder='employer name'
                    name='employerName'
                    component={TextField}
                  />
                  <Field
                    label='Sick Leave Start Date'
                    placeholder='YYYY-MM-DD'
                    name='sickLeave.startDate'
                    component={TextField}
                  />
                  <Field
                    label='Sick Leave End Date'
                    placeholder='YYYY-MM-DD'
                    name='sickLeave.endDate'
                    component={TextField}
                  />
                </>}
            <Field
              label='Specialist'
              placeholder='specialist'
              name='specialist'
              component={TextField}
            />
            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={() => console.log(values)}
                >
                  Values
                </Button>
              </Grid>
              <Grid item>
              <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};