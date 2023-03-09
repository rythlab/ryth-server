import mongoose from 'mongoose'
import validator from 'validator'

const usersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: 'Name is required',
      text: true
    },
    description: {
      type: String,
      text: true
    },
    userType: {
      type: String,
      required: 'userType is required',
      text: true
    },
    contact: {
      type: String,
      text: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
      lowercase: true
    },
    accessToken: {
      type: String,
      text: true
    },
    active: {
      type: Boolean,
      required: 'active is required',
      text: true
    },
    createdAt: {
      type: String,
      required: 'createdAt is required',
      text: true
    },
    updatedAt: {
      type: String,
      required: 'updatedAt is required',
      text: true
    },
    verified: {
      type: Boolean,
      default: true,
      select: false
    },
    account: {
      type: String,
      required: true,
      unique: true,
      text: true,
      lowercase: true
    }
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
)

usersSchema.set('autoIndex', true)

export default mongoose.model('users', usersSchema)
