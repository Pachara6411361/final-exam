import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { TextField, Button, Box } from '@mui/material';

export default function EditCustomer() {
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    memberNumber: '',
    interests: ''
  });
  const router = useRouter();
  const { id } = router.query;  // Customer ID from the URL

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await axios.get(`/api/customer/${id}`);  // Fetch the customer to edit
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching customer', error);
      }
    };
    if (id) fetchCustomer();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/customer/${id}`, formData);  // API call to update the customer
      alert('Customer updated successfully');
      router.push('/customer');  // Redirect back to the customer list
    } catch (error) {
      console.error('Error updating customer', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
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
      />
      <TextField
        label="Member Number"
        name="memberNumber"
        value={formData.memberNumber}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Interests"
        name="interests"
        value={formData.interests}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">
        Update Customer
      </Button>
    </Box>
  );
}
