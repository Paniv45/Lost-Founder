// backend.js
import { MongoClient } from 'mongodb';
import { config } from 'dotenv';
import bcrypt from 'bcrypt'; // Uncommented bcrypt import
import multer, { memoryStorage } from 'multer';

config(); // Load environment variables from .env file

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;
const saltRounds = 10; // Uncommented saltRounds for password hashing

// MongoDB connection
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to the database');
  } catch (error) {
    console.error('Error connecting to the database:', error);
    process.exit(1); // Terminate the process if unable to connect to the database
  }
}

connectToDatabase();

// Multer configuration for handling file uploads
const storage = memoryStorage();
const fileUpload = multer({ storage: storage });


// API endpoint for user signup
async function signup(req, res) {
  try {
    const db = client.db(dbName);
    const collection = db.collection('users');

    const { name, email, password, phone, username } = req.body; // Extract 'username' from req.body

    // Check if the username is already taken
    const existingUser = await collection.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds); // Hashing the password before storing it

    // Insert user data into MongoDB
    const result = await collection.insertOne({
      username,
      email,
      phone,
      password: hashedPassword // Store the hashed password
    });

    console.log('User signed up successfully');
    res.sendStatus(200);
  } catch (error) {
    console.error('Error signing up user:', error);
    res.sendStatus(500);
  }
}

export { signup };
