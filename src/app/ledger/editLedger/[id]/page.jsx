'use client';
import { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { TextField, Button, Box } from '@mui/material';
// import '../../globalStyle.css';
import { useParams, useSearchParams } from 'next/navigation';

// import { useRouter } from 'next/router'; // Corrected from 'next/navigation'

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

const LedgerForm = ({}) => {
    const params = useParams();
//   const router = useRouter();
  const [initialValues, setInitialValues] = useState({
    ledgerName: '',
    description: '',
    amount: '',
    transactionImage: null
  });

  useEffect(() => {
    const fetchLedgerDetails = async () => {
      const response = await fetch(`/api/ledger/${params.id}`);
      if (!response.ok) {
        console.error('Failed to fetch ledger details');
        return;
      }
      const data = await response.json();
      console.log(data);
      setInitialValues({
        ledgerName: data.ledgers.ledgerName,
        description: data.ledgers.description,
        amount: data.ledgers.amount,
        transactionImage: data.ledgers.transactionImage,
        // Assuming 'transactionImage' is not fetched because it's a file
      });
    };

      fetchLedgerDetails();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize // Allows Formik to reset the form when initialValues change
      onSubmit={async (values) => {
        const formData = new FormData();
        Object.keys(values).forEach(key => {
          if (key === 'transactionImage' && values[key]) {
            formData.append(key, values[key]);
          } else {
            formData.append(key, values[key]);
          }
        });

        const response = await fetch(`/api/ledger/${params.id}`, {
          method: 'PUT',
          body: formData,
        });

        const result = await response.json();
        if (response.ok) {
          router.push("/ledger/ledgerTable");
        } else {
          console.error('Failed to update the ledger:', result);
        }
      }}
    >
      {({ setFieldValue, handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <div className='containerStyle'>
            <Field as={TextField} name="ledgerName" label="Ledger Name" variant="outlined" fullWidth margin="normal" />
            <Field as={TextField} name="description" label="Description" variant="outlined" fullWidth multiline rows={4} margin="normal" />
            <Field as={TextField} name="amount" label="Amount" type="number" variant="outlined" fullWidth margin="normal" />
            <Box marginY={2}>
              <input
                id="transactionImage"
                name="transactionImage"
                type="file"
                onChange={(event) => setFieldValue('transactionImage', event.currentTarget.files[0])}
              />
            </Box>
            <Button type="submit" variant="contained" color="primary">
              Update
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LedgerForm;
