import Customer from '@/models/Customer';
import connect from '@/lib/db';  // Ensure the database connection is set up correctly

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

export async function POST(request) {
  try {
    await connect();  // Ensure the database connection is established
    const data = await request.json();  // Parse the incoming data from the request body
    const newCustomer = new Customer(data);  // Create a new customer
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
