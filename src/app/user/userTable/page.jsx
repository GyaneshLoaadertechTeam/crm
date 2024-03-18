// pages/SomePage.js
"use client"
// import React from 'react';
import React, { useEffect, useState } from 'react';
import { Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Switch } from '@mui/material';
import Link from 'next/link';
import useAxios from "./../../globalComponent/useAxios";
import GlobalTable from '../../globalComponent/globalTable'
import { useRouter } from 'next/navigation';

const page = () => {
  const router = useRouter();
  const [leads, setLeads] = useState([]);
  const isEditDeleteButtonExist=true;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/user');
        const data = await response.json();
        console.log(data);
        setLeads(data.users); // Update this line to match the key in the response
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
  
    fetchData();
  }, []);
  const columns = [
    { id: 'name', label: 'ID', sortable: true },
    { id: 'phone', label: 'Phone', sortable: true },
    { id: 'email', label: 'Email', sortable: true },
    { id: 'leadType', label: 'LeadType', sortable: true },
    { id: 'remarks', label: 'Remarks', sortable: true },
  ];


  const onEdit = (row) => {
    let rowId=row._id;
    try{
    router.push('/user/editUser/'+rowId);

    }catch(error){
      console.log(error)
    }
    
  }

  const onDelete = (id) => {
    console.log(id);
  }
  return (
    <div>
      <Button variant="contained" href={'/user/addUser'}>
        Add User
      </Button>
      <h1>User Table</h1>
      <GlobalTable columns={columns} data={leads} {...{ onEdit, onDelete,isEditDeleteButtonExist }} />
    </div>
  );
};

export default page;

