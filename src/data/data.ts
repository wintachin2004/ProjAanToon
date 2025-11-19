import type { Comic } from '../types/types';

// initialComicsData: ชุดข้อมูลในหน่วยความจำที่ใช้ในแอปตัวอย่าง
// แต่ละ Comic จะมีเมตาดาต้าและอาร์เรย์ `episodes` ซึ่งแต่ละตอนสามารถมี `imageUrl` ได้
// การ import รูปจาก `src/assets/images` ทำให้เราสามารถอ้างถึงไฟล์รูปในข้อมูลได้ตรง ๆ
// (การ import ช่วยให้ bundler จัดการ path และ fingerprinting ให้)
import { loadImagesFromFolder, getImage } from '../utils/imageLoader';

import '../App.css'

// นำเข้ารูปภาพทั้งหมดจาก images from src/assets/images/ )
const images = loadImagesFromFolder();
const img = (name: string) => getImage(name, images);

export const initialComicsData: Comic[] = [
  {
    id: '1',
    title: 'OnePiece',
    imageUrl: img('onepieceClover'),
    description: 'การผจญภัยในท้องทะเลของลูฟี่หมวกฟาง!.',
    episodes: [
      {
        number: 1,
        imageUrl: img('onepieceEp1'),
        title: 'ตอนที่ 1: การผจญภัยเริ่มต้น',
        content: 'เนื้อหาตอนที่ 1',
        imageUrls: [img('onepiece1_1'), img('onepiece1_2'), img('onepiece1_3')],
        comments: [
          { id: '101', author: 'otaku_girl', text: 'สนุกมากค่ะ! ลายเส้นสวยมากๆ', date: '10/11/2568, 12:00' },
          { id: '102', author: 'heroFan', text: 'พระเอกเท่สุดๆ ไปเลย!', date: '10/11/2568, 14:30' },
        ],
      },
      {
        number: 2,
        imageUrl: img('onepieceEp2'),
        title: 'ตอนที่ 2: มิตรภาพที่เริ่มต้น',
        content: 'เนื้อหาตอนที่ 2',
        imageUrls: [img('onepiece2_1'), img('onepiece2_2'), img('onepiece2_3')],
        comments: [
           { id: '105', author: 'comicKing', text: 'เรื่องนี้สุดยอด!', date: '10/11/2568, 12:00' },
          { id: '106', author: 'animeQueen', text: 'พระเอกหล่อมาก!', date: '10/11/2568, 14:30' },
        ],
      },
      
    ],
  },
  {
    id: '2',
    title: 'Naruto',
    imageUrl: img('narutoClover'),
    description: 'นารูโตะเด็กหนุ่มที่ฝันอยากเป็นโฮคาเงะ.',
    episodes: [
      { 
        number: 1, 
        imageUrl: img('narutoEp1'),
        title: 'ตอนที่ 1: อุซึมากิ นารูโตะ',
        content: 'เนื้อหาตอนที่ 1',
        imageUrls: [img('narutoEp1_1'), img('narutoEp1_2'), img('narutoEp1_3')],
        comments: [
          { id: '201', author: 'sciFiLover', text: 'ชอบแนวคิดเรื่องมิติคู่ขนานมากๆ!', date: '12/11/2568, 10:15' },
          { id: '202', author: 'timeTraveler', text: 'ตอนนี้ทำให้ฉันคิดถึงหนังยุค 80s เลย!', date: '12/11/2568, 11:45' },
        ] 
      },
      { 
        number: 2, 
        imageUrl: img('narutoEp2'),
        title: 'ตอนที่ 2: ฝึกวิชา',
        content: 'เนื้อหาตอนที่ 2',
        imageUrls: [img('narutoEp2_1'), img('narutoEp2_2'), img('narutoEp2_3')],
        comments: [
          { id: '203', author: 'futureSeeker', text: 'เนื้อเรื่องน่าติดตามมากครับ!', date: '13/11/2568, 09:30' },
          { id: '204', author: 'quantumFan', text: 'ชอบการอธิบายทฤษฎีพลังในเรื่องนี้!', date: '13/11/2568, 10:50' },
        ] 
      },
    ],
  },
  {
    id: '3',
    title: 'Atack on Titan',
    imageUrl: img('attackontitanClover'),
    description: 'ยักกินคน.',
    episodes: [
      { 
        number: 1, 
        imageUrl: img('attackontitanEp1'),
        title: 'ตอนที่ 1: แด่เธอในอีก1000ปีต่อจากนี้',
        content: 'เนื้อหาตอนที่ 1',
        imageUrls: [img('axtEp1_1'), img('axtEp1_2'), img('axtEp1_3')],
        comments: [
          { id: '301', author: 'catLover', text: 'ไททันน่ากลัวมากๆ เลยค่ะ!', date: '14/11/2568, 13:20' },
          { id: '302', author: 'romanceFan', text: 'ชอบความโหดในเรื่องนี้จัง!', date: '14/11/2568, 14:40' },
        ] 
      },
      {
        number: 2,
        imageUrl: img('attackontitanEp2'),
        title: 'ตอนที่ 2: ไททันจู่โจม',
        content: 'เนื้อหาตอนที่ 2',
        imageUrls: [img('axtEp2_1'), img('axtEp2_2'), img('axtEp2_3')],
        comments: [
          { id: '303', author: 'mysterySeeker', text: 'ชอบการไขปริศนาในเรื่องนี้มาก!', date: '15/11/2568, 09:15' },
          { id: '304', author: 'dailyLifeFan', text: 'มิคาสะน่ารักดีค่ะ!', date: '15/11/2568, 10:45' },
        ],
      },
    ],
  },
  {
    id: '4',
    title: 'MyHero Academia',
    imageUrl: img('myheroclover'),
    description: 'เรื่องราวของโลกที่ผู้คนมีพลังพิเศษ และเด็กหนุ่มที่ฝันอยากเป็นฮีโร่แม้ไม่มีพลังใดๆ.',
    episodes: [
      { 
        number: 1, 
        imageUrl: img('My-Hero-AcademiaEP1'),
        title: 'ตอนที่ 1: เด็กที่ไม่มีพลัง',
        content: 'เนื้อหาตอนที่ 1',
        imageUrls: [img('myhero1_1'), img('myhero1_2'), img('myhero1_3')],
        comments: [
          { id: '401', author: 'heroDreamer', text: 'แรงบันดาลใจมากๆ ครับ!', date: '15/11/2568, 15:00' },
          { id: '402', author: 'quirkFan', text: 'ชอบแนวคิดเรื่องพลังพิเศษในเรื่องนี้!', date: '15/11/2568, 16:30' },
        ] 
      },
      {
        number: 2,
        imageUrl: img('myheroEP2'),
        title: 'ตอนที่ 2: การฝึกฝนเพื่อฮีโร่',
        content: 'เนื้อหาตอนที่ 2',
        imageUrls: [img('myhero2_1'), img('myhero2_2'), img('myhero2_3')],
        comments: [
          { id: '403', author: 'trainingMaster', text: 'ชอบฉากการฝึกฝนมากครับ!', date: '16/11/2568, 08:45' },
          { id: '404', author: 'heroSupporter', text: 'ตัวละครน่ารักทุกคนเลย!', date: '16/11/2568, 10:15' },
        ],
      },
    ],
  },
  {
    id: '5',
    title: 'The Fragrant Flower',
    imageUrl: img('thefg'),
    description: '  ความรัก.',
    episodes: [
      { 
        number: 1, 
        imageUrl: img('thefgClover'),
        title: 'ตอนที่ 1: love',
        content: 'เนื้อหาตอนที่ 1',
        imageUrls: [img('fgep1_1'), img('fg1_2'), img('fg1_3')],
        comments: [
          { id: '501', author: 'adventureSeeker', text: 'เนื้อเรื่องสนุกมากๆ!', date: '16/11/2568, 11:00' },
          { id: '502', author: 'questLover', text: 'คู่นี้หวานมาก!', date: '16/11/2568, 12:30' },
        ] 
      },
      {
        number: 2,
        imageUrl: img('thefgclover2'),
        title: 'ตอนที่ 2: boby',
        content: 'เนื้อหาตอนที่ 2',
        imageUrls: [img('fgep2_1'), img('fg2_2'), img('fg2_3')],
        comments: [
          { id: '503', author: 'monsterHunter', text: 'นางเอกฉวยมากก!', date: '17/11/2568, 09:15' },
          { id: '504', author: 'fantasyFan', text: 'พระเอกหล่อเท่!', date: '17/11/2568, 10:45' },
        ],
      },
    ],
  },
  {
    id: '6',
    title: 'Jujutsu Kaisen',
    imageUrl: img('jujutsuClover'),
    description: 'โกโจ กลายเป็นคิทแคท!.',
    episodes: [
      { 
        number: 1, 
        imageUrl: img('jujutsuEP1'),
        title: 'ตอนที่ 1: เรียวเมนสุคุนะ',
        content: 'เนื้อหาตอนที่ 1',
        imageUrls: [img('jujutsuEp1_1'), img('jujutsuEp1_2'), img('jujutsuEp1_3')],
        comments: [
          { id: '601', author: 'sorceryFan', text: 'เนื้อเรื่องเข้มข้นมากครับ!', date: '17/11/2568, 14:00' },
          { id: '602', author: 'cursedEnergy', text: 'ชอบการต่อสู้ด้วยพลังคำสาปในเรื่องนี้!', date: '17/11/2568, 15:30' },
        ] 
      },
      {
        number: 2,
        imageUrl: img('jujutsuEP2'),
        title: 'ตอนที่ 2: โรงเรียนสอนวิชาคำสาป',
        content: 'เนื้อหาตอนที่ 2',
        imageUrls: [img('jujutsuEp1_1'), img('jujutsuEp1_2'), img('jujutsuEp1_3')],
        comments: [
          { id: '603', author: 'magicLover', text: 'โลกของคำสาปน่าสนใจมาก!', date: '18/11/2568, 08:30' },
          { id: '604', author: 'jujutsuFan', text: 'ตัวละครมีเสน่ห์ทุกคนเลย!', date: '18/11/2568, 10:00' },
        ],
      },
    ],
  },
  {
    id: '7',
    title: 'Hunter X Hunter',
    imageUrl: img('hunterxhunterClover'),
    description: 'เด็กหนุ่มที่อยากจะตามหาพ่อที่เป็นอันเตอร์เขาจึงไปสอบฮันเตอร์.',
    episodes: [
      { 
        number: 1, 
        imageUrl: img('hunterxhunterEP1'),
        title: 'ตอนที่ 1: กอน ฟรีคส์',
        content: 'เนื้อหาตอนที่ 1',
        imageUrls: [img('hunterxhunterep1_1'), img('hunterxhunterEp1_2'), img('hunterxhunter1_3')],
        comments: [
          { id: '701', author: 'hunterFan', text: 'ชอบการผจญภัยในโลกของฮันเตอร์มากๆ!', date: '18/11/2568, 10:00' },
          { id: '702', author: 'adventureLover', text: 'เนื้อเรื่องน่าติดตามสุดๆ ครับ!', date: '18/11/2568, 11:30' },
        ] 
      },
      {
        number: 2,
        imageUrl: img('hxhclover'),
        title: 'ตอนที่ 2: การสอบฮันเตอร์',
        content: 'เนื้อหาตอนที่ 2',
        imageUrls: [img('hxhEp2_1'), img('hxhEp2_2'), img('hxhEp2_3')],
        comments: [
          { id: '703', author: 'examSeeker', text: 'ฉากการสอบตื่นเต้นมากครับ!', date: '19/11/2568, 09:30' },
          { id: '704', author: 'hunterWorldFan', text: 'โลกของฮันเตอร์น่าสนใจมาก!', date: '19/11/2568, 11:00' },
        ],
      },
    ],
  },
  {
    id: '8',
    title: 'Dragon Ball',
    imageUrl: img('DragonballClover'),
    description: 'พระเอกออกผจญภัยตามหาดราก้อนบอล.',
    episodes: [
      { 
        number: 1, 
        imageUrl: img('DragonballEP1'),
        title: 'ตอนที่ 1: ลูกแก้วมังกร',
        content: 'เนื้อหาตอนที่ 1',
        imageUrls: [img('db1_1'), img('db1_2'), img('db1_3')],
        comments: [
          { id: '801', author: 'dbzFan', text: 'ชอบการผจญภัยตามหาดราก้อนบอลมากๆ!', date: '19/11/2568, 09:00' },
          { id: '802', author: 'gokuLover', text: 'เนื้อเรื่องน่าติดตามสุดๆ ครับ!', date: '19/11/2568, 10:30' },
        ] 
      },
      {
        number: 2,
        imageUrl: img('DragonballEp2'),
        title: 'ตอนที่ 2: การต่อสู้กับพลังจิต',
        content: 'เนื้อหาตอนที่ 2',
        imageUrls: [img('db2_1'), img('db2_2'), img('db2_3')],
        comments: [
          { id: '803', author: 'powerFighter', text: 'ฉากต่อสู้ตื่นเต้นมากครับ!', date: '20/11/2568, 08:45' },
          { id: '804', author: 'dragonBallFan', text: 'โลกของดราก้อนบอลน่าสนใจมาก!', date: '20/11/2568, 10:15' },
        ],
      },
    ],
  },
];