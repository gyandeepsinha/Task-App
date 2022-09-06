const sgMail            =   require('@sendgrid/mail');
const sendgridAPIKey    =   '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';

sgMail.setApiKey(sendgridAPIKey)

// Send Welcome Email To User
const sendWelcomeEmail    = (email, name) => {
    sgMail.send({
        to      : email,
        from    : 'sarkariyatra@gmail.com',
        subject : 'SendGrid Email Testing',
        text    : `Hello ${name} Hope you are doing well! How you rate our regsitration process?`
    });
}
// Send Prior Email Before Deleting Account 
const sendDeleteEmail   =   (email, name) =>{
    sgMail.send({
        to      :   email,
        from    :   'sarkariyatra@gmail.com',
        subject :   'Sorry to see you go!',
        text    :   `Hello ${name}, It looks very bad to see you going!`
    })
}
module.exports  =   { sendWelcomeEmail, sendDeleteEmail }