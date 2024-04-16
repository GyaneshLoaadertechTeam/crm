"use client"
import React, { useRef , useEffect, useState } from 'react';
// import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, RadioGroup, FormControlLabel, Radio, FormLabel } from '@mui/material';
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

const Page = () => {
  const router = useRouter();
  const formRef = useRef(null);
  return (
    <Formik
      initialValues={{
        name: '',
        number: ''    ,
        email: '',
        role: '',
        gender: '',
        address: '',
        password: '',
        profilePhoto: null
      }}
      onSubmit={async (values) => {
        const formData = new FormData();
        console.log(values)

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
        const response = await fetch('/api/user', {
          method: 'POST',
          body: formData,
        });
        const result = await response.json();

        if(response.ok == true){
                  router.push("/user/userTable");


        }
        console.log(demo);
        
        console.log(result);

      }}
    >
      {({ handleSubmit }) => (
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
          
          <Field name="profilePhoto" component={FileInput} />

          <Button type="submit" variant="contained" color="primary" fullWidth margin="normal">
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default Page;
