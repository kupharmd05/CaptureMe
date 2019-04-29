const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  login: { type: String, required: true },
  
  
});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;