import { MongoClient } from 'mongodb';
import { config } from 'dotenv';
import nodemailer from 'nodemailer';

config(); // Load environment variables

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;
const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: emailUser,
    pass: emailPass
  },
  tls: {
    rejectUnauthorized: false
  }
});

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to the database');
  } catch (error) {
    console.error('Error connecting to the database:', error);
    process.exit(1);
  }
}

connectToDatabase();

export async function Found(req, res) {
  try {
    console.log('Received request:', req.body); // Log received data (optional)

    const { personId, email, seenWhere, date, time, name } = req.body;


    console.log(personId, email, seenWhere, date, time);

    // Improved validation (consider adding more checks as needed)
    if (!personId || !email || !seenWhere || !date || !time) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const db = client.db(dbName);
    const collection = db.collection('Foundit');
    const result = await collection.insertOne({ personId, email, seenWhere, date, time,name});

    console.log('Appeal submitted successfully');

    // Sending email notification
    const mailOptions = {
      from: emailUser,
      to: email,
      subject: 'Lost once spotted!!!',
      html: `
        <p>Your Lost one ${name} has been spotted:</p>
        <p>Details:</p>
        <ul>
          
          <li>Seen Where: ${seenWhere}</li>
          <li>Date: ${date}</li>
          <li>Time: ${time}</li>
        </ul>
      `
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send email' });
      } else {
        console.log('Email sent:', info.response);
        res.status(200).json({ message: 'Appeal submitted successfully' });
      }
    });
  } catch (error) {
    console.error('Error submitting appeal:', error);
    res.status(500).json({ error: 'Failed to submit appeal' });
  }
}
