import mongoose from 'mongoose'

const albumsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: 'name is required',
      text: true
    },
    artist: {
      type: String,
      required: 'artist is required',
      text: true
    },
    releaseYear: {
      type: String,
      required: 'releaseYear is required',
      text: true
    },
    genres: {
      type: Array,
      required: 'genres is required',
      text: true
    },
    albumCover: {
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

albumsSchema.set('autoIndex', true)

export default mongoose.model('albums', albumsSchema)
