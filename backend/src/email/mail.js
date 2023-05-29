const sgMail = require("@sendgrid/mail");
const mailTemplate = require("./template");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  const message = {
    to: email,
    from: "erickce40@gmail.com",
    subject: `Welcome to the app, ${name}!`,
    html: mailTemplate(name),
  };
  sgMail.send(message);
};
const sendResetPasswordEmail = (email, name) => {
  const message = {
    to: email,
    from: "erickce40@gmail.com",
    subject: `Welcome to the app, ${name}!`,
    html: mailTemplate(name),
  };
  sgMail.send(message);
};

const sendGoodbyeEmail = (email, name) => {
  const message = {
    to: email,
    from: "erickce40@gmail.com",
    subject: `We are sorry you decided to left our app, ${name}`,
  };
  sgMail
    .send(message)
    .then(() => {})
    .catch(() => {});
};

module.exports = {
  sendWelcomeEmail,
  sendGoodbyeEmail,
  sendResetPasswordEmail,
};