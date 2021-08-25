require("dotenv").config();

module.exports = {
  app: {
    name: process.env.APP_NAME || "API Embreo Health",
    port: process.env.APP_PORT || 3000,
    hash_salt: Number(process.env.APP_SALT_ROUNDS) || 8
  },
  db: {
    connection_string:
      process.env.DB_CONNECTION_STRING || "http://localhost:27017/embreo_health"
  },
  faker: {
    locale: process.env.FAKER_LOCALE || "en_US"
  },
  jwt: {
    secret: process.env.JWT_SECRET || "Embreo-Technical-Ramadhanu"
  }
};
