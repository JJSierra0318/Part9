import { Button, Grid } from "@material-ui/core";
import { Formik, Form} from "formik";
import { DiagnosisSelection, SelectField, TypeOptions } from "../AddPatientModal/FormField";
import { useStateValue } from "../state";
import { Entry } from "../types";
export type EntryFormValues = Omit<Entry, 'id'>;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const typeOptions: TypeOptions[] = [
  {value: 'HealthCheck', label: 'HealtCheck'},
  {value: 'Hospital', label: 'Hospital'},
  {value: 'OccupationalHealthcare', label: 'OccupationalHealthcare'}
];

export const AddEntryForm = ({onSubmit, onCancel}: Props) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        type: 'Hospital',
        description: "",
        date:  "",
        specialist: ""
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = 'Field is required';
        const errors: { [fields: string]: string } = {};
        if (!values.description) errors.description = requiredError;
        if (!values.date) errors.date = requiredError;
        if (!values.specialist) errors.specialist = requiredError;
      }}
    >
      {// eslint-disable-next-line @typescript-eslint/no-unused-vars
      ({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <SelectField label="Type" name="type" options={typeOptions} />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
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