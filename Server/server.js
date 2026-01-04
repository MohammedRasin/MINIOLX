const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./models/index');
const routes = require('./routes/index');
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', routes);
app.get('/', (req, res) => {
  return res.status(200).json({ message: 'api is running' });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
