const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const booksRoutes = require('./routes/books');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://stavya:stavya@democluster.tdzxrmu.mongodb.net/?retryWrites=true&w=majority&appName=demoCluster', { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/api/books', booksRoutes);

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
