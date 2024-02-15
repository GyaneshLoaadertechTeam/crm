'use client'

import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import '../../globalStyle.css'

// Validation schema using Yup
const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    phone: Yup.string().required('Phone is required'),
    email: Yup.string().email('Invalid email'),
    vehicleNumber: Yup.string().required('Vehicle Number is required'),
    vehicleType: Yup.string().required('Type of Vehicles is required'),
    leadType: Yup.string().required('Lead Type is required'),
    remarks: Yup.string().required('Remarks are required'),
    leadStatus: Yup.string().required('Lead Status is required'),
    date: Yup.date().required('Date is required'), 
});

export default function page() {
    const router = useRouter();

    return (
        <Formik
            initialValues={{
                name: '',
                phone: '',
                email: '',
                vehicleType: '',
                vehicleNumber: '',
                leadType: '',
                remarks: '',
                leadStatus: '',
                date: dayjs(),
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
                console.log('Form Data:', values);
                try {
                    const response = await fetch('/api/driverLead', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(values),
                    });

                    if (response.ok) {
                        const responseData = await response.json();
                        console.log('API Response:', responseData);
                        alert("driver Lead successfully Submitted")
                        // router.push("/lead/leadTable");
                    } else {
                        console.error('Failed to submit data');
                    }
                } catch (error) {
                    console.error('Error submitting data', error);
                }
                setSubmitting(false);
            }}
        >
            {({ values, handleChange, handleBlur, setFieldValue, errors, touched, isSubmitting }) => (
                <Form>
                    <div className='containerStyle'>
                        {/* Name */}
                        <div className="row row-margin">

                        <div className="col-md-4">
                            <TextField
                                fullWidth
                                name="name"
                                label="Name"
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.name && Boolean(errors.name)}
                                helperText={touched.name && errors.name}
                            />
                        </div>

                        {/* Phone */}
                        <div className="col-md-4">
                            <TextField
                                fullWidth
                                name="phone"
                                label="Phone"
                                value={values.phone}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.phone && Boolean(errors.phone)}
                                helperText={touched.phone && errors.phone}
                            />
                        </div>

                        {/* Email */}
                        <div className="col-md-4">
                            <TextField
                                fullWidth
                                name="email"
                                label="Email"
                                type="email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.email && Boolean(errors.email)}
                                helperText={touched.email && errors.email}
                            />
                        </div>
                        </div>
                        <div className="row row-margin">

                         {/* Vehicle Number */}
                         <div className="col-md-4">
                            <TextField
                                fullWidth
                                name="vehicleNumber"
                                label="vehicleNumber"
                                value={values.vehicleNumber}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.vehicleNumber && Boolean(errors.vehicleNumber)}
                                helperText={touched.vehicleNumber && errors.vehicleNumber}
                            />
                        </div>
                        {/* Vehicle Type */}
                        <div className="col-md-4">
                            <FormControl fullWidth error={touched.vehicleType && Boolean(errors.vehicleType)}>
                                <InputLabel id="vehicle-type-label">Type of Vehicles</InputLabel>
                                <Field
                                    as={Select}
                                    name="vehicleType"
                                    labelId="vehicle-type-label"
                                    value={values.vehicleType}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                >
                                    <MenuItem value="1">Vehicle 1</MenuItem>
                                    <MenuItem value="2">Vehicle 2</MenuItem>
                                    <MenuItem value="3">Vehicle 3</MenuItem>
                                </Field>
                                <FormHelperText>{errors.vehicleType}</FormHelperText>
                            </FormControl>
                        </div>

                        {/* Lead Type */}
                        <div className="col-md-4">
                            <FormControl fullWidth error={touched.leadType && Boolean(errors.leadType)}>
                                <InputLabel id="lead-type-label">Lead Type</InputLabel>
                                <Field
                                    as={Select}
                                    name="leadType"
                                    labelId="lead-type-label"
                                    value={values.leadType}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                >
                                    <MenuItem value="A+(Hot)">A+(Hot)</MenuItem>
                                    <MenuItem value="A(Warm)">A(Warm)</MenuItem>
                                    <MenuItem value="B+(Cold)">B+(Cold)</MenuItem>
                                </Field>
                                <FormHelperText>{errors.leadType}</FormHelperText>
                            </FormControl>
                        </div>
                        </div>
                        <div className="row row-margin">


                        {/* Lead Status */}
                        <div className="col-md-4">
                            <FormControl fullWidth error={touched.leadStatus && Boolean(errors.leadStatus)}>
                                <InputLabel id="lead-status-label">Lead Status</InputLabel>
                                <Field
                                    as={Select}
                                    name="leadStatus"
                                    labelId="lead-status-label"
                                    value={values.leadStatus}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                >
                                    <MenuItem value="lead">Lead</MenuItem>
                                    <MenuItem value="call">Call</MenuItem>
                                    <MenuItem value="notConnected">Not Connected</MenuItem>
                                    <MenuItem value="notMatched">Not Matched</MenuItem>
                                    <MenuItem value="active">Active</MenuItem>
                                    <MenuItem value="closed">Closed</MenuItem>
                                </Field>
                                <FormHelperText>{errors.leadStatus}</FormHelperText>
                            </FormControl>
                        </div>

                        

                        {/* Date Picker */}
                        <div className="col-md-4">
                            <LocalizationProvider
                             dateAdapter={AdapterDayjs}>
                                <DatePicker
                                
                                    label="FollowUp Date"
                                    value={values.date}
                                    onChange={value => setFieldValue('date', value)}
                                    renderInput={(params) => (
                                        <TextField {...params} error={touched.date && Boolean(errors.date)} helperText={touched.date && errors.date} />
                                    )}
                                />
                            </LocalizationProvider>
                        </div>
                                                {/* Remarks */}

                        <div className="col-md-4">
                            <TextField
                                fullWidth
                                name="remarks"
                                label="Remarks"
                                type="text"
                                value={values.remarks}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.remarks && Boolean(errors.remarks)}
                                helperText={touched.remarks && errors.remarks}
                            />
                        </div>
                        </div>

                        {/* Submit Button */}
                        <div className="col-md-12">
                            <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                                Submit
                            </Button>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    );
}
