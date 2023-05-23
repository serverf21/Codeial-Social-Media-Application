const nodeMailer = require("../config/nodemailer");

exports.newComment = (comment) => {
    console.log("Inside new comment mailer");
    let htmlString = nodeMailer.renderTemplate({ comment: comment }, "/comments/new_comment.ejs");

    nodeMailer.transporter.sendMail({
        from: 'sarvagyasaxena.2102@gmail.com', // sender address
        to: comment.user.email, // list of receivers
        subject: "New Comment Published, too much fun!", // Subject line
        html: '<h1>Your comment is now published</h1>' // html body
    }, (error, info) => {
        if (error) { console.log("Error in sending mail", error); return; }
        console.log("Message Sent", info);
        return;
    });
}
