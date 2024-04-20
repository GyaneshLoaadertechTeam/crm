"use client"

import React, { useEffect, useState } from 'react';
import { Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Switch, Backdrop } from '@mui/material';
import GlobalTable from '../../globalComponent/globalTable'
import { useParams, useSearchParams } from 'next/navigation';

export default function Page() {
  const params = useParams();

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentRoleId, setCurrentRoleId] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [permission, setPermission] = useState([
    { feature: 'Lead', create: false, read: false, update: false, fullAccess: false },
    { feature: 'sales', create: false, read: false, update: false, fullAccess: false },
    { feature: 'Hr', create: false, read: false, update: false, fullAccess: false },
    { feature: 'User', create: false, read: false, update: false, fullAccess: false },
    { feature: 'Role', create: false, read: false, update: false, fullAccess: false },
    { feature: 'Leaders', create: false, read: false, update: false, fullAccess: false },
    { feature: 'Venders', create: false, read: false, update: false, fullAccess: false },
    { feature: 'Leaders', create: false, read: false, update: false, fullAccess: false },
    { feature: 'wallet', create: false, read: false, update: false, fullAccess: false },
  ]);
  const [roles, setRoles] = useState([]);
  const isEditDeleteButtonExist=true;

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
    fetchRoles();
  }, []);
  const columns = [
    { id: 'name', label: 'Role Name', sortable: true },
    { id: 'description', label: 'description', sortable: true },
   
  ];
  const onDelete = (id) => {
    console.log(id);
  }
  const openPopup = () => {
    setIsPopupOpen(true);
    setIsEditing(false);
    setCurrentRoleId(null);
    setName('');
    setDescription('');
  }

  const onEdit = (row) => {
    setIsPopupOpen(true);
    setIsEditing(true);
    setCurrentRoleId(row._id);
    console.log(row._id);
    setName(row.name);
    setDescription(row.description);
    setPermission(row.permission);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isEditing ? `/api/role/${currentRoleId}` : '/api/role';
    const method = isEditing ? 'PUT' : 'POST';
    const data = { name, description, permission };

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const message = isEditing ? 'Role updated successfully' : 'Role created successfully';
        console.log(message);
      } else {
        console.error('Failed to process role');
      }
    } catch (error) {
      console.error('Error processing role:', error);
    } finally {
      closePopup();
    }
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };
  const handleToggle = (index, type, value) => {
    setPermission((prevData) => {
      const newData = [...prevData];
      newData[index][type] = value;

      // If the type is 'fullAccess' and value is true, turn on/off all other switches
      if (type === 'fullAccess') {
        newData[index].create = value;
        newData[index].read = value;
        newData[index].update = value;
        // Add more features as needed
      }

      return newData;
    });
  };

  // Render function and other component code remain unchanged

  return (
    <div>
      <Button variant="contained" onClick={openPopup}>Add Role</Button>
      <Backdrop open={isPopupOpen} style={{ zIndex: 1000 }}>
        <div className="popup" style={{ maxHeight: '80%', overflowY: 'auto' }}>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-12">
                <TextField fullWidth id="name" label="Name" variant="outlined" value={name} onChange={(e) => setName(e.target.value)} required margin="normal" />
              </div>
              <div className="col-md-12">
                <TextField fullWidth id="description" label="Description" variant="outlined" value={description} onChange={(e) => setDescription(e.target.value)} required margin="normal" />
              </div>
              <div className="col-md-12" style={{display: "flex", justifyContent: "center"}}>
                <TableContainer style={{width: "100%", height: "100%"}}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Feature</TableCell>
                        <TableCell>Create</TableCell>
                        <TableCell>Read</TableCell>
                        <TableCell>Update</TableCell>
                        <TableCell>Full Access</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {permission.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell>{row.feature}</TableCell>
                          <TableCell>
                            <Switch checked={row.create} onChange={() => handleToggle(index, 'create', !row.create)} />
                          </TableCell>
                          <TableCell>
                            <Switch checked={row.read} onChange={() => handleToggle(index, 'read', !row.read)} />
                          </TableCell>
                          <TableCell>
                            <Switch checked={row.update} onChange={() => handleToggle(index, 'update', !row.update)} />
                          </TableCell>
                          <TableCell>
                            <Switch checked={row.fullAccess} onChange={() => handleToggle(index, 'fullAccess', !row.fullAccess)} />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </div>
            <div className="button-container">
              <Button type="submit" variant="contained" color="primary">Submit</Button>
              <Button type="button" variant="outlined" onClick={closePopup}>Close</Button>
            </div>
          </form>
        </div>
      </Backdrop>
      <div>
        <h1>Role Table</h1>
        <GlobalTable columns={columns} data={roles} {...{ onEdit, onDelete, isEditDeleteButtonExist }} />
      </div>
      <style jsx>{`
        .popup {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            padding: 20px;
            background-color: #fff;
            border: 1px solid #ccc;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
            width: 70%;
        }
        .button-container {
          display: flex;
          justify-content: space-between;
          margin-top: 20px;
        }
        .button-container button {
          flex: 1;
        }
      `}</style>
    </div>
  );
}
