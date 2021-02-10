const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const formSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
}, { timestamps: true });

const Form = mongoose.model('Blog', formSchema);
module.exports = Form;