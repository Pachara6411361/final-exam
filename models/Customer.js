// Remove the import and keep only the require statement
const mongoose = require('mongoose');

// Define the schema
const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  memberNumber: {
    type: Number,
    required: true,
    unique: true
  },
  interests: {
    type: String,
    required: true
  }
});

const Customer = mongoose.models.Customer || mongoose.model('Customer', customerSchema);

module.exports = Customer;
