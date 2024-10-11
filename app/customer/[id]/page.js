'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Box, Typography, Button } from '@mui/material';

export default function CustomerDetails({ params }) {
  const { id } = params;  // Capture the customer ID from the route
  const [customer, setCustomer] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();  // For navigation

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await axios.get(`/api/customer/${id}`);
        setCustomer(response.data);
      } catch (error) {
        console.error('Error fetching customer details:', error);
        setError('Failed to fetch customer details.');
      }
    };
    fetchCustomer();
  }, [id]);

  if (error) {
    return <Typography>{error}</Typography>;
  }

  if (!customer) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box>
      <Typography variant="h4">Customer Details</Typography>
      <Typography variant="h6">Name: {customer.name}</Typography>
      <Typography>Date of Birth: {new Date(customer.dateOfBirth).toLocaleDateString()}</Typography>
      <Typography>Member Number: {customer.memberNumber}</Typography>
      <Typography>Interests: {customer.interests}</Typography>

      {/* Button to navigate back to the customer list */}
      <Button onClick={() => router.push('/customer')} variant="contained" color="primary">
        Back to Customer List
      </Button>
    </Box>
  );
}
