"use client";
import { Formik, Form, Field } from 'formik';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, RadioGroup, FormControlLabel, Radio, FormLabel } from '@mui/material';
import React, { useRef } from 'react';

const Page = () => {
  const formRef = useRef(null);

  return (
    <Formik
      initialValues={{
        name: '',
        number: '',
        email: '',
        role: '',
        gender: '',
        address: '',
        password: '',
        profilePhoto: null
      }}
      onSubmit={async (values) => {
        const formData = new FormData(formRef.current);
        const response = await fetch('/api/user', {
          method: 'POST',
          body: formData,
        });

        const result = await response.json();
        console.log(result);
      }}
    >
      {({ setFieldValue, handleSubmit }) => (
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Field as={TextField} name="name" label="Name" variant="outlined" fullWidth margin="normal" />
          <Field as={TextField} name="number" label="Number" variant="outlined" fullWidth margin="normal" />
          <Field as={TextField} name="email" label="Email" variant="outlined" fullWidth margin="normal" />
          
          <FormControl fullWidth margin="normal">
            <InputLabel>Role</InputLabel>
            <Field as={Select} name="role" label="Role">
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="editor">Editor</MenuItem>
            </Field>
          </FormControl>

          <FormControl component="fieldset" margin="normal">
            <FormLabel component="legend">Gender</FormLabel>
            <Field as={RadioGroup} row name="gender">
              <FormControlLabel value="female" control={<Radio />} label="Female" />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="other" control={<Radio />} label="Other" />
            </Field>
          </FormControl>

          <Field as={TextField} name="address" label="Address" variant="outlined" fullWidth margin="normal" />
          <Field as={TextField} name="password" label="Password" type="password" variant="outlined" fullWidth margin="normal" />
          
          <input
            id="profilePhoto"
            name="profilePhoto"
            type="file"
            onChange={(event) => {
              setFieldValue('profilePhoto', event.currentTarget.files[0]);
            }}
          />

          <Button type="submit" variant="contained" color="primary" fullWidth margin="normal">
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default Page;
