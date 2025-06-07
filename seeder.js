require('dotenv').config();
const mongoose = require('mongoose');
const faker = require('faker');
const bcrypt = require('bcrypt');
const User = require('./models/User');
const Event = require('./models/Event');

const seed = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  await User.deleteMany();
  await Event.deleteMany();

  const users = [];
  for (let i = 0; i < 5; i++) {
    users.push(await User.create({
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: await bcrypt.hash('secret123', 10)
    }));
  }

  for (let i = 0; i < 10; i++) {
    await Event.create({
      title: faker.lorem.words(3),
      location: faker.address.city(),
      date: faker.date.future(),
      description: faker.lorem.paragraph(),
      userId: users[Math.floor(Math.random() * users.length)]._id
    });
  }

  console.log('Database seeded!');
  mongoose.disconnect();
};

seed();
