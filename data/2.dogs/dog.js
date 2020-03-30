const faker = require('faker')
const ObjectID = require('mongodb').ObjectID

module.exports = [
  {
    _id: new ObjectID('5aa1c2c35ef7a4e97b5e9951'),
    userId: new ObjectID('5aa1c2c35ef7a4e97b5e9951'),
    name: 'Baily',
    breed: 'Milk',
    description: 'I am a dog.',
    status: 'available',
    image: '/uploads/mock/dog-bailey.png',
    birthday: faker.date.past(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent()
  },
  {
    _id: new ObjectID('5aa1c2c35ef7a4e97b5e9952'),
    userId: new ObjectID('5aa1c2c35ef7a4e97b5e9952'),
    name: 'Bear',
    breed: 'Milk',
    description: 'I am a dog.',
    status: 'available',
    image: '/uploads/mock/dog-bear.png',
    birthday: faker.date.past(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent()
  },
  {
    _id: new ObjectID('5aa1c2c35ef7a4e97b5e9953'),
    userId: new ObjectID('5aa1c2c35ef7a4e97b5e9953'),
    name: 'Bella',
    breed: 'Milk',
    description: 'I am a dog.',
    status: 'available',
    image: '/uploads/mock/dog-bella.png',
    birthday: faker.date.past(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent()
  },
  {
    _id: new ObjectID('5aa1c2c35ef7a4e97b5e9954'),
    userId: new ObjectID('5aa1c2c35ef7a4e97b5e9954'),
    name: 'Charlie',
    breed: 'Milk',
    description: 'I am a dog.',
    status: 'available',
    image: '/uploads/mock/dog-charlie.png',
    birthday: faker.date.past(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent()
  },
  {
    _id: new ObjectID('5aa1c2c35ef7a4e97b5e9955'),
    userId: new ObjectID('5aa1c2c35ef7a4e97b5e9955'),
    name: 'Daisy',
    breed: 'Milk',
    description: 'I am a dog.',
    status: 'available',
    image: '/uploads/mock/dog-daisy.png',
    birthday: faker.date.past(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent()
  },
  {
    _id: new ObjectID('5aa1c2c35ef7a4e97b5e9956'),
    userId: new ObjectID('5aa1c2c35ef7a4e97b5e9956'),
    name: 'Ereo',
    breed: 'Milk',
    description: 'I am a dog.',
    status: 'available',
    image: '/uploads/mock/dog-ereo.png',
    birthday: faker.date.past(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent()
  },
  {
    _id: new ObjectID('5aa1c2c35ef7a4e97b5e9957'),
    userId: new ObjectID('5aa1c2c35ef7a4e97b5e9957'),
    name: 'Harper',
    breed: 'Milk',
    description: 'I am a dog.',
    status: 'available',
    image: '/uploads/mock/dog-harper.png',
    birthday: faker.date.past(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent()
  },
  {
    _id: new ObjectID('5aa1c2c35ef7a4e97b5e9958'),
    userId: new ObjectID('5aa1c2c35ef7a4e97b5e9958'),
    name: 'Lola',
    breed: 'Milk',
    description: 'I am a dog.',
    status: 'available',
    image: '/uploads/mock/dog-lola.png',
    birthday: faker.date.past(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent()
  },
  {
    _id: new ObjectID('5aa1c2c35ef7a4e97b5e9959'),
    userId: new ObjectID('5aa1c2c35ef7a4e97b5e9958'),
    name: 'Luna',
    breed: 'Milk',
    description: 'I am a dog.',
    status: 'available',
    image: '/uploads/mock/dog-luna.png',
    birthday: faker.date.past(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent()
  },
  {
    _id: new ObjectID('5aa1c2c35ef7a4e97b5e9960'),
    userId: new ObjectID('5aa1c2c35ef7a4e97b5e9958'),
    name: 'Milo',
    breed: 'Milk',
    description: 'I am a dog.',
    status: 'available',
    image: '/uploads/mock/dog-nala.png',
    birthday: faker.date.past(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent()
  },
  {
    _id: new ObjectID('5aa1c2c35ef7a4e97b5e9961'),
    userId: new ObjectID('5aa1c2c35ef7a4e97b5e9958'),
    name: 'Roxy',
    breed: 'Milk',
    description: 'I am a dog.',
    status: 'available',
    image: '/uploads/mock/dog-roxy.png',
    birthday: faker.date.past(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent()
  }
]
