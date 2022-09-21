const Auth = require("./../middleware/Auth");
const Status = require("./../handler/Status");

const Sib = require("sib-api-v3-sdk");

const { SIB_KEY, BASE_URL, APP_EMAIL } = require("../config");
const client = Sib.ApiClient.instance;

const apiKey = client.authentications["api-key"];
apiKey.apiKey = SIB_KEY;

const Email = {
  async verifySigup(req, res) {
    try {
      const token = Auth.generateToken(req.body);
      const redirectLink = `${BASE_URL}/drivers/verify_email/${token}`;

      const tranEmailApi = new Sib.TransactionalEmailsApi();
      const sender = {
        email: APP_EMAIL,
        name: "Parivest",
      };
      const receivers = [
        {
          email: req.body.email,
        },
      ];

      await tranEmailApi.sendTransacEmail({
        sender,
        to: receivers,
        subject: "Join Us At Parivest",
        textContent: `Please click the link below`,
        htmlContent: `
        <h1>We Are Glad to Have You </h1>
        <p><i> Please click <a href="${redirectLink}"> here</a>  to verify your email </i></p>         `,
      });

      res.status(Status.OK.code).json({
        status: Status.type.SUCCESS,
        message:
          "Please check your inbox or promotion or spam box for verification link",
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
