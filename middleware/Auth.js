const jwt = require("jsonwebtoken");
const Status = require("../handler/Status");
const { APP_SECRET } = require("./../config");

const Auth = {
  async verifyToken(req, res, next) {
    try {
      let token = req.params.token_id;
      if (!token)
        res.status(Status.BAD_REQUEST.code).json({
          status: Status.type.FAILURE,
          reason: "Invalid verification token",
        });
      else
        jwt.verify(token, APP_SECRET, async (err, data) => {
          if (err) {
            res.status(Status.SERVER_ERROR.code).json({
              status: Status.type.FAILURE,
              reason: "Unable to decode token",
            });
          } else {
            req.user = await data.data;
            next();
          }
        });
    } catch (error) {
      console.log({ error });
      res.status(Status.SERVER_ERROR.code).send({
        status: Status.type.FAILURE,
        reason: Status.SERVER_ERROR.message,
      });
    }
  },

  generateToken(data) {
    return jwt.sign({ data }, APP_SECRET, { expiresIn: "24h" });
  },
};

module.exports = Auth;
