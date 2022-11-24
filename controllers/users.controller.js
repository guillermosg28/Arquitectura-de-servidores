const createError = require('http-errors');
const User = require('../models/user.model');
const passport = require('passport');
const nodemailer = require("nodemailer");


module.exports.store = (req, res, next) => {

    async function sendEmail(name, email) {
        let testAccount = await nodemailer.createTestAccount();

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: testAccount.user, // generated ethereal user
                pass: testAccount.pass, // generated ethereal password
            },
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"Sistema web 👻" <foo@example.com>', // sender address
            to: email, // list of receivers
            subject: "Activación de cuenta", // Subject line
            html: "Hola <b>" + name + "</b> ingresar a este link para activar su cuenta <br/> <a href=\"http://localhost:8000/api/activate\"><b>CLICK AQUI</b></a>", // html body
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }

    const data = { text } = req.body

    User.create({
        ...data,
    })
        .then(user => res.status(201).json(user))
        .catch(next)

    sendEmail("Guillermo", "guillermosg28@gmail.com").catch(console.error);
}

module.exports.login = (req, res, next) => {
    passport.authenticate('local-auth', (error, email, validations) => {
        console.log(req.login);
        if (error) {
            next(error);
        } else if (!email) {
            next(createError(400, validations))
        } else {
            req.login(email, error => {
                if (error) next(error)
                else res.json(email)
            })
        }
    })(req, res, next);
};

module.exports.activate = (req, res, next) => {
    const id = req.user._id;
    User.updateOne(
        { id }, {
        active: true
    }
    )
        .then(user => res.status(200).json(user))
        .catch(next)

}