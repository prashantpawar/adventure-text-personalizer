(function() {
    var MailParser = require("mailparser").MailParser,
        mailparser = new MailParser(),
        fs = require("fs"),
        mailFile = "data/mail.mbox"
    mailparser.on("end", function(mail_object){
        console.log("From:", mail_object.from); //[{address:'sender@example.com',name:'Sender Name'}]
        console.log("Subject:", mail_object.subject); // Hello world!
        console.log("Text body:", mail_object.text); // How are you today?
    });
    mailparser._isMbox = true;
    var readStream= fs.createReadStream(mailFile);
    readStream.on('open', function () {
        // This just pipes the read stream to the response object (which goes to the client)
        readStream.pipe(mailparser);
    });
})();