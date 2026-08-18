import { Song } from '@/types/music';

const saajan = 'https://c.saavncdn.com/blob/461/Saajan-Hindi-1991-20220616044407-500x500.jpg';
const aashiqui = 'https://c.saavncdn.com/088/Aashiqui-Hindi-1989-20241225141825-500x500.jpg';
const mohra = 'https://c.saavncdn.com/041/Mohra-Hindi-1994-20210226141759-500x500.jpg';
const mainKhiladi =
  'https://c.saavncdn.com/474/Main-Khiladi-Tu-Anari-Original-Motion-Picture-Soundtrack-Hindi-1994-20250912131553-500x500.jpg';
const dilHaiKe =
  'https://c.saavncdn.com/880/Dil-Hai-Ke-Manta-Nahin-Hindi-1991-20241225141511-500x500.jpg';
const deewana = 'https://c.saavncdn.com/793/Deewana-Hindi-1992-20221215163751-500x500.jpg';
const dil1990 = 'https://c.saavncdn.com/blob/531/Dil-Hindi-1990-20221101132525-500x500.jpg';
const tereNaam = 'https://c.saavncdn.com/473/Tere-Naam-Hindi-2003-20221206102003-500x500.jpg';
const mainePyarKiya =
  'https://c.saavncdn.com/524/Maine-Pyar-Kiya-Hindi-1989-20190531154731-500x500.jpg';
const dilToPagalHai =
  'https://c.saavncdn.com/410/Dil-To-Pagal-Hai-Hindi-1997-20190329145756-500x500.jpg';
const duplicate = 'https://c.saavncdn.com/681/Duplicate-Hindi-1998-20200905113947-500x500.jpg';
const khamoshi =
  'https://c.saavncdn.com/128/Khamoshi-The-Musical-Hindi-2008-20241007175121-500x500.jpg';
const qayamat =
  'https://c.saavncdn.com/073/Qayamat-Original-Motion-Picture-Soundtrack-Hindi-2003-20250815044606-500x500.jpg';
const heartTouching =
  'https://c.saavncdn.com/700/Heart-Touching-Love-Songs-Hindi-2021-20260401031231-500x500.jpg';

