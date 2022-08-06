const path = require('path');
const crypto = require('crypto');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const multer = require('multer');

const users = require('./routes/api/users');
const posts = require('./routes/api/posts');

const app = express();

const avatarStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images/avatars');
  },
  filename: (req, file, callback) => {
    crypto.randomBytes(20, (err, buffer) => {
      const name = Date.now() + buffer.toString('hex') + '.' + file.originalname.split('.').reverse()[0];
      callback(null, name);
    });
  }
});

const imgStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images/uploads');
  },
  filename: (req, file, callback) => {
    crypto.randomBytes(20, (err, buffer) => {
      const name = Date.now() + buffer.toString('hex') + '.' + file.originalname.split('.').reverse()[0];
      callback(null, name);
    });
  }
});

const imageFilter = (req, file, callback) => {
  const fileTypes = ['image/png', 'image/jpg', 'image/jpeg'];
  if (fileTypes.includes(file.mimetype)) {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/users', multer({ storage: avatarStorage, fileFilter: imageFilter }).single('avatar'));
app.use('/api/posts', multer({ storage: imgStorage, fileFilter: imageFilter }).single('image'));

app.use('/images/avatars', express.static(path.join(__dirname, 'images/avatars')));
app.use('/images/uploads', express.static(path.join(__dirname, 'images/uploads')));

app.use(cors({
  origin: "*",
  methods: ["*"]
}));

// DB Config
const db = require('./config/keys').mongoURI;

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

// Use Routes
app.use('/api/users', users);
app.use('/api/posts', posts);

const port = process.env.PORT || 5000;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => {
    console.log('MongoDB Connected');

    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch(err => console.log({ "DB Error:": err }));

