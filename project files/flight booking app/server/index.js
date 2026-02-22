
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"));

const User = mongoose.model('User', new mongoose.Schema({
  email: String,
  password: String
}));

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (user) return res.json({ message: "Login successful" });
  res.status(401).json({ message: "Invalid credentials" });
});

app.listen(5000, () => console.log("Server started on port 5000"));