export const barbershopSongs: Song[] = [
  {
    id: 'barber-1',
    title: 'Bahut Pyar Karte Hain',
    artist: 'Anuradha Paudwal',
    album: 'Saajan',
    coverUrl: saajan,
    audioUrl: 'https://aac.saavncdn.com/461/c5ed61a158568f4f302d2342233b56ef_160.mp4',
    duration: 265,
  },
  {
    id: 'barber-2',
    title: 'Dekha Hai Pehli Baar',
    artist: 'Alka Yagnik, S.P. Balasubrahmanyam',
    album: 'Saajan',
    coverUrl: saajan,
    audioUrl: 'https://aac.saavncdn.com/461/9473c2f5a21cef15e5501a7621e6d97b_160.mp4',
    duration: 372,
  },
  {
    id: 'barber-3',
    title: 'Too Shayar Hai Main Teri Shayari',
    artist: 'Alka Yagnik',
    album: 'Saajan',
    coverUrl: saajan,
    audioUrl: 'https://aac.saavncdn.com/461/5a9eb747bf0ab97a3828512d3191af7b_160.mp4',
    duration: 389,
  },
  {
    id: 'barber-4',
    title: 'Mera Dil Bhi Kitna Pagal Hai',
    artist: 'Kumar Sanu, Alka Yagnik',
    album: 'Saajan',
    coverUrl: saajan,
    audioUrl: 'https://aac.saavncdn.com/412/d7908513646cb957e43d5b60b3a992c2_160.mp4',
    duration: 324,
  },
  {
    id: 'barber-5',
    title: 'Dil Ka Aalam',
    artist: 'Kumar Sanu',
    album: 'Aashiqui',
    coverUrl: aashiqui,
    audioUrl: 'https://aac.saavncdn.com/088/d9b099578099c5c9d0ebe144adeef911_160.mp4',
    duration: 298,
  },
  {
    id: 'barber-6',
    title: 'Tu Meri Zindagi Hai',
    artist: 'Kumar Sanu, Anuradha Paudwal',
    album: 'Aashiqui',
    coverUrl: aashiqui,
    audioUrl: 'https://aac.saavncdn.com/088/9d450a9e3238660634cd29c145263d54_160.mp4',
    duration: 273,
  },
  {
    id: 'barber-7',
    title: 'Nazar Ke Samne',
    artist: 'Kumar Sanu, Anuradha Paudwal',
    album: 'Aashiqui',
    coverUrl: aashiqui,
    audioUrl: 'https://aac.saavncdn.com/088/772e592f069417448dc9fc5a4edbadd3_160.mp4',
    duration: 330,
  },
  {
    id: 'barber-8',
    title: 'Na Kajre Ki Dhar',
    artist: 'Pankaj Udhas, Sadhana Sargam',
    album: 'Mohra',
    coverUrl: mohra,
    audioUrl: 'https://aac.saavncdn.com/041/aff018e0629c1e62537a0e69ec8cb32c_160.mp4',
    duration: 324,
  },
  {
    id: 'barber-9',
    title: 'Paas Woh Aane Lage',
    artist: 'Kumar Sanu, Alka Yagnik',
    album: 'Main Khiladi Tu Anari',
    coverUrl: mainKhiladi,
    audioUrl: 'https://aac.saavncdn.com/474/76092b730d71b6b8ded5e5debdbcae99_160.mp4',
    duration: 372,
  },
  {
    id: 'barber-10',
    title: 'Tu Pyar Hai Kisi Aur Ka',
    artist: 'Kumar Sanu, Anuradha Paudwal',
    album: 'Dil Hai Ke Manta Nahin',
    coverUrl: dilHaiKe,
    audioUrl: 'https://aac.saavncdn.com/880/524820605c9ae89eea351a21e51587d2_160.mp4',
    duration: 408,
  },
  {
    id: 'barber-11',
    title: 'Tere Dard Se Dil',
    artist: 'Kumar Sanu',
    album: 'Deewana',
    coverUrl: deewana,
    audioUrl: 'https://aac.saavncdn.com/793/af129a3a2ba324626bca66725e3daf0b_160.mp4',
    duration: 291,
  },
  {
    id: 'barber-12',
    title: 'Sochenge Tumhe Pyar',
    artist: 'Kumar Sanu',
    album: 'Deewana',
    coverUrl: deewana,
    audioUrl: 'https://aac.saavncdn.com/700/6522a084e2320d4b75ba1f9d7fffce8a_160.mp4',
    duration: 362,
  },
  {
    id: 'barber-13',
    title: 'Mujhe Neend Na Aaye',
    artist: 'Udit Narayan, Anuradha Paudwal',
    album: 'Dil',
    coverUrl: dil1990,
    audioUrl: 'https://aac.saavncdn.com/531/bd5ceccae9988389d34b3d667e468c26_160.mp4',
    duration: 373,
  },
  {
    id: 'barber-14',
    title: 'Dil Deewana',
    artist: 'S.P. Balasubrahmanyam',
    album: 'Maine Pyar Kiya',
    coverUrl: mainePyarKiya,
    audioUrl: 'https://aac.saavncdn.com/524/3137ef7eab7d3d4ff1f7f1b8f05f7cae_sar_160.mp4',
    duration: 301,
  },
  {
    id: 'barber-15',
    title: 'Tumse Milna',
    artist: 'Udit Narayan, Alka Yagnik',
    album: 'Tere Naam',
    coverUrl: tereNaam,
    audioUrl: 'https://aac.saavncdn.com/473/1ecc77a78ff13341a94c63681ff916fe_160.mp4',
    duration: 281,
  },
  {
    id: 'barber-16',
    title: 'Tujhko Na Dekhun To',
    artist: 'Udit Narayan, Sunidhi Chauhan',
    album: 'Jaanwar',
    coverUrl:
      'https://c.saavncdn.com/080/Dard-E-Dil-Vol-5-Tujhko-Na-Dekhun-To-With-Shayari-Hindi-2000-20260405072516-500x500.jpg',
    audioUrl: 'https://aac.saavncdn.com/080/8cc29d830828c46f16ddedfc1b685b9f_160.mp4',
    duration: 295,
  },
  {
    id: 'barber-17',
    title: 'Koi Ladki Hai',
    artist: 'Udit Narayan, Lata Mangeshkar',
    album: 'Dil To Pagal Hai',
    coverUrl: dilToPagalHai,
    audioUrl: 'https://aac.saavncdn.com/410/1f9dea34f4c23b4baf67193554688230_160.mp4',
    duration: 330,
  },
  {
    id: 'barber-18',
    title: 'Mere Mehboob Mere Sanam',
    artist: 'Udit Narayan, Alka Yagnik',
    album: 'Duplicate',
    coverUrl: duplicate,
    audioUrl: 'https://aac.saavncdn.com/681/13f55ed04f7b3c4b38a1090df00d3058_sar_160.mp4',
    duration: 419,
  },
  {
    id: 'barber-19',
    title: 'Aaj Main Upar',
    artist: 'Kumar Sanu, Kavita Krishnamurthy',
    album: 'Khamoshi: The Musical',
    coverUrl: khamoshi,
    audioUrl: 'https://aac.saavncdn.com/128/d65b73b4789f886e4660b3ef62563b3a_160.mp4',
    duration: 331,
  },
  {
    id: 'barber-20',
    title: 'Jeeta Tha Jiske Liye',
    artist: 'Kumar Sanu, Alka Yagnik',
    album: 'Dilwale',
    coverUrl: heartTouching,
    audioUrl: 'https://aac.saavncdn.com/700/fc7aac02d8bcda4930d585c10e467690_160.mp4',
    duration: 458,
  },
  {
    id: 'barber-21',
    title: 'Tere Dard Se Dil (Jhankar)',
    artist: 'Kumar Sanu',
    album: '90s Bollywood Sad Songs',
    coverUrl:
      'https://c.saavncdn.com/330/90-s-Bollywood-Sad-Songs-With-Jhankar-Beats-Hindi-2017-20230608011501-500x500.jpg',
    audioUrl: 'https://aac.saavncdn.com/330/60bee8155b9311bfbd260644ee860628_160.mp4',
    duration: 282,
  },
  {
    id: 'barber-22',
    title: 'Chehra Kya Dekhte Ho',
    artist: 'Kumar Sanu, Asha Bhosle',
    album: 'Yalgaar',
    coverUrl:
      'https://c.saavncdn.com/688/Melody-Queen-Lata-Mangeshkar-and-Asha-Bhosle-Hindi-2021-20260401031234-500x500.jpg',
    audioUrl: 'https://aac.saavncdn.com/688/18861d692ef40cae89f2d03b2efb93ca_160.mp4',
    duration: 358,
  },
  {
    id: 'barber-23',
    title: 'Achha Sila Diya Toone',
    artist: 'Sonu Nigam',
    album: 'Achha Sila Diya',
    coverUrl: 'https://c.saavncdn.com/429/Achha-Sila-Diya-Hits-Of-Attaullah-Khan-2006-500x500.jpg',
    audioUrl: 'https://aac.saavncdn.com/429/2d2dfd784156822b6f10d161818306c2_160.mp4',
    duration: 335,
  },
  {
    id: 'barber-24',
    title: 'Aitbaar Nahi Karna',
    artist: 'Abhijeet, Sadhana Sargam',
    album: 'Qayamat',
    coverUrl: qayamat,
    audioUrl: 'https://aac.saavncdn.com/073/b6ab4a8cbf4d4096439aa4bd9762fa70_160.mp4',
    duration: 277,
  },
  {
    id: 'barber-25',
    title: 'Chura Ke Dil Mera',
    artist: 'Kumar Sanu, Alka Yagnik',
    album: 'Main Khiladi Tu Anari',
    coverUrl: mainKhiladi,
    audioUrl: 'https://aac.saavncdn.com/274/7fef90c6c49981cb50403835234722da_160.mp4',
    duration: 474,
  },
  {
    id: 'barber-26',
    title: 'Tip Tip Barsa Paani',
    artist: 'Alka Yagnik, Udit Narayan',
    album: 'Mohra',
    coverUrl: mohra,
    audioUrl: 'https://aac.saavncdn.com/041/c9c7533375a46d285bc156a2212fdbb5_160.mp4',
    duration: 363,
  },
  {
    id: 'barber-27',
    title: 'Ae Mere Humsafar',
    artist: 'Vinod Rathod, Alka Yagnik',
    album: 'Baazigar',
    coverUrl: 'https://c.saavncdn.com/409/Baazigar-Hindi-1993-20210226141521-500x500.jpg',
    audioUrl: 'https://aac.saavncdn.com/409/62dfb5f2e424f885a4b069d4db1e4ccc_160.mp4',
    duration: 450,
  },
];
