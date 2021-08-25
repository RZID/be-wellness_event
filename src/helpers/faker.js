const { locale } = require("../helpers/env").faker;

module.exports = locale ? require(`faker/locale/${locale}`) : require("faker");
