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
  ];
  const onEdit = (row) => {
    let rowId=row._id;
    console.log(rowId);
    try{
    router.push('/ledger/editLedger/'+rowId);

    }catch(error){
      console.log(error)
    }
    
  }

  const onDelete = (id) => {
    console.log(id);
  }
  return (
    <div>
      <Button variant="contained" href={'/ledger/addLedgers'}>
        Add Ledger 
      </Button>
      <h1>Ledger Table</h1>
      <GlobalTable columns={columns} data={ledger} {...{onEdit, onDelete, isEditDeleteButtonExist }} />

    </div>
  );
};

export default page;


