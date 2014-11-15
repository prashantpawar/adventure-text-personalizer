(function() {
    var MailParser = require("mailparser").MailParser,
        Mbox = require('node-mbox'),
        mbox, mailparser,
        fs = require("fs"),
        mailFile = "data/mail.mbox";
        
    var readStream = fs.createReadStream(mailFile);
    mbox = new Mbox(readStream);
    
    mbox.on('message', function(msg) {
        mailparser = new MailParser(),
        console.log("got the message");
        mailparser.on('end', function(mail_object){
            console.log("From:", mail_object.from); 
            console.log("Subject:", mail_object.subject); 
            // console.log("Text body:", mail_object.text); // How are you today?
        });
        mailparser.write(msg);
        mailparser.end();
    });
    
    mbox.on('end', function() {
        console.log('done reading mbox file');
        // mailparser.end();
    });
    
})();