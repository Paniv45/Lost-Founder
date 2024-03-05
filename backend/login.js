import { MongoClient } from 'mongodb';
import { config } from 'dotenv';
import bcrypt from 'bcrypt'; // Import bcrypt for password hashing

config(); // Load environment variables from .env file

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;
const saltRounds = 10; // Number of salt rounds for password hashing

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

// API endpoint for user login
async function login(req, res) {
    try {
      const { username, password } = req.body;
      const db = client.db(dbName);
      const collection = db.collection('users');
  
      // Find the user with the provided username
      const user = await collection.findOne({ username });
  
      if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
  
      // Compare the provided password with the hashed password stored in the database
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
  
      // If username and password match, return success
      res.status(200).json({ message: 'Login successful', username: user.username });
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  
  export { login };
