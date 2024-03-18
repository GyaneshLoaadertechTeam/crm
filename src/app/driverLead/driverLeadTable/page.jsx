"use client"
import React, { useEffect, useState } from 'react';
import { Button} from '@mui/material';
import GlobalTable from '../../globalComponent/globalTable'
import { useRouter } from 'next/navigation';

const page = () => {
  const router = useRouter();
  const [driverLead, setdriverLead] = useState([]);
  const isEditDeleteButtonExist=true;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/driverLead');
        const data = await response.json();
        setdriverLead(data.driverlead);
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
    { id: 'leadType', label: 'Lead Type', sortable: true },
    { id: 'leadStatus', label: 'LeadS tatus', sortable: true },
    { id: 'remarks', label: 'Remarks', sortable: true },
  ];


  const onEdit = (row) => {
    console.log(row);
    
    let rowId=row._id;
    try{
           router.push('/driverLead/editDriverLead/'+rowId);

    }catch(error){
      console.log(error)
    }
    
  }

  const onDelete = (id) => {
    console.log(id);
  }
  return (
    <div>
      <Button variant="contained" href={'/driverLead/addDriverLead'}>
        Add Driver Lead
      </Button>
      <h1>Driver Lead Table</h1>
      <GlobalTable columns={columns} data={driverLead} {...{ onEdit, onDelete,isEditDeleteButtonExist }} />
    </div>
  );
};

export default page;

