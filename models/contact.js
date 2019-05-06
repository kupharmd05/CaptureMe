const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  workPhone: { type: String },
  title: { type: String }
});

const VCard = mongoose.model("VCard", contactSchema);

module.exports = VCard;