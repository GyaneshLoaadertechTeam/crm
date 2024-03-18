'use client'



import React from 'react';
import { Formik, Form, Field } from 'formik';
import { TextField, Button, Box } from '@mui/material';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import '../../globalStyle.css';

const page = () => {
    const router = useRouter();

  // Schema for validation
  const validationSchema = Yup.object().shape({
    question: Yup.string().required('Question is required'),
    answer: Yup.string().required('Answer is required'),
  });

  // Initial values for our form fields
  const initialValues = {
    question: '',
    answer: '',
  };

  // Function to handle form submission
  const handleSubmit = async(values, { setSubmitting }) => {
        console.log('Form Data:', values);
        try {
            const response = await fetch('/api/faq', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log('API Response:', responseData);
                router.push("/faq/faqTable");
            } else {
                console.error('Failed to submit data');
            }
        } catch (error) {
            console.error('Error submitting data', error);
        }    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form>
                      <div className="containerStyle">

          <Box marginY={2}>
            <Field
              as={TextField}
              label="Question"
              name="question"
              fullWidth
              error={touched.question && Boolean(errors.question)}
              helperText={touched.question && errors.question}
            />
          </Box>
          
          <Box marginY={2}>
            <Field
              as={TextField}
              label="Answer"
              name="answer"
              fullWidth
              multiline
              rows={4}
              error={touched.answer && Boolean(errors.answer)}
              helperText={touched.answer && errors.answer}
            />
          </Box>
          
          <Box marginY={2}>
            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              disabled={isSubmitting}
            >
              Submit
            </Button>
          </Box>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default page;
