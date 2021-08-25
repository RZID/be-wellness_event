const model = require("../../models/event");
const User = require("../../models/user");
const faker = require("../../helpers/faker");

const randomUser = (role) =>
  new Promise((resolve, reject) => {
    User.countDocuments({ role }, (err, count) => {
      if (err) reject(err);
      // Get a random entry
      const random = Math.floor(Math.random() * count);
      User.findOne({ role })
        .skip(random)
        .exec((err, result) => {
          if (err) reject(err);
          resolve(result._id);
        });
    });
  });

module.exports = new Promise(async (resolve, reject) => {
  let data = [
    {
      name: "Example event name",
      company: faker.company.companyName(),
      proposed_date: [
        "8/23/2021, 1:00:00 PM",
        "8/24/2021, 1:00:00 PM",
        "8/25/2021, 1:00:00 PM"
      ],
      proposed_location: `${faker.address.streetName()}, ${faker.address.zipCode()}`,
      vendor: await randomUser(1),
      hr: await randomUser(0),
      date_created: new Date(),
      status: "Pending"
    }
  ];
  model.insertMany(data, (err, result) => {
    if (err) reject(err);
    resolve(result);
  });
});
