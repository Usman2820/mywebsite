const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/mywebsiteDB')
  .then(() => console.log("✅ MongoDB connected successfully!"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit();
  });

const userSchema = new mongoose.Schema({ name: String });
const User = mongoose.model('User', userSchema);

app.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.render('home', { users });
  } catch (err) {
    console.error("❌ Error fetching users:", err);
    res.send("Error loading page");
  }
});

app.post('/add', async (req, res) => {
  try {
    const newUser = new User({ name: req.body.username });
    await newUser.save();
    console.log("✅ User saved:", req.body.username);
    res.redirect('/');
  } catch (err) {
    console.error("❌ Error saving user:", err);
    res.send("Error saving user");
  }
});

app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});






