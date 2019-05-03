const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String },
  phone: { type: String },
  title: { type: String }
  
  
});

const VCard = mongoose.model("VCard", contactSchema);

module.exports = VCard;