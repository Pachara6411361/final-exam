import Customer from '@/models/Customer';
import connect from '@/lib/db';  // Ensure the correct database connection

// Handle GET requests (fetch customers)
export async function GET(request) {
  try {
    await connect();  // Ensure the database connection is established
    const customers = await Customer.find();
    return new Response(JSON.stringify(customers), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ message: 'Error fetching customers' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// Handle POST requests (add a new customer)
export async function POST(request) {
  try {
    await connect();  // Ensure the database connection is established
    const data = await request.json();  // Parse incoming JSON data
    const newCustomer = new Customer(data);  // Create a new customer document
    await newCustomer.save();  // Save the customer to the database
    return new Response(JSON.stringify(newCustomer), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ message: 'Error adding customer' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
