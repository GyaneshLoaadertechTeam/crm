// 'use client'

// import { Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Switch } from '@mui/material';

// import AttachFileIcon from '@mui/icons-material/AttachFile';

// const page = () => {
//   return (
//    <div>
//     <Button variant="contained" href={'/ledger/addLedgers'}>
//         Add Ledger
//       </Button>
//    </div>
//   );
// };

// export default page;
"use client"
import React, { useEffect, useState } from 'react';
import { Button} from '@mui/material';
import GlobalTable from '../../globalComponent/globalTable'
import { useRouter } from 'next/navigation';

const page = () => {
  const router = useRouter();
  const [driverLead, setdriverLead] = useState([]);
  const isEditDeleteButtonExist=true;
  const Lead = [

  ]
      // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('/api/driverLead');
  //       const data = await response.json();
  //       setdriverLead(data.driverlead);
  //     } catch (error) {
  //       console.error('Error fetching data', error); =
  //     }
  //   };

  //   fetchData();
  // }, []);
  const columns = [
    { id: 'name', label: 'Ledger Name', sortable: true },
    { id: 'phone', label: 'Description', sortable: true },
    { id: 'email', label: 'Amount', sortable: true },
    { id: 'leadType', label: 'Transaction Image', sortable: true },
   
  ];

  return (
    <div>
      <Button variant="contained" href={'/ledger/addLedgers'}>
        Add Ledger 
      </Button>
      <h1>Ledger Table</h1>
      <GlobalTable columns={columns} data={driverLead} {...{ isEditDeleteButtonExist }} />
    </div>
  );
};

export default page;


