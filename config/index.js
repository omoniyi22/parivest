require("dotenv").config();

module.exports = {
  DB,
  NODE_ENV,
  PORT,
  BASE_URL,
  SENDGRID_API_KEY,
  APP_SECRET,
  SENDGRID_EMAIL
} = process.env;

// module.exports = IN_PROD = NODE_ENV === "development"
