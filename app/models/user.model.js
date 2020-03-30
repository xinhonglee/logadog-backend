const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')
const validator = require('validator')
const mongoosePaginate = require('mongoose-paginate-v2')
const aggregatePaginate = require('mongoose-aggregate-paginate-v2')

const {
  roles,
  genders,
  userStates,
} = require('../../config/constants')

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String
    },
    lastName: {
      type: String
    },
    middleName: {
      type: String
    },
    email: {
      type: String,
      validate: {
        validator: validator.isEmail,
        message: 'EMAIL_IS_NOT_VALID'
      },
      lowercase: true,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: false,
      select: false
    },
    role: {
      type: String,
      enum: roles,
      default: roles[0]
    },
    verification: {
      type: String
    },
    verificationExpires: {
      type: Date,
      default: Date.now,
      select: false
    },
    verified: {
      type: Boolean,
      default: false
    },
    overview: {
      type: String,
      min: 1,
      max: 10000
    },
    phone: {
      type: String
    },
    mailingAddress: {
      type: String
    },
    birthday: {
      type: String
    },
    status: {
      type: String,
      enum: userStates,
      default: userStates[0],
      required: true
    },
    image: {
      type: String
    },
    bankNumber: {
      type: String
    },
    gender: {
      type: String,
      enum: genders,
      default: genders[0]
    },
    identificationImage: {
      type: String
    },
    loginAttempts: {
      type: Number,
      default: 0,
      select: false
    },
    blockExpires: {
      type: Date,
      default: Date.now,
      select: false
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)

const hash = (user, salt, next) => {
  bcrypt.hash(user.password, salt, null, (error, newHash) => {
    if (error) {
      return next(error)
    }
    user.password = newHash
    return next()
  })
}

const genSalt = (user, SALT_FACTOR, next) => {
  bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
    if (err) {
      return next(err)
    }
    return hash(user, salt, next)
  })
}

UserSchema.pre('save', function(next) {
  const that = this
  const SALT_FACTOR = 5
  if (!that.isModified('password')) {
    return next()
  }
  return genSalt(that, SALT_FACTOR, next)
})

UserSchema.methods.comparePassword = function(passwordAttempt, cb) {
  bcrypt.compare(passwordAttempt, this.password, (err, isMatch) =>
    err ? cb(err) : cb(null, isMatch)
  )
}

UserSchema.plugin(mongoosePaginate)
UserSchema.plugin(aggregatePaginate)

module.exports = mongoose.model('User', UserSchema)
