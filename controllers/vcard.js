/* eslint-disable prefer-destructuring */
const vCardJS = require('vcards-js');

module.exports = {
  create: function(req, res) {
    console.log(req.body);
    const dataThatIRequested = req.body.data;
    const splitFirstWord = dataThatIRequested[0].split(' ');

    const vCard = vCardJS();

    vCard.firstName = splitFirstWord[0];
    vCard.lastName = splitFirstWord[1];
    vCard.email = dataThatIRequested[3];
    vCard.workPhone = dataThatIRequested[1];
    vCard.title = dataThatIRequested[2];
    

    // //save to file
    // vCard.saveToFile('./eric-nesser.vcf');

    // //get as formatted string
    // console.log(vCard.getFormattedString());
    //     },

    // set content-type and disposition including desired filename
    res.set('Content-Type', 'text/vcard; name="businsscard.vcf"');
    res.set('Content-Disposition', 'inline; filename="businesscard.vcf"');

    // send the response
    res.send(vCard.getFormattedString());

    console.log(vCard.getFormattedString());

  },

};
