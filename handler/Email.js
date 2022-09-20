const Auth = require("./../middleware/Auth");
const Status = require("./../handler/Status");
const sgMail = require("@sendgrid/mail");

const { BASE_URL, SENDGRID_API_KEY, SENDGRID_EMAIL } = require("../config");

const Email = {
  async verifySigup(req, res) {
    try {
      const token = Auth.generateToken(req.body);

      const redirectLink = `${BASE_URL}/drivers/verify_email/${token}`;

      sgMail.setApiKey(SENDGRID_API_KEY);
      const msg = {
        to: req.body.email,
        from: SENDGRID_EMAIL,
        subject: "Join Us At Parivest",
        text: `Please click the link below`,

        html: `
        <p><i> Please click <a href="${redirectLink}"> here</a>  to verify your email </i></p>
        `,
      };

      let response = await sgMail.send(msg);

      res.status(Status.OK.code).json({
        status: Status.type.SUCCESS,
        message: "Please check your email or spam box for verification link",
      });
    } catch (error) {
      res.status(Status.SERVER_ERROR.code).send({
        status: Status.type.FAILURE,
        reason: Status.SERVER_ERROR.message,
      });
    }
  },
};
module.exports = Email;
