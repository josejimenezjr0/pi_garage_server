const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  authId: String,
  profileRAW: String
});

mongoose.model('users', userSchema);
