const router = require("express").Router();
const contactsController = require("../../controllers/contacts");

// Matches with "/api/contacts"
router.route("/")
  .post(contactsController.create);

module.exports = router;
