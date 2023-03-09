const createdAt = new Date().toISOString();
const updatedAt = '';

const usertypes = [
  {
    name: 'Normal User',
    description: 'loser',
    active: true,
    createdAt,
    updatedAt
  },
  {
    name: 'Artist',
    description: 'OMG',
    active: true,
    createdAt,
    updatedAt
  }
];

conn = new Mongo();
db = conn.getDB('soundry');
db.createCollection('usertypes');
db.usertypes.insert(usertypes);
