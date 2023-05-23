const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");
const env = require("./environment");
const { getMaxListeners } = require("process");
const SMTPConnection = require("nodemailer/lib/smtp-connection");

// let transporter = nodemailer.createTransport(env.smtp);

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: "sarvagya.2102@gmail.com",
        pass: "Bhanufeb21@",
    }
});

let renderTemplate = (data, relativePath) => {

    let mailHtml;
    ejs.renderFile(
        path.join(__dirname, "../views/mailer", relativePath),
        data,
        function (error, template) {
            if (error) { console.log("Error in rendering template", error); return; }

            console.log(__dirname);
            mailHtml = template;
        }
    )
    return mailHtml;
}

module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}