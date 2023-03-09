const createdAt = new Date().toISOString();
const updatedAt = '';

const albums = [
  {
    name: 'Gabriel',
    artist: db.users.findOne({ name: 'Keshi' })._id,
    releaseYear: '2022',
    genres: [
      db.genres.findOne({ name: 'Pop' })._id,
      db.genres.findOne({ name: 'Top 40' })._id,
      db.genres.findOne({ name: 'New Wave' })._id
    ],
    albumCover: '',
    active: true,
    createdAt,
    updatedAt
  },
  {
    name: 'Always',
    artist: db.users.findOne({ name: 'Keshi' })._id,
    releaseYear: '2020',
    genres: [
      db.genres.findOne({ name: 'Pop' })._id,
      db.genres.findOne({ name: 'New Wave' })._id
    ],
    albumCover: '',
    active: true,
    createdAt,
    updatedAt
  },
  {
    name: 'Absolutely',
    artist: db.users.findOne({ name: 'Dijon' })._id,
    releaseYear: '2021',
    genres: [
      db.genres.findOne({ name: 'Pop' })._id,
      db.genres.findOne({ name: 'New Wave' })._id,
      db.genres.findOne({ name: 'R&B' })._id
    ],
    albumCover: '',
    active: true,
    createdAt,
    updatedAt
  },
  {
    name: 'Rodeo Clown',
    artist: db.users.findOne({ name: 'Dijon' })._id,
    releaseYear: '2021',
    albumCover: '',
    active: true,
    createdAt,
    updatedAt
  },
  {
    name: 'Dawn FM (OPN Remix)',
    artist: db.users.findOne({ name: 'The Weeknd' })._id,
    releaseYear: '2022',
    genres: [
      db.genres.findOne({ name: 'Techno' })._id,
      db.genres.findOne({ name: 'Dance' })._id
    ],
    albumCover: '',
    active: true,
    createdAt,
    updatedAt
  },
  {
    name: 'King Of The Fall',
    artist: db.users.findOne({ name: 'The Weeknd' })._id,
    releaseYear: '2020',
    genres: [
      db.genres.findOne({ name: 'Pop' })._id,
      db.genres.findOne({ name: 'Top 40' })._id
    ],
    albumCover: '',
    active: true,
    createdAt,
    updatedAt
  }
];

conn = new Mongo();
db = conn.getDB('soundry');
db.createCollection(albums);
db.albums.insert(albums);
