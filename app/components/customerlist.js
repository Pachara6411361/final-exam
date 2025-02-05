'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box } from '@mui/material';
import { useRouter } from 'next/navigation';  // For client-side navigation

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState(null);
  const router = useRouter();  // Use router to navigate

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('/api/customer');
        setCustomers(response.data);
      } catch (error) {
        console.error('Error fetching customers', error);
        setError('Failed to fetch customers.');
      }
    };
    fetchCustomers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/customer/${id}`);
      setCustomers(customers.filter(customer => customer._id !== id));
    } catch (error) {
      console.error('Error deleting customer', error);
    }
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button variant="contained" color="primary" onClick={() => router.push('/customer/add')}>
          Add Customer
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Date of Birth</TableCell>
              <TableCell>Member Number</TableCell>
              <TableCell>Interests</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {error ? (
              <TableRow>
                <TableCell colSpan={5} style={{ textAlign: 'center' }}>
                  {error}
                </TableCell>
              </TableRow>
            ) : (
              customers.map(customer => (
                <TableRow key={customer._id}>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{new Date(customer.dateOfBirth).toLocaleDateString()}</TableCell>
                  <TableCell>{customer.memberNumber}</TableCell>
                  <TableCell>{customer.interests}</TableCell>
                  <TableCell>
                    {/* Link to customer details */}
                    <Button onClick={() => router.push(`/customer/${customer._id}`)}>View</Button>
                    <Button onClick={() => handleDelete(customer._id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
