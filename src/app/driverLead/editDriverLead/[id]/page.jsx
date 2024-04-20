/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import useAxios from '@/src/app/globalComponent/useAxios';
import { useParams } from 'next/navigation';
import { Formik, Form, Field } from 'formik';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import * as Yup from 'yup';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import '../../../globalStyle.css';



// Define the validation schema using Yup
const validationSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    phone: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email'),
    vehicleNumber: Yup.string().required('Required'),
    vehicleType: Yup.string().required('Required'),
    leadType: Yup.string().required('Required'),
    remarks: Yup.string(),
    leadStatus: Yup.string().required('Required'),
    date: Yup.string().required('Required')
});

export default function page() {
    const params = useParams();
    console.log(params);
    const router=useRouter();
    const { response, error, loading } = useAxios({
        url: `http://localhost:3000/api/driverLead/${params.id}`,
        method: 'GET'
    });
    console.log(response);
    console.log(error);
    if (error) {
        return <h1>Something went wrong</h1>
    }

    if (loading) {
        return <p>...loading</p>
    }

    return (
        <Formik
            initialValues={{
                name: response.driverlead.name,
                phone: response.driverlead.phone,
                email: response.driverlead.email,
                vehicleType: response.driverlead.vehicleType,
                vehicleNumber: response.driverlead.vehicleNumber,
                leadType: response.driverlead.leadType,
                remarks: response.driverlead.remarks,
                leadStatus: response.driverlead.leadStatus,
                date:response.driverlead.date
            }}

            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                axios.put(`http://localhost:3000/api/driverLead/${params.id}`, JSON.stringify(values)).then((response) => {
                    console.log(response)
                    router.push("/driverLead/driverLeadTable")
                }).catch((error) => {
                    console.log(error)
                })
            }}
        >
            {({ isSubmitting, errors, touched }) => (
                <Form>
                                        <div className='containerStyle'>


<div className="row row-margin">
                    <div className="col-md-4">
                        <label htmlFor="name" className="form-label">Name</label>
                        <Field name="name" type="text" className={`form-control ${touched.name && errors.name ? "is-invalid" : ""}`} />
                        {touched.name && errors.name && <div className="invalid-feedback">{errors.name}</div>}
                    </div>

                    <div className="col-md-4">
                        <label htmlFor="phone" className="form-label">Phone</label>
                        <Field name="phone" type="text" className={`form-control ${touched.phone && errors.phone ? "is-invalid" : ""}`} />
                        {touched.phone && errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                    </div>

                    <div className="col-md-4">
                        <label htmlFor="email" className="form-label">Email</label>
                        <Field name="email" type="email" className={`form-control ${touched.email && errors.email ? "is-invalid" : ""}`} />
                        {touched.email && errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>
                    </div>

                    <div className="row row-margin">
                    <div className="col-md-4">
                        <label htmlFor="vehicleNumber" className="form-label">Vehicle Number</label>
                        <Field name="vehicleNumber" type="text" className={`form-control ${touched.vehicleNumber && errors.vehicleNumber ? "is-invalid" : ""}`} />
                        {touched.vehicleNumber && errors.vehicleNumber && <div className="invalid-feedback">{errors.vehicleNumber}</div>}
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="vehicleType" className="form-label">Vehicle Type</label>
                        <Field as="select" name="vehicleType" className={`form-control ${touched.vehicleType && errors.vehicleType ? "is-invalid" : ""}`}>
                            <option value="">Select Vehicle Type</option>
                            <option value="1">Vehicle 1</option>
                            <option value="2">Vehicle 2</option>
                            <option value="3">Vehicle 3</option>
                            {/* Add more options as needed */}
                        </Field>
                        {touched.vehicleType && errors.vehicleType && <div className="invalid-feedback">{errors.vehicleType}</div>}
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="leadType" className="form-label">Lead Type</label>
                        <Field as="select" name="leadType" className={`form-control ${touched.leadType && errors.leadType ? "is-invalid" : ""}`}>
                            <option value="">Select Lead Type</option>
                            <option value="A+(Hot)">A+ (Hot)</option>
                            <option value="A(Warm)">A (Warm)</option>
                            <option value="B+(Cold)">B+ (Cold)</option>
                            {/* Add more options as needed */}
                        </Field>
                        {touched.leadType && errors.leadType && <div className="invalid-feedback">{errors.leadType}</div>}
                    </div>
                    </div>


                    <div className="row row-margin">
                    <div className="col-md-4">
                        <label htmlFor="remarks" className="form-label">Remarks</label>
                        <Field name="remarks" as="textarea" className={`form-control ${touched.remarks && errors.remarks ? "is-invalid" : ""}`} />
                        {touched.remarks && errors.remarks && <div className="invalid-feedback">{errors.remarks}</div>}
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="leadStatus" className="form-label">Lead Status</label>
                        <Field as="select" name="leadStatus" className={`form-control ${touched.leadStatus && errors.leadStatus ? "is-invalid" : ""}`}>
                            <option value="">Select Lead Status</option>
                            <option value="lead">Lead</option>
                            <option value="call">Call</option>
                            <option value="notConnected">Not Connected</option>
                            <option value="notMatched">Not Matched</option>
                            <option value="active">Active</option>
                            <option value="closed">Closed</option>
                            {/* Add more options as needed */}
                        </Field>
                        {touched.leadStatus && errors.leadStatus && <div className="invalid-feedback">{errors.leadStatus}</div>}
                    </div>
                    <div className="col-md-4">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="FollowUp Date"
                                    onChange={value => setFieldValue('date', value)}
                                    className={`form-control ${touched.date && errors.date ? "is-invalid" : ""}`} 
                                   
                                />
                            </LocalizationProvider>
                        </div>
                        </div>

                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                        Submit
                    </button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}
