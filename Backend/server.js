const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// In-memory storage to prevent Live Server from refreshing the page
let complaints = [];

app.use(cors());
app.use(express.json());

app.post('/api/complaints', (req, res) => {
    try {
        const { name, city, mobile, complaint, timestamp } = req.body;

        if (!name || !city || !mobile || !complaint) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        const newComplaint = {
            id: Date.now().toString(),
            name,
            city,
            mobile,
            complaint,
            timestamp: timestamp || new Date().toISOString()
        };

        // Store data in memory array instead of modifying a file
        complaints.push(newComplaint);

        res.status(201).json({ message: 'Complaint saved successfully.', data: newComplaint });
    } catch (error) {
        console.error('Error saving complaint:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

app.get('/api/complaints', (req, res) => {
    try {
        res.status(200).json(complaints);
    } catch (error) {
        console.error('Error reading complaints:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
