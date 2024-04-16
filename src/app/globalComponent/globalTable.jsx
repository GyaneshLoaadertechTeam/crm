/* eslint-disable react-hooks/rules-of-hooks */
// globalTable.js
import React, { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TextField,
  TablePagination,
  IconButton
} from '@mui/material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'; // for rows with no image

const GlobalTable = ({ columns, data, onEdit, onDelete }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [orderBy, setOrderBy] = useState('');
  const [order, setOrder] = useState('asc');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setPage(0);
  };

  const handleSort = (columnId) => {
    const isAsc = orderBy === columnId && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(columnId);
  };

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const filteredData = data.filter((item) =>
    Object.values(item).some((value) => String(value).toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const sortedData = orderBy
    ? [...filteredData].sort((a, b) => (order === 'asc' ? a[orderBy] > b[orderBy] : a[orderBy] < b[orderBy]) ? 1 : -1)
    : filteredData;

  const paginatedData = sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  const augmentedColumns = [...columns, { id: 'actions', label: 'Actions', sortable: false }];

  return (
    <Paper>
      <TextField
        label="Search"
        value={searchTerm}
        onChange={handleSearch}
      />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {augmentedColumns.map((column) => (
                <TableCell
                  key={column.id}
                  onClick={() => column.sortable && handleSort(column.id)}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row, index) => (
              <TableRow key={index}>
                {augmentedColumns.map((column) => (
                  <TableCell key={column.id}>
                    {column.id === 'actions' ? (
                      <>
                        <IconButton onClick={() => onEdit(row)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => onDelete(row)}>
                          <DeleteIcon />
                        </IconButton>
                      </>
                    ) : column.isImage && row[column.id] ? (
                      <img src= {row[column.id]} alt={row.name} style={{ width: '100px', height: 'auto' }} />
                    ) : column.isImage ? (
                      <VisibilityOffIcon /> // or any placeholder for missing images
                    ) : (
                      row[column.id]
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={sortedData.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default GlobalTable;

