const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); // Import and use cors
dotenv.config();
const connection = require('./Config/DB');
const userRoutes = require('./Routes/userRoutes');
const { notFound, errorHandler } = require('./middleware/ErrorHandler');

const app = express();
connection();

// Use cors middleware
app.use(cors());

app.use(express.json());
app.use('/api/user', userRoutes);
app.use(notFound);
app.use(errorHandler);

const Port = process.env.PORT || 3000;
app.listen(Port, () => {
  console.log(`Server is running on ${Port}`);
});
