const model = require("../../models/user");
const { makePassword } = require("../../helpers/password");
const faker = require("../../helpers/faker");
module.exports = new Promise(async (resolve, reject) => {
  let data = [
    {
      name: "Ramadhanu",
      company: "Embreo",
      username: "RZIDInc",
      password: await makePassword("Admin"),
      role: 0
    }
  ];
  // let data = [];
  for (let i = 0; i < 10; i++) {
    data.push(
      {
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        company: faker.company.companyName(),
        username: faker.internet.userName(),
        password: await makePassword("Admin"),
        role: 0
      },
      {
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        company: faker.company.companyName(),
        username: faker.internet.userName(),
        password: await makePassword("Admin"),
        role: 1
      }
    );
  }

  model.insertMany(data, (err, result) => {
    if (err) reject(err);
    resolve(result);
  });
});
