const express = require('express');
const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());


// Logging middleware
app.use((req, res, next) => {
    console.log(`${req.method} request to ${req.url}`);
    next();
});

// Error-handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send(err.message);
});

const userRoutes = require('./Router/users.js');
app.use('/users', userRoutes);




app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
