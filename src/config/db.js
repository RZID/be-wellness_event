const mongoose = require("mongoose");
const { db } = require("../helpers/env");

module.exports = {
  connect: () => {
    mongoose.connect(db.connection_string, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    mongoose.set("useNewUrlParser", true);
    mongoose.set("useFindAndModify", false);
    mongoose.set("useCreateIndex", true);
    const connect = mongoose.connection;
    connect.on(
      "error",
      console.error.bind(console, "MongoDB connection error:")
    );
  },
  disconnect: () => {
    mongoose.disconnect();
  }
};
