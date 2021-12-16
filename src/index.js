const express = require('express');
const cors = require('cors');

const path = require('path');

const { PORT } = require('./DBconfig');

const app = express();

app.use(express.json());
app.use(express.static(path.resolve('public', 'uploads')));
app.use(cors());

app.get('/', (req, res) => {
    res.send({ msg: 'Server is running' });
});

const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);

const listingRoutes = require('./routes/listingRoutes');
app.use('/listings', listingRoutes);

app.all('*', (req, res) => {
    res.status(404).send({ error: 'Page not found' });
});
  
app.listen(serverPort, () => {
    console.log(`Running on port: ${PORT}`)
})
  