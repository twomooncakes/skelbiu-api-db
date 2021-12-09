const express = require('express');
const cors = require('cors');

const { serverPort } = require('./DBconfig');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send({ msg: 'Server is running' });
});
  
app.all('*', (req, res) => {
    res.status(404).send({ error: 'Page not found' });
});
  
app.listen(serverPort, () => {
    console.log(`Running on port: ${serverPort}`)
})
  