const router = require("express").Router();
const vCardController = require("../../controllers/vcard");


// Matches with "/api/vcard"
router.route('/')
  .post(vCardController.create);




module.exports = router;
