const router = require("express").Router();
const contactsController = require("../../controllers/contacts");

// Matches with "/api/contacts"
router.route("/")
  .post(contactsController.create);


router.route("/vcard").post()

module.exports = router;
