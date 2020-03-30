const faker = require('faker')
const ObjectID = require('mongodb').ObjectID

module.exports = [
  {
    _id: new ObjectID('5aa1c2c35ef7a4e97b5e9951'),
    firstName: 'Troy',
    lastName: 'Warren',
    email: 'troy@logadog.com',
    password: '$2a$05$2KOSBnbb0r.0TmMrvefbluTOB735rF/KRZb4pmda4PdvU9iDvUB26',
    role: 'admin',
    verified: true,
    verification: '3d6e072c-0eaf-4239-bb5e-495e6486148f',
    mailingAddress: '616 E Carson Ave #120, Las Vegas, NV 89101, United States',
    birthday: '1980-10-10',
    phone: '1234578',
    overview: 'I am an administrator.',
    status: 'available',
    image: '/uploads/mock/troy-warren.jpg',
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent()
  },
  {
    _id: new ObjectID('5aa1c2c35ef7a4e97b5e9952'),
    firstName: 'Jessica',
    lastName: 'Bach',
    email: 'jessica@logadog.com',
    password: '$2a$05$2KOSBnbb0r.0TmMrvefbluTOB735rF/KRZb4pmda4PdvU9iDvUB26',
    role: 'manager',
    verified: true,
    verification: '3d6e072c-0eaf-4239-bb5e-495e6486148f',
    mailingAddress: '616 E Carson Ave #120, Las Vegas, NV 89101, United States',
    birthday: '1985-04-18',
    phone: '1234578',
    overview: 'I am a manager.',
    status: 'available',
    image: '/uploads/mock/jessica-bach.jpg',
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent()
  },
  {
    _id: new ObjectID('5aa1c2c35ef7a4e97b5e9953'),
    firstName: 'Simone',
    lastName: 'Forest',
    email: 'simone@logadog.com',
    password: '$2a$05$2KOSBnbb0r.0TmMrvefbluTOB735rF/KRZb4pmda4PdvU9iDvUB26',
    role: 'manager',
    verified: true,
    verification: '3d6e072c-0eaf-4239-bb5e-495e6486148f',
    mailingAddress: '616 E Carson Ave #120, Las Vegas, NV 89101, United States',
    birthday: '1990-06-11',
    phone: '1234578',
    overview: 'I am a manager.',
    status: 'available',
    image: '/uploads/mock/simone-forest.jpg',
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent()
  },
  {
    _id: new ObjectID('5aa1c2c35ef7a4e97b5e9954'),
    firstName: 'Kayumi',
    lastName: 'Hatsune',
    email: 'kayumi@logadog.com',
    password: '$2a$05$2KOSBnbb0r.0TmMrvefbluTOB735rF/KRZb4pmda4PdvU9iDvUB26',
    role: 'customer',
    verified: true,
    verification: '3d6e072c-0eaf-4239-bb5e-495e6486148f',
    mailingAddress: '616 E Carson Ave #120, Las Vegas, NV 89101, United States',
    birthday: '1990-06-11',
    phone: '1234578',
    overview: 'I am a customer.',
    status: 'available',
    image: '/uploads/mock/kayumi-hatsune.jpg',
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent()
  },
  {
    _id: new ObjectID('5aa1c2c35ef7a4e97b5e9955'),
    firstName: 'Pritam',
    lastName: 'Peyman',
    email: 'pritam@logadog.com',
    password: '$2a$05$2KOSBnbb0r.0TmMrvefbluTOB735rF/KRZb4pmda4PdvU9iDvUB26',
    role: 'customer',
    verified: true,
    verification: '3d6e072c-0eaf-4239-bb5e-495e6486148f',
    mailingAddress: '616 E Carson Ave #120, Las Vegas, NV 89101, United States',
    birthday: '1990-06-11',
    phone: '1234578',
    overview: 'I am a customer.',
    status: 'available',
    image: '/uploads/mock/pritam-peyman.jpg',
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent()
  },
  {
    _id: new ObjectID('5aa1c2c35ef7a4e97b5e9956'),
    firstName: 'Sophia',
    lastName: 'Smith',
    email: 'sophia@logadog.com',
    password: '$2a$05$2KOSBnbb0r.0TmMrvefbluTOB735rF/KRZb4pmda4PdvU9iDvUB26',
    role: 'customer',
    verified: true,
    verification: '3d6e072c-0eaf-4239-bb5e-495e6486148f',
    mailingAddress: '616 E Carson Ave #120, Las Vegas, NV 89101, United States',
    birthday: '1990-06-11',
    phone: '1234578',
    overview: 'I am a customer.',
    status: 'available',
    image: '/uploads/mock/sophia-smith.jpg',
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent()
  },
  {
    _id: new ObjectID('5aa1c2c35ef7a4e97b5e9957'),
    firstName: 'Tatiana',
    lastName: 'Bidesh',
    email: 'tatiana@logadog.com',
    password: '$2a$05$2KOSBnbb0r.0TmMrvefbluTOB735rF/KRZb4pmda4PdvU9iDvUB26',
    role: 'customer',
    verified: true,
    verification: '3d6e072c-0eaf-4239-bb5e-495e6486148f',
    mailingAddress: '616 E Carson Ave #120, Las Vegas, NV 89101, United States',
    birthday: '1990-06-11',
    phone: '1234578',
    overview: 'I am a customer.',
    status: 'available',
    image: '/uploads/mock/tatiana-bidesh.jpg',
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent()
  },
  {
    _id: new ObjectID('5aa1c2c35ef7a4e97b5e9958'),
    firstName: 'Tom',
    lastName: 'Doll',
    email: 'tom@logadog.com',
    password: '$2a$05$2KOSBnbb0r.0TmMrvefbluTOB735rF/KRZb4pmda4PdvU9iDvUB26',
    role: 'customer',
    verified: true,
    verification: '3d6e072c-0eaf-4239-bb5e-495e6486148f',
    mailingAddress: '616 E Carson Ave #120, Las Vegas, NV 89101, United States',
    birthday: '1990-06-11',
    phone: '1234578',
    overview: 'I am a customer.',
    status: 'available',
    image: '/uploads/mock/tom-doll.jpg',
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent()
  }
]
