const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['user', 'teacher', 'admin'],
    default: 'user',
  },
  classId: { type: String, default: null }, // Student's class
  classIds: { type: [String], default: [] } // Teacher's assigned classes
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;