const User = require('../app/models/user.model')
const faker = require('faker')
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')
// eslint-disable-next-line no-unused-vars
const should = chai.should()
const loginDetails = {
  email: 'admin@logadog.io',
  password: '12345'
}
let token = ''
const createdID = []
let verification = ''
let verificationForgot = ''
const email = faker.internet.email()

chai.use(chaiHttp)

describe('*********** AUTH ***********', () => {
  describe('/POST login', () => {
    it('it should GET token', done => {
      chai
        .request(server)
        .post('/api/auth/login')
        .send(loginDetails)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.an('object')
          res.body.should.have.property('token')
          token = res.body.token
          done()
        })
    })
  })

  describe('/POST register', () => {
    it('it should POST register', done => {
      const user = {
        firstName: faker.random.words(),
        lastName: faker.random.words(),
        email,
        password: '12345',
        c_password: '12345'
      }
      chai
        .request(server)
        .post('/api/auth/register')
        .send(user)
        .end((err, res) => {
          res.should.have.status(201)
          res.body.should.be.an('object')
          res.body.should.include.keys('token', 'user')
          createdID.push(res.body.user._id)
          verification = res.body.user.verification
          done()
        })
    })
    it('it should NOT POST a register if email already exists', done => {
      const user = {
        firstName: faker.random.words(),
        lastName: faker.random.words(),
        email,
        password: '12345',
        c_password: '12345'
      }
      chai
        .request(server)
        .post('/api/auth/register')
        .send(user)
        .end((err, res) => {
          res.should.have.status(422)
          res.body.should.be.a('object')
          res.body.should.have.property('errors')
          done()
        })
    })
  })

  describe('/POST verify', () => {
    it('it should POST verify', done => {
      chai
        .request(server)
        .post('/api/auth/verify')
        .send({
          id: verification
        })
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.an('object')
          res.body.should.include.keys('email', 'verified')
          res.body.verified.should.equal(true)
          done()
        })
    })
  })

  describe('/POST forgot', () => {
    it('it should POST forgot', done => {
      chai
        .request(server)
        .post('/api/auth/forgot')
        .send({
          email
        })
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.an('object')
          res.body.should.include.keys('msg', 'verification')
          verificationForgot = res.body.verification
          done()
        })
    })
  })

  describe('/POST reset', () => {
    it('it should POST reset', done => {
      chai
        .request(server)
        .post('/api/auth/reset')
        .send({
          id: verificationForgot,
          password: '12345',
          c_password: '12345'
        })
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('msg').eql('PASSWORD_CHANGED')
          done()
        })
    })
  })

  describe('/GET token', () => {
    it('it should NOT be able to consume the route since no token was sent', done => {
      chai
        .request(server)
        .get('/api/auth/token')
        .end((err, res) => {
          res.should.have.status(401)
          done()
        })
    })
    it('it should GET a fresh token', done => {
      chai
        .request(server)
        .get('/api/auth/token')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.an('object')
          res.body.should.have.property('token')
          done()
        })
    })
  })

  after(() => {
    createdID.forEach(id => {
      User.findByIdAndRemove(id, err => {
        if (err) {
          console.log(err)
        }
      })
    })
  })
})
