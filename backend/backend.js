import { MongoClient } from 'mongodb';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { config } from 'dotenv';

config(); // Load environment variables from .env file

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

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
const storage = multer.memoryStorage();
const fileUpload = multer({ storage: storage }).single('photo');

// API endpoint for submitting appeals
async function submitAppeal(req, res) {
  try {
    fileUpload(req, res, async (err) => {
      if (err) {
        console.error('Error uploading file:', err);
        return res.status(400).send('Error uploading file');
      }

      const db = client.db(dbName);
      const collection = db.collection('mycollection');

      const { name, age, phone, email } = req.body;
      const photo = req.file ? req.file.buffer : null;

      // Insert appeal data into MongoDB
      const result = await collection.insertOne({
        personId: uuidv4(),
        name,
        age,
        phone,
        email,
        photo
      });

      console.log('Appeal submitted successfully');
      return res.sendStatus(200);
    });
  } catch (error) {
    console.error('Error submitting appeal:', error);
    return res.sendStatus(500);
  }
}

// API endpoint for fetching all appeals
async function getAllAppeals(req, res) {
  try {
    const db = client.db(dbName);
    const collection = db.collection('mycollection');

    // Fetch all appeals from MongoDB
    const appeals = await collection.find().toArray();

    res.json(appeals);
  } catch (error) {
    console.error('Error fetching appeals:', error);
    res.sendStatus(500);
  }
}

export { fileUpload as upload, submitAppeal, getAllAppeals };
