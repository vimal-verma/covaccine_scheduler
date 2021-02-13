const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true
  },
  age: {
    type: Date,
    required: false
  },
  gender: {
    type: String,
    required: false
  },
  password: {
    type: String,
    required: true
  },
  profession: {
    type: Number,
    required: true
  },
  covidbefore: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  aadhar: {
    type: Number,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  lungproblems:{
    type: String,
  },
  heartdisease:{
    type: String,
  },
  diabetes:{
    type: String,
  },
  obesity:{
    type: String,
  },
  cancer:{
    type: String,
  },
  hivaids:{
    type: String,
  },
  chronickidneyorliverdisease:{
    type: String,
  },
}, { timestamps: true });

const user = mongoose.model('user', userSchema);
module.exports = user;