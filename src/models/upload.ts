import mongoose from 'mongoose'

const uploadSchema = new mongoose.Schema(
  {
    multihash: [
      {
        path: String,
        hash: String,
        size: Number
      }
    ],
    sourceFile: {
      type: String,
      required: 'sourceFile is required',
      text: true
    },
    storagePath: {
      type: String,
      required: 'storagePath is required',
      text: true
    },
    type: {
      type: String,
      required: 'type is required',
      text: true
    }
  },
  { timestamps: true }
)

uploadSchema.set('autoIndex', true)

export default mongoose.model('upload', uploadSchema)

// {
//   multihash: [
//     {
//       path: 'segment005.ts',
//       hash: 'QmP6P6Bw8mBwYokFtXJaFsngwSA3kCY2RNjAqXLzC5img6',
//       size: 951
//     }
//   ],
//   sourceFile: '8eea8da9-9422-4e9a-bf76-040c70efd778.mp3',
//   storagePath: 'file_storage/files/img/QmP6P6Bw8mBwYokFtXJaFsngwSA3kCY2RNjAqXLzC5img6',
//   type: 'track'
// }
