const prompt = require("prompt");
const { readdirSync } = require("fs");
const db = require("../../config/db");
const { exit } = require("process");
db.connect();
prompt.start();
console.log(
  "Which seed would you like to include? (type * to perform all seed)"
);
prompt.get(["seedName"], async (err, result) => {
  try {
    switch (result["seedName"]) {
      case "*":
        for (let file of readdirSync(__dirname)) {
          if (file === "index.js") continue;
          console.log(`Seeding ${file}...`);
          await require(`./${file}`);
          console.log(`Success seeding ${file}`);
        }
        break;
      default:
        if (result["seedName"] === "index" || result["seedName"] === "index.js")
          return console.log("Can't seed index");
        const files = result["seedName"].split(",");
        for (let file of files) {
          console.log(`Seeding ${file}...`);
          await require(`./${file}`);
          console.log(`Success Seed ${file}`);
        }
        break;
    }
  } catch (err) {
    if (err.code === 11000) {
      console.log("Oops, duplicate user!");
    } else if (err.errors.proposed_date) {
      console.log("Oops, proposed date is exceeds the limit of 3 values");
    } else {
      console.log(err);
    }
  }
  db.disconnect() && console.log("Seeding finished!");
  return exit();
});
