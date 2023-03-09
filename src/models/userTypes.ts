import mongoose from 'mongoose'

const userTypesSchema = new mongoose.Schema(
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
    active: {
      type: Boolean,
      required: 'active is required',
      text: true
    },
    createdAt: {
      type: String,
      required: 'CreatedAt is required',
      text: true
    },
    updatedAt: {
      type: String,
      required: 'UpdatedAt is required',
      text: true
    }
  },
  { timestamps: true }
)

userTypesSchema.set('autoIndex', true)

export default mongoose.model('usertypes', userTypesSchema)
