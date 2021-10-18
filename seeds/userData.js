const { User } = require('../models')

const userData = [
    {
        username: "testusername",
        password: "testpassword"
    },
];

const seedUsers = () => User.bulkCreate(userData, { individualHooks: true });

module.exports = seedUsers;