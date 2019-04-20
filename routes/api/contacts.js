const router = require("express").Router();
const contactsController = require("../../controllers/contacts");


router.route("/")
  .post(contactsController.create);

module.exports = router;
