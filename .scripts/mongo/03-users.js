const createdAt = new Date().toISOString();
const updatedAt = '';

const users = [
  {
    name: 'Keshi',
    description: 'Just Keshi thing <3',
    userType: db.usertypes.findOne({ name: 'Artist' })._id,
    contact: '',
    email: '',
    accessToken: '',
    active: true,
    createdAt,
    updatedAt
  },
  {
    name: 'Dijon',
    description: ':)',
    userType: db.usertypes.findOne({ name: 'Artist' })._id,
    contact: '',
    email: '',
    accessToken: '',
    active: true,
    createdAt,
    updatedAt
  },
  {
    name: 'The Weeknd',
    description:
      'The Weeknd took over pop music & culture on his own terms filtering R&B, Pop,& hip-hop through an ambitious widescreen lens. The multi-platinum 3X GRAMMY Award winner has emerged as one of the most successful & significant artists of the modern era. 2012’s 3X platinum  collated 3 breakout mixtapes—House of Balloons, Thursday & Echoes of Silence—into his 1st chart-topping collection followed by his debut LP  in 2013. Two years later, “Earned It (Fifty Shades of Grey)” won “Best R&B Performance” & received an Academy Award nod for “Best Original Song” & 4X Platinum  won a GRAMMY for “Best Urban Contemporary Album.” In 2018,  won the same award, making him the 1st artist ever to win twice. His 6-track project My Dear Melancholy marked his 3rd consecutive #1 bow on the Billboard Top 200, & “Pray For Me” with Kendrick Lamar was featured in the trailer for the Academy Award winning Marvel film Black Panther. In 2020 the 80’s-nostalgic track  became a worldwide sensation, igniting viral dance challenges across social media, peaking at #1 in 30+ countries & headlining Mercedes Benz EQC campaign.  held the #1 spot on Billboard 200 for 4 consecutive weeks, marking his 4th #1 album & becoming the first to ever rank #1 on the Billboard 200, Hot 100, and Artist 100 simultaneously.  is the #1 R&B streaming album of all time (followed by  at #2).',
    userType: db.usertypes.findOne({ name: 'Artist' })._id,
    contact: '',
    email: '',
    accessToken: '',
    active: true,
    createdAt,
    updatedAt
  },
  {
    name: 'Rex Chou',
    description: 'boss',
    userType: db.usertypes.findOne({ name: 'Normal User' })._id,
    contact: '',
    email: '',
    accessToken: '',
    active: true,
    createdAt,
    updatedAt
  }
];

conn = new Mongo();
db = conn.getDB('soundry');
db.createCollection('users');
db.users.insert(users);
