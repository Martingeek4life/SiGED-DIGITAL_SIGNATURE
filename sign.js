async function Sign(Doc, Payload, res) {
    const degrees = require('pdf-lib').degrees;
    const PDFDocument = require('pdf-lib').PDFDocument;
    const rgb = require('pdf-lib').rgb;
    const StandardFonts = require('pdf-lib').StandardFonts;
    const crypto = require('crypto');
    const fs = require('fs');
    var SignedDocument_Model = require('./Endpoint_models/SignedDocument');
    var private_key = fs.readFileSync('keys/privateKey.pem', 'utf-8');
    var public_key = fs.readFileSync('keys/publicKey.pem', 'utf-8');
    // File to be signed
    const doc = fs.readFileSync(Doc.path);
    // Signing
    while(! (private_key = fs.readFileSync('keys/privateKey.pem', 'utf-8')) && (public_key = fs.readFileSync('keys/publicKey.pem', 'utf-8'))) {
        var private_key = fs.readFileSync('keys/privateKey.pem', 'utf-8');
        var public_key = fs.readFileSync('keys/publicKey.pem', 'utf-8');
    }
    let signer = crypto.createSign('RSA-SHA256');
    signer.write(doc);
    signer.end();
    let signature = signer.sign(private_key, 'base64');
    let stamp = new Date();
    console.log('Digital Signature: ', signature);
    fs.writeFileSync('signatures/signature.txt', signature);
    const existingPdfBytes = doc;

    // Load a PDFDocument from the existing PDF bytes
    const pdfDoc = await PDFDocument.load(existingPdfBytes)

    // Embed the Helvetica font
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)

    // Get the first page of the document
    const pages = pdfDoc.getPages()
    const firstPage = pages[0]

    // Get the width and height of the first page
    const { width, height } = firstPage.getSize()

    // Draw a string of text diagonally across the first page
    firstPage.drawText('Signed by ' + Payload.author + ' at ' + stamp, {
        x: 45,
        y: height / 2 + 380,
        size: 12,
        font: helveticaFont,
        color: rgb(0.95, 0.1, 0.1),
        rotate: degrees(0),
    })


    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save()
    let writeStream = fs.createWriteStream('./uploads/signed.pdf');
    writeStream.write(pdfBytes, 'base64');
    writeStream.on('finish', () => {  
    console.log('saved');
    });
    writeStream.end(); 

    const signature_info = {
        doc_id: Payload.doc_id,
        author: Payload.author,
        reason: Payload.reason,
        description: Payload.description,
        location: Payload.location,
        dest: Payload.dest,
        public_key: public_key,
        private_key: private_key,
        signature: signature,
        stamp: stamp,
        signed_doc: pdfBytes,
        filename: Doc.originalname
    };
    // console.log(signature_info);
    let SignedDocument = new SignedDocument_Model(signature_info);
    SignedDocument.save(function (err, doc) {
        console.log("signed document saved");
        res.json(signature_info);
      });
}
module.exports = { Sign };