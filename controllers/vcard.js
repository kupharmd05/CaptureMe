const vCardJS = require('vcards-js');
const db = require('../models');

module.exports = {
  create: (req, res) => {
    const dataThatIRequested = req.body.data;
    const splitFirstWord = dataThatIRequested[0].split(' ');

    const vCard = vCardJS();

    vCard.firstName = splitFirstWord[0];
    vCard.lastName = splitFirstWord[1];
    vCard.workPhone = dataThatIRequested[1];
    vCard.title = dataThatIRequested[2];
    vCard.email = dataThatIRequested[3];

    //set content-type and disposition including desired filename
    res.set('Content-Type', 'text/vcard; name="enesser.vcf"');
    res.set('Content-Disposition', 'inline; filename="enesser.vcf"');

    //send the response
    res.send(vCard.getFormattedString());
  },
};
