import type { Comic } from '../types/types';

// initialComicsData: ชุดข้อมูลในหน่วยความจำที่ใช้ในแอปตัวอย่าง
// แต่ละ Comic จะมีเมตาดาต้าและอาร์เรย์ `episodes` ซึ่งแต่ละตอนสามารถมี `imageUrl` ได้
// การ import รูปจาก `src/assets/images` ทำให้เราสามารถอ้างถึงไฟล์รูปในข้อมูลได้ตรง ๆ
// (การ import ช่วยให้ bundler จัดการ path และ fingerprinting ให้)
import onepieceClover from '../assets/images/onepieceClover.jpg';
import onepieceEp1 from '../assets/images/onepieceEp1.jpg';
import onepieceEp2 from '../assets/images/onepieceEp2.jpg';
import onepieceEp3 from '../assets/images/onepieceEp3.jpg';

import narutoClover from '../assets/images/narutoClover.jpg';
import narutoEp1 from '../assets/images/narutoEp1.jpg';
import narutoEp2 from '../assets/images/narutoEp2.jpg';

import attackontitanClover from '../assets/images/attackontitanClover.jpg';
import attackontitanEp1 from '../assets/images/attackontitanEp1.jpg';
import attackontitanEp2 from '../assets/images/attackontitanEp2.jpg';

import myheroClover from '../assets/images/myheroclover.jpg';
import myheroEp1 from '../assets/images/My-Hero-AcademiaEP1.jpg';
import myheroEp2 from '../assets/images/myheroEP2.jpg';

import dragonquestClover from '../assets/images/DragonquestClover.jpg';
import dragonquestEp1 from '../assets/images/DragonquestEp1.jpg';
import dragonquestEp2 from '../assets/images/DragonquestEp2.jpg';

import jujutsuClover from '../assets/images/jujutsuClover.jpg';
import jujutsuEp1 from '../assets/images/jujutsuEP1.jpg';
import jujutsuEp2 from '../assets/images/jujutsuEP2.jpg';

import hunterClover from '../assets/images/hunterxhunterClover.jpg';
import hunterEp1 from '../assets/images/hunterxhunterEP1.jpg';
import hunterEp2 from '../assets/images/hunterxhunterEP2.jpg';

import dragonballClover from '../assets/images/DragonballClover.png';
import dragonballEp1 from '../assets/images/DragonballEP1.jpg';
import dragonballEp2 from '../assets/images/DragonballEp2.jpg';

