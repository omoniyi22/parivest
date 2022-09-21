require("dotenv").config();

module.exports = {
  DB,
  NODE_ENV,
  PORT,
  BASE_URL,
  APP_EMAIL,
  APP_PASSWORD,
  APP_SECRET,
  SIB_KEY
} = process.env;

// module.exports = IN_PROD = NODE_ENV === "development"
