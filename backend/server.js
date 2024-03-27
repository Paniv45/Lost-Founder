import express from 'express';
import { json, urlencoded } from 'express';
import cors from 'cors'; // Import cors middleware
import { config } from 'dotenv';
import { submitAppeal, getAllAppeals } from './backend.js';
import { signup } from './signup.js';
import { login } from './login.js';
import { Found } from './Foundit.js'; // Import Found function

config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 3000; // Use the PORT environment variable if available

app.use(cors()); // Enable CORS
app.use(json());
app.use(urlencoded({ extended: true }));

// API endpoint for submitting appeals
app.post('/submit-appeal', submitAppeal);

// API endpoint for fetching all appeals
app.get('/get-all-appeals', getAllAppeals);

// API endpoint for user signup
app.post('/signup', signup);

// API endpoint for user logins
app.post('/login', login);

// API endpoint for found
app.post('/Found', Found);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
