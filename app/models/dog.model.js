const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const aggregatePaginate = require('mongoose-aggregate-paginate-v2')
const { dogStates } = require('../../config/constants')

const DogSchema = new mongoose.Schema(
  {
    name: {
      type: String
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    status: {
      type: String,
      enum: dogStates,
      default: dogStates[0]
    },
    breed: {
      type: String
    },
    description: {
      type: String,
      min: 1,
      max: 10000
    },
    image: {
      type: String
    },
    birthday: {
      type: Date
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)

DogSchema.plugin(mongoosePaginate)
DogSchema.plugin(aggregatePaginate)

module.exports = mongoose.model('Dog', DogSchema)
