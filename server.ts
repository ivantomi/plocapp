import express from 'express';
import { PrismaClient } from '@prisma/client';
import apiRoutes from './src/routes/apiRoutes';

const app = express();
const port = process.env.PORT || 3000;

const prisma = new PrismaClient();

// Middleware
app.use(express.json());

// Use routes
app.use('/api', apiRoutes);

// Root route
app.get('/', (req, res) => {
    res.send('RFID Attendance System');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});