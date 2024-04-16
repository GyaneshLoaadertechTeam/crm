/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import React, { useEffect, useState } from 'react';
import { Button} from '@mui/material';
import GlobalTable from '../../globalComponent/globalTable'
import { useRouter } from 'next/navigation';
const page = () => {
  const router = useRouter();
  const [ledger, setLedger] = useState([]);
  const isEditDeleteButtonExist=true;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/ledger');
              const data = await response.json();
              setLedger(data.ledgers);
              console.log(data)
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
  
    fetchData();
  }, []);
  const columns = [
    { id: 'ledgerName', label: 'Ledger Name', sortable: true },
    { id: 'description', label: 'Description', sortable: true },
    { id: 'amount', label: 'Amount', sortable: true },
    { id: 'transactionImage', label: 'Photo', sortable: false, isImage: true },

    // { id: 'transactionImage', label: 'transactionImage', sortable: true },
   
  ];
  // const columns = [
  //   { id: 'name', label: 'ID', sortable: true },
  //   { id: 'number', label: 'Phone', sortable: true },
  //   { id: 'email', label: 'Email', sortable: true },
  //   { id: 'role', label: 'Role', sortable: true },
  //   { id: 'gender', label: 'Gender', sortable: true },
  // ];

  return (
    <div>
      <Button variant="contained" href={'/ledger/addLedgers'}>
        Add Ledger 
      </Button>
      <h1>Ledger Table</h1>
      <GlobalTable columns={columns} data={ledger} {...{ isEditDeleteButtonExist }} />

    </div>
  );
};

export default page;


