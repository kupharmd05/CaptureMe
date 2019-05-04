const vCardJS = require('vcards-js');
const db = require('../models');

module.exports = {
  create: (req, res) => {
    const dataThatIRequested = req.body.data;
    console.log(dataThatIRequested);
    const splitFirstWord = dataThatIRequested[0].split(' ');

    const vCard = vCardJS();

    vCard.firstName = splitFirstWord[0];
    vCard.lastName = splitFirstWord[1];
    vCard.workPhone = dataThatIRequested[1];
    vCard.title = dataThatIRequested[2];
    vCard.email = dataThatIRequested[3];

    const dbVcard = {
      firstName: vCard.firstName,
      lastName: vCard.lastName,
      workPhone: vCard.workPhone,
      title: vCard.title,
      email: vCard.email,
    };

    db.VCard
      .create(dbVcard)
      .then((dbModel) => {
        // set content-type and disposition including desired filename
        res.set('Content-Type', 'text/vcard; name="businesscard.vcf"');
        res.set('Content-Disposition', 'inline; filename="businesscard.vcf"');

        console.log(vCard.getFormattedString());
        // send the response
        res.send(vCard.getFormattedString());
      })
      .catch((err) => {
        console.log(err);
        res.status(422).json(err);
      });
  },
};
