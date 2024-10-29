const express = require('express');
const taskRoutes = require('./routes/taskRoutes'); // Make sure the path is correct
const app = express();
const cors = require('cors'); 

// Use CORS with specific origin
app.use(cors({
    origin: 'https://todolist-theta-ivory.vercel.app' // Replace with your frontend URL
}));

app.use(express.json()); // Middleware for JSON body parsing

// Use task routes
app.use('/tasks', taskRoutes);

// Start the server
app.listen(process.env.PORT || 5000, () => { // Use process.env.PORT for serverless platforms
    console.log(`Server is running`);
});
