const { readdirSync } = require("fs");

module.exports = (app) => {
  // Perform dynamic routing
  readdirSync(__dirname).map((file) => {
    // Parent route
    if (file === "index.js") return;
    // Get each name of route
    const name = file.substr(0, file.indexOf("."));
    // Requiring each of route
    require("./" + name)(app);
  });
};
