const vCardJS = require('vcards-js');
const db = require("../models");

module.exports = {
    create: function(req, res) {
    let vCard = vCardJS();

    vCard.firstName = 'eric';
    vCard.lastName = 'Nesser';
    vCard.workPhone = '312-555-1212';
    vCard.email = 'e.nesser@emailhost.tld';
    vCard.title = 'Software Developer';

    // //save to file
    // vCard.saveToFile('./eric-nesser.vcf');
    
    // //get as formatted string
    // console.log(vCard.getFormattedString());
    //     },
    db.VCard
    .create(req.body)
    .then(dbModel => {
 //set content-type and disposition including desired filename
     res.set('Content-Type', 'text/vcard; name="enesser.vcf"');
     res.set('Content-Disposition', 'inline; filename="enesser.vcf"');

 //send the response
    res.send(vCard.getFormattedString());
    })
    .catch(err => res.status(422).json(err));

   
    
}

};
