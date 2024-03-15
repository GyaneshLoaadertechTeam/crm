'use client';
import { Formik, Form, Field } from 'formik';
import { TextField, Button, Box } from '@mui/material';
import '../../globalStyle.css';
import { useRouter } from 'next/navigation';


const LedgerForm = () => {
  const router = useRouter();

  return (
    <Formik
    initialValues={{ ledgerName: '', description: '', amount: '', transactionImage: null  }}
    onSubmit={async (values, { setSubmitting }) => {
      console.log('Form Data:', values);
      try {
          const response = await fetch('/api/ledger', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(values),
          });

          if (response.ok) {
              const responseData = await response.json();
              console.log('API Response:', responseData);
              router.push("/ledger/ledgerTable");
          } else {
              console.error('Failed to submit data');
          }
      } catch (error) {
          console.error('Error submitting data', error);
      }
      setSubmitting(false);
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
