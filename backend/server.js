import express from 'express';
import { json, urlencoded } from 'express';
import { config } from 'dotenv';
import { upload, submitAppeal, getAllAppeals } from './backend.js'; // Ensure the correct file extension
import { signup } from './signup.js';
import { login } from './login.js';  // Ensure the correct file extension
import cors from 'cors'; // Import cors middleware
 
config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 3000; // Use the PORT environment variable if available

app.use(cors()); // Enable CORS

app.use(json());
app.use(urlencoded({ extended: true }));

// API endpoint for submitting appeals
app.post('/submit-appeal', upload.single('photo'), submitAppeal);

// API endpoint for fetching all appeals
app.get('/get-all-appeals', getAllAppeals);

// API endpoint for user signup
app.post('/signup', signup);

// API endpoint for user login
app.post('/login', login);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
