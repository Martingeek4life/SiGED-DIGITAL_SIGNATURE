var mongoose = require('mongoose');

var SignedDocument = mongoose.Schema({
  doc_id: { type: String, required: true },
  author: { type: String, required: true },
  reason: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  dest: { type: String, required: true },
  public_key: { type: String, required: true },
  private_key: { type: String, required: true },
  signature: { type: String, required: true },
  stamp: { type: String, required: true },
  signed_doc: { type: Array, required: true }
});
module.exports = mongoose.model('SignedDocument', SignedDocument);