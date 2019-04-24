const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactSchema = new Schema({
  name: { type: String, required: true },
  username: {type: String, required: true},
  email: { type: String, required: true },
  password: {type: String, require: true},
  
});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;