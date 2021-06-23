async function verify(doc, payload, res) {
    const crypto = require('crypto');
    const fs = require('fs');
    var SignedDocument_Model = require('./Endpoint_models/SignedDocument');
    console.log(payload);
    SignedDocument_Model.find({ doc_id: payload.doc_id }).exec(function (err, model) {
      console.log(model);
      const public_key = model[0].public_key;
      const original_signature = model[0].signature;
      const incoming_doc = fs.readFileSync('./'+doc);
      // Verify
      const verifier = crypto.createVerify('RSA-SHA256');
      verifier.write(incoming_doc);
      verifier.end();
      const is_verified = verifier.verify(public_key, original_signature, 'base64');
      console.log(is_verified);
      if(is_verified) {
        const doc_info_verified = {
          author: model[0].author,
          dest: model[0].dest,
          stamp: model[0].stamp,
          reason: model[0].reason,
          description: model[0].description,
          location: model[0].location,
          verified: is_verified
        };
        res.json(doc_info_verified);
      } else {
        res.json({ is_verified: is_verified });
      }
    });
}
module.exports = { verify };