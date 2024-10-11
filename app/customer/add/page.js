'use client';

import { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function AddCustomer() {
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    memberNumber: '',
    interests: '',
  });
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/customer', formData);
      alert('Customer added successfully');
      router.push('/customer'); // Redirect to customer list after adding
    } catch (error) {
      console.error('Error adding customer', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Date of Birth"
        name="dateOfBirth"
        type="date"
        value={formData.dateOfBirth}
        onChange={handleChange}
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        required
      />
      <TextField
        label="Member Number"
        name="memberNumber"
        value={formData.memberNumber}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Interests"
        name="interests"
        value={formData.interests}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <Box sx={{ mt: 2 }}>
        <Button type="submit" variant="contained" color="primary">
          Add Customer
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => router.push('/customer')}
          sx={{ ml: 2 }}
        >
          Back to Customer List
        </Button>
      </Box>
    </Box>
  );
}