export const initialComicsData: Comic[] = [
  {
    id: '1',
    title: 'OnePiece',
    imageUrl: onepieceClover,
    description: 'การผจญภัยในท้องทะเลของลูฟี่หมวกฟาง!.',
    episodes: [
      {
        number: 1,
        imageUrl: onepieceEp1,
        title: 'ตอนที่ 1: การผจญภัยเริ่มต้น',
        content: 'เนื้อหาตอนที่ 1',
        comments: [
          { id: '101', author: 'otaku_girl', text: 'สนุกมากค่ะ! ลายเส้นสวยมากๆ', date: '10/11/2568, 12:00' },
          { id: '102', author: 'heroFan', text: 'พระเอกเท่สุดๆ ไปเลย!', date: '10/11/2568, 14:30' },
        ],
      },
      {
        number: 2,
        imageUrl: onepieceEp2,
        title: 'ตอนที่ 2: มิตรภาพที่เริ่มต้น',
        content: 'เนื้อหาตอนที่ 2',
        comments: [
           { id: '105', author: 'comicKing', text: 'เรื่องนี้สุดยอด!', date: '10/11/2568, 12:00' },
          { id: '106', author: 'animeQueen', text: 'พระเอกหล่อมาก!', date: '10/11/2568, 14:30' },
        ],
      },
      {
        number: 3,
        imageUrl: onepieceEp3,
        title: 'ตอนที่ 3: การทดสอบครั้งใหญ่',
        content: 'เนื้อหาตอนที่ 3',
        comments: [
          { id: '103', author: 'readerX', text: 'เนื้อเรื่องเข้มข้นขึ้นแล้ว', date: '11/11/2568, 08:00' },
          { id: '105', author: 'comicKing', text: 'เรื่องนี้สุดยอด!', date: '10/11/2568, 12:00' },
          { id: '106', author: 'animeQueen', text: 'พระเอกหล่อมาก!', date: '10/11/2568, 14:30' },
        ],
      },
    ],
  },
  {
    id: '2',
    title: 'Naruto',
    imageUrl: narutoClover,
    description: 'นารูโตะเด็กหนุ่มที่ฝันอยากเป็นโฮคาเงะ.',
    episodes: [
      { 
        number: 1, 
        imageUrl: narutoEp1,
        title: 'ตอนที่ 1: อุซึมากิ นารูโตะ',
        content: 'เนื้อหาตอนที่ 1',
        comments: [
          { id: '201', author: 'sciFiLover', text: 'ชอบแนวคิดเรื่องมิติคู่ขนานมากๆ!', date: '12/11/2568, 10:15' },
          { id: '202', author: 'timeTraveler', text: 'ตอนนี้ทำให้ฉันคิดถึงหนังยุค 80s เลย!', date: '12/11/2568, 11:45' },
        ] 
      },
      { 
        number: 2, 
        imageUrl: narutoEp2,
        title: 'ตอนที่ 2: ฝึกวิชา',
        content: 'เนื้อหาตอนที่ 2',
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
    imageUrl: attackontitanClover,
    description: 'ยักกินคน.',
    episodes: [
      { 
        number: 1, 
        imageUrl: attackontitanEp1,
        title: 'ตอนที่ 1: แด่เธอในอีก1000ปีต่อจากนี้',
        content: 'เนื้อหาตอนที่ 1',
        comments: [
          { id: '301', author: 'catLover', text: 'ไททันน่ากลัวมากๆ เลยค่ะ!', date: '14/11/2568, 13:20' },
          { id: '302', author: 'romanceFan', text: 'ชอบความโหดในเรื่องนี้จัง!', date: '14/11/2568, 14:40' },
        ] 
      },
      {
        number: 2,
        imageUrl: attackontitanEp2,
        title: 'ตอนที่ 2: ไททันจู่โจม',
        content: 'เนื้อหาตอนที่ 2',
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
    imageUrl: myheroClover,
    description: 'เรื่องราวของโลกที่ผู้คนมีพลังพิเศษ และเด็กหนุ่มที่ฝันอยากเป็นฮีโร่แม้ไม่มีพลังใดๆ.',
    episodes: [
      { 
        number: 1, 
        imageUrl: myheroEp1,
        title: 'ตอนที่ 1: เด็กที่ไม่มีพลัง',
        content: 'เนื้อหาตอนที่ 1',
        comments: [
          { id: '401', author: 'heroDreamer', text: 'แรงบันดาลใจมากๆ ครับ!', date: '15/11/2568, 15:00' },
          { id: '402', author: 'quirkFan', text: 'ชอบแนวคิดเรื่องพลังพิเศษในเรื่องนี้!', date: '15/11/2568, 16:30' },
        ] 
      },
      {
        number: 2,
        imageUrl: myheroEp2,
        title: 'ตอนที่ 2: การฝึกฝนเพื่อฮีโร่',
        content: 'เนื้อหาตอนที่ 2',
        comments: [
          { id: '403', author: 'trainingMaster', text: 'ชอบฉากการฝึกฝนมากครับ!', date: '16/11/2568, 08:45' },
          { id: '404', author: 'heroSupporter', text: 'ตัวละครน่ารักทุกคนเลย!', date: '16/11/2568, 10:15' },
        ],
      },
    ],
  },
  {
    id: '5',
    title: 'Dragon Quest Legends',
    imageUrl: dragonquestClover,
    description: 'พระเอกออกผจญภัยทำภารกิจเพื่อพิชิตจอมมาร.',
    episodes: [
      { 
        number: 1, 
        imageUrl: dragonquestEp1,
        title: 'ตอนที่ 1: ผู้กล้าเกิดใหม่',
        content: 'เนื้อหาตอนที่ 1',
        comments: [
          { id: '501', author: 'adventureSeeker', text: 'ชอบการผจญภัยในโลกแฟนตาซีมากๆ!', date: '16/11/2568, 11:00' },
          { id: '502', author: 'questLover', text: 'ภารกิจน่าติดตามสุดๆ ครับ!', date: '16/11/2568, 12:30' },
        ] 
      },
      {
        number: 2,
        imageUrl: dragonquestEp2,
        title: 'ตอนที่ 2: การต่อสู้กับปีศาจ',
        content: 'เนื้อหาตอนที่ 2',
        comments: [
          { id: '503', author: 'monsterHunter', text: 'ฉากต่อสู้ตื่นเต้นมากครับ!', date: '17/11/2568, 09:15' },
          { id: '504', author: 'fantasyFan', text: 'โลกในเรื่องนี้น่าสนใจมาก!', date: '17/11/2568, 10:45' },
        ],
      },
    ],
  },
  {
    id: '6',
    title: 'Jujutsu Kaisen',
    imageUrl: jujutsuClover,
    description: 'โกโจ กลายเป็นคิทแคท!.',
    episodes: [
      { 
        number: 1, 
        imageUrl: jujutsuEp1,
        title: 'ตอนที่ 1: เรียวเมนสุคุนะ',
        content: 'เนื้อหาตอนที่ 1',
        comments: [
          { id: '601', author: 'sorceryFan', text: 'เนื้อเรื่องเข้มข้นมากครับ!', date: '17/11/2568, 14:00' },
          { id: '602', author: 'cursedEnergy', text: 'ชอบการต่อสู้ด้วยพลังคำสาปในเรื่องนี้!', date: '17/11/2568, 15:30' },
        ] 
      },
      {
        number: 2,
        imageUrl: jujutsuEp2,
        title: 'ตอนที่ 2: โรงเรียนสอนวิชาคำสาป',
        content: 'เนื้อหาตอนที่ 2',
        comments: [
          { id: '603', author: 'magicLover', text: 'โลกของคำสาปน่าสนใจมาก!', date: '18/11/2568, 08:30' },
          { id: '604', author: 'jujutsuFan', text: 'ตัวละครมีเสน่ห์ทุกคนเลย!', date: '18/11/2568, 10:00' },
        ],
      },
    ],
  },
  {
    id: '7',
    title: 'Humter X Hunter',
    imageUrl: hunterClover,
    description: 'เด็กหนุ่มที่อยากจะตามหาพ่อที่เป็นอันเตอร์เขาจึงไปสอบฮันเตอร์.',
    episodes: [
      { 
        number: 1, 
        imageUrl: hunterEp1,
        title: 'ตอนที่ 1: กอน ฟรีคส์',
        content: 'เนื้อหาตอนที่ 1',
        comments: [
          { id: '701', author: 'hunterFan', text: 'ชอบการผจญภัยในโลกของฮันเตอร์มากๆ!', date: '18/11/2568, 10:00' },
          { id: '702', author: 'adventureLover', text: 'เนื้อเรื่องน่าติดตามสุดๆ ครับ!', date: '18/11/2568, 11:30' },
        ] 
      },
      {
        number: 2,
        imageUrl: hunterEp2,
        title: 'ตอนที่ 2: การสอบฮันเตอร์',
        content: 'เนื้อหาตอนที่ 2',
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
    imageUrl: dragonballClover,
    description: 'พระเอกออกผจญภัยตามหาดราก้อนบอล.',
    episodes: [
      { 
        number: 1, 
        imageUrl: dragonballEp1,
        title: 'ตอนที่ 1: ลูกแก้วมังกร',
        content: 'เนื้อหาตอนที่ 1',
        comments: [
          { id: '801', author: 'dbzFan', text: 'ชอบการผจญภัยตามหาดราก้อนบอลมากๆ!', date: '19/11/2568, 09:00' },
          { id: '802', author: 'gokuLover', text: 'เนื้อเรื่องน่าติดตามสุดๆ ครับ!', date: '19/11/2568, 10:30' },
        ] 
      },
      {
        number: 2,
        imageUrl: dragonballEp2,
        title: 'ตอนที่ 2: การต่อสู้กับพลังจิต',
        content: 'เนื้อหาตอนที่ 2',
        comments: [
          { id: '803', author: 'powerFighter', text: 'ฉากต่อสู้ตื่นเต้นมากครับ!', date: '20/11/2568, 08:45' },
          { id: '804', author: 'dragonBallFan', text: 'โลกของดราก้อนบอลน่าสนใจมาก!', date: '20/11/2568, 10:15' },
        ],
      },
    ],
  },
];