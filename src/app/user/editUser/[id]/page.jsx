"use client"

import React, { useEffect, useState, useRef } from 'react';

// import React, { useRef, useEffect,  } from 'react';
import { Formik, Form, Field } from 'formik';
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel
} from '@mui/material';
import { useParams, useSearchParams } from 'next/navigation';
import useAxios from '../../../globalComponent/useAxios';
import { useRouter } from 'next/navigation';

const FileInput = ({ field, form, ...props }) => {
  const handleChange = (event) => {
    const file = event.currentTarget.files[0];
    form.setFieldValue(field.name, file);
  };

  return <input type="file" onChange={handleChange} {...props} />;
};

const EditUser = () => {
    const router = useRouter();
const params = useParams();

  const formRef = useRef(null);
  const [user, setUser] = useState(null);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    async function fetchRoles() {
      try {
        const response = await fetch('/api/role');
        const data = await response.json();
        setRoles(data.roles);
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    }

    async function fetchUserData() {
      try {
        const response = await fetch(`/api/user/${params.id}`);
        const userData = await response.json();
        if (response.ok) {
          setUser(userData.user);
          console.log(userData);
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }

    fetchRoles();
    fetchUserData();
  }, []);

  return (
    <Formik
      enableReinitialize
      initialValues={{
        name: user?.name || '',
        number: user?.number || '',
        email: user?.email || '',
        roleId: user?.roleId || '',
        gender: user?.gender || '',
        address: user?.address || '',
        password: '',  // Passwords should not be pre-filled for security reasons
        profilePhoto: null
      }}
      onSubmit={async (values) => {
        const formData = new FormData();
        Object.keys(values).forEach(key => {
          if (key === 'profilePhoto' && values[key]) {
            formData.append(key, values[key]);
          } else {
            formData.append(key, values[key]);
          }
        });

        const response = await fetch(`/api/user/${params.id}`, {
          method: 'PUT',
          body: formData,
        });
        if (response.ok) {
          router.push("/user/userTable");
        } else {
          const result = await response.json();
          console.error('Failed to update user:', result);
        }
      }}
    >
      {({ handleSubmit }) => (
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Field as={TextField} name="name" label="Name" variant="outlined" fullWidth margin="normal" />
          <Field as={TextField} name="number" label="Number" variant="outlined" fullWidth margin="normal" />
          <Field as={TextField} name="email" label="Email" variant="outlined" fullWidth margin="normal" />

          <FormControl fullWidth margin="normal">
            <InputLabel>Role</InputLabel>
            <Field as={Select} name="roleId" label="Role">
              {roles.map((role) => (
                <MenuItem key={role._id} value={role._id}>
                  {role.name}
                </MenuItem>
              ))}
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

export default EditUser;
