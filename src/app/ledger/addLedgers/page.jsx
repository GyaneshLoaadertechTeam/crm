'use client';
import { Formik, Form, Field } from 'formik';
import { TextField, Button, Box } from '@mui/material';
import '../../globalStyle.css';
import { useRouter } from 'next/navigation';

const FileInput = ({ field, form, ...props }) => {
  const handleChange = (event) => {
    const file = event.currentTarget.files[0];
    form.setFieldValue(field.name, file);
  };
 
  return (
    <input
      type="file"
      onChange={handleChange}
      {...props}
    />
  );
};
const LedgerForm = () => {
  const router = useRouter();

  return (
    <Formik
    initialValues={{ ledgerName: '', description: '', amount: '', transactionImage: null  }}
  onSubmit={async (values) => {
    const formData = new FormData();
    // Append each value to the FormData object
    Object.keys(values).forEach(key => {
      if (key === 'profilePhoto') {
        if (values[key]) {
          formData.append(key, values[key]);
        }
      } else {
        formData.append(key, values[key]);
      }
    });
    const response = await fetch('/api/ledger', {
      method: 'POST',
      body: formData,
    });
    
    const result = await response.json();
    router.push("/ledger/ledgerTable");

    console.log(result);
  }}
      
    >
      {({ setFieldValue, handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <div className='containerStyle'>
            <Field
              as={TextField}
              name="ledgerName"
              label="Ledger Name"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <Field
              as={TextField}
              name="description"
              label="Description"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              margin="normal"
            />
            <Field
              as={TextField}
              name="amount"
              label="Amount"
              type="number"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <Box marginY={2}>
              <input
                id="transactionImage"
                name="transactionImage"
                type="file"
                onChange={(event) => {
                  setFieldValue('transactionImage', event.currentTarget.files[0]);
                }}
              />
            </Box>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LedgerForm;
