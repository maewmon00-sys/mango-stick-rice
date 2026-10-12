/* =====================================================================
   ไฟล์ข้อมูลเนื้อหาของเว็บไซต์ — แก้ข้อความและรูปที่นี่ที่เดียว
   - แก้ได้เฉพาะข้อความที่อยู่ในเครื่องหมายคำพูด '...'
   - ถ้าข้อความมีเครื่องหมาย ' ให้เขียนเป็น \' หรือใช้ “ ” แทน
   - ห้ามลบเครื่องหมาย , ท้ายบรรทัดและวงเล็บปีกกา { }
   - รูปภาพ: วางไฟล์ในโฟลเดอร์ images แล้วให้ชื่อตรงกับ file:
     ถ้าไม่พบไฟล์ จะลองใช้ลิงก์ online: แทน และถ้าไม่ได้อีกจะแสดงภาพอีโมจิ
   ===================================================================== */

const SITE = {
  navTitle: '🥭 ข้าวเหนียวมะม่วง',
  tag: 'ขนมไทย · วัฒนธรรมอาหาร',
  titleMain: 'Mango Sticky Rice',
  titleSub: 'ข้าวเหนียวมะม่วง',
  intro: 'ร่วมเรียนรู้เรื่องราว ส่วนผสม และวิธีทำขนมไทยที่รู้จักกันทั่วโลก ด้วยรสหวาน มัน เค็มกลมกล่อม ของข้าวเหนียวมูน มะม่วงสุก และกะทิ',
  startButton: 'เริ่มเรียนรู้',
  footer: 'ข้าวเหนียวมะม่วง เสน่ห์ขนมไทยที่ควรค่าแก่การเรียนรู้',
  footerNote: 'เว็บไซต์นี้จัดทำเพื่อการศึกษาและเผยแพร่วัฒนธรรมอาหารไทย',

  heroImage: {
    file: 'images/hero.jpg',
    online: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Mango_sticky_rice.jpg/800px-Mango_sticky_rice.jpg',
    alt: 'ข้าวเหนียวมะม่วงจัดจานพร้อมมะม่วงสุกหั่นชิ้นและราดกะทิ',
    emoji: '🥭', bg: '#fdf0cf'
  }
};

const HISTORY = {
  image: {
    file: 'images/history.jpg',
    online: 'https://commons.wikimedia.org/wiki/Special:FilePath/Mango_sticky_rice.jpg?width=900',
    alt: 'ข้าวเหนียวมูนกับมะม่วงสุก ขนมไทยตามฤดูกาล',
    emoji: '🍚', bg: '#f1f9ec'
  },
  caption: 'ข้าวเหนียวมูนกับมะม่วงสุก ขนมที่นิยมในช่วงฤดูมะม่วง',
  sections: [
    { h: 'รากฐานจากวัฒนธรรมข้าวเหนียว',
      p: 'ข้าวเหนียวเป็นอาหารหลักของหลายพื้นที่ในภูมิภาคเอเชียตะวันออกเฉียงใต้ รวมถึงภาคเหนือและภาคอีสานของไทย การนำข้าวเหนียวมาปรุงกับกะทิ น้ำตาล และเกลือ เป็นรูปแบบของ “ข้าวเหนียวมูน” ที่ใช้ทำขนมหลายชนิดในวัฒนธรรมไทย' },
    { h: 'ขนมตามฤดูกาล',
      p: 'มะม่วงสุกเป็นผลไม้ที่ออกชุกในช่วงฤดูร้อนของไทย การรับประทานข้าวเหนียวมูนคู่กับมะม่วงสุก จึงเป็นการจับคู่วัตถุดิบตามฤดูกาลที่ให้ทั้งความหวานมัน ความหอม และรสเปรี้ยวหวานของผลไม้เข้าด้วยกัน' },
    { h: 'ภาพลักษณ์ของอาหารไทย',
      p: 'ปัจจุบันข้าวเหนียวมะม่วงเป็นหนึ่งในของหวานไทยที่นักท่องเที่ยวและผู้สนใจอาหารไทยรู้จักอย่างกว้างขวาง และมักถูกนำเสนอเป็นตัวแทนของขนมไทยที่เรียบง่ายแต่ลงตัว' }
  ],
  noteLabel: 'หมายเหตุ:',
  note: 'ยังไม่มีหลักฐานที่ระบุได้แน่ชัดว่าใครคิดค้นข้าวเหนียวมะม่วงเป็นคนแรกหรือเริ่มขึ้นเมื่อใด เว็บไซต์นี้จึงไม่ระบุปีหรือชื่อผู้คิดค้น หากต้องการศึกษาเชิงลึก ควรอ้างอิงตำราอาหารไทย งานวิจัยด้านอาหาร หรือหน่วยงานด้านวัฒนธรรมที่เชื่อถือได้'
};

const INGREDIENTS = [
  { name: 'ข้าวเหนียวเขี้ยวงู', qty: '250 กรัม', desc: 'เมล็ดยาวเรียว นึ่งแล้วเหนียวนุ่ม เหมาะกับข้าวเหนียวมูน',
    image: { file: 'images/ingredients/sticky-rice.jpg', emoji: '🍚', bg: '#fdf0cf' } },
  { name: 'มะม่วงสุก', qty: '2 ลูก', desc: 'เลือกลูกที่สุกพอดี เนื้อหวานหอม ไม่เละ',
    image: { file: 'images/ingredients/mango.jpg', emoji: '🥭', bg: '#fde4a4' } },
  { name: 'กะทิ', qty: '250 มิลลิลิตร', desc: 'ใช้ผสมข้าวเหนียว และเก็บบางส่วนไว้ราดหน้า',
    image: { file: 'images/ingredients/coconut-milk.jpg', emoji: '🥥', bg: '#f4f1e6' } },
  { name: 'น้ำตาลทราย', qty: '80 กรัม', desc: 'ให้ความหวาน ปรับลดเพิ่มได้ตามชอบ',
    image: { file: 'images/ingredients/sugar.jpg', emoji: '🍬', bg: '#fff3d6' } },
  { name: 'เกลือป่น', qty: '1/2 ช้อนชา', desc: 'ช่วยตัดรส ทำให้รสหวานมันกลมกล่อม',
    image: { file: 'images/ingredients/salt.jpg', emoji: '🧂', bg: '#eef2f5' } },
  { name: 'ใบเตย', qty: '2 ใบ (ถ้ามี)', desc: 'เพิ่มกลิ่นหอมเมื่อนึ่งหรือต้มกับกะทิ',
    image: { file: 'images/ingredients/pandan.jpg', emoji: '🌿', bg: '#dff0d2' } },
  { name: 'ถั่วทองทอด', qty: 'สำหรับโรยหน้า', desc: 'โรยหน้าเพิ่มความกรอบและมัน',
    image: { file: 'images/ingredients/mung-beans.jpg', emoji: '🫘', bg: '#f6e3b4' } }
];

/* ขั้นตอนวิธีทำ: ใส่คลิปแทนรูปได้
   - video   : ไฟล์คลิปในโฟลเดอร์ videos เช่น 'videos/step1.mp4'  (แนะนำ .mp4 แบบ H.264)
   - youtube : หรือใช้ลิงก์ YouTube / รหัสวิดีโอ เช่น 'https://youtu.be/xxxxxxxxxxx'  (ถ้าใส่ จะใช้แทน video)
   - ถ้าไม่มีไฟล์คลิป หรือลบบรรทัด video ออก จะแสดงรูป image ตามเดิม (รูปยังใช้เป็นภาพปกของคลิปด้วย) */
const STEPS = [
  { title: 'ล้างและแช่ข้าวเหนียว', desc: 'ล้างข้าวเหนียวให้สะอาด แล้วแช่น้ำประมาณ 4–6 ชั่วโมง หรือแช่ข้ามคืน',
    tip: 'แช่ให้เต็มที่ เมล็ดข้าวจะสุกทั่วและนุ่มเสมอกัน',
    video: 'videos/step1.mp4',
  },
  { title: 'นึ่งข้าวเหนียวจนสุก', desc: 'สะเด็ดน้ำให้แห้ง แล้วนึ่งด้วยไฟแรงจนข้าวสุกใส เมล็ดนุ่ม',
    tip: 'รองหม้อนึ่งด้วยผ้าขาวบางหรือวางใบเตยด้านล่างเพื่อกลิ่นหอม',
    video: 'videos/step2.mp4', 
  },
  { title: 'ทำกะทิหวานมัน', desc: 'อุ่นกะทิด้วยไฟอ่อน ใส่น้ำตาลและเกลือ คนจนละลาย',
    tip: 'อย่าให้กะทิเดือดพล่าน เพราะอาจแตกมัน',
    video: 'videos/step3.mp4',
    },
  { title: 'คลุกและพักข้าวเหนียว', desc: 'ตักข้าวเหนียวร้อน ๆ ใส่ภาชนะ เทกะทิลงคลุกเบา ๆ ปิดฝาพักไว้ให้ข้าวดูดซึมกะทิ',
    tip: 'คลุกขณะข้าวยังร้อน กะทิจะซึมเข้าเมล็ดข้าวได้ดี',
    video: 'videos/step4.mp4',
  },
  { title: 'ปอกและหั่นมะม่วง', desc: 'ปอกเปลือกมะม่วงสุก แล้วหั่นเป็นชิ้นพอดีคำหรือแล่ตามแนวผล',
    tip: 'ใช้มะม่วงสุกแต่ยังแน่น จะหั่นสวยและไม่ช้ำ',
    video: 'videos/step5.mp4',
  },
  { title: 'จัดเสิร์ฟ', desc: 'จัดข้าวเหนียวมูนคู่กับมะม่วง ราดหัวกะทิ และโรยถั่วทองตามชอบ',
    tip: 'เติมกะทิเค็มมันเล็กน้อยเพื่อเพิ่มมิติรสชาติ',
    video: 'videos/step6.mp4',
  }
];

/* แกลเลอรี่: เพิ่มรูปใหม่ได้โดยคัดลอกบรรทัด { ... }, แล้วแก้ชื่อไฟล์และคำอธิบาย
   size: ใส่ 'wide' (กว้าง) 'tall' (สูง) หรือ 'wide tall' เพื่อให้ภาพใหญ่ขึ้น ไม่ใส่ก็ได้ */
const GALLERY = [
  { caption: 'ข้าวเหนียวมะม่วงจัดจาน', size: 'wide tall',
    image: { file: 'images/gallery/g1.jpg', online: 'https://commons.wikimedia.org/wiki/Special:FilePath/Mango_sticky_rice.jpg?width=1000', emoji: '🥭', bg: '#fdf0cf' } },
  { caption: 'มะม่วงสุก',
    image: { file: 'images/gallery/g2.jpg', online: 'https://commons.wikimedia.org/wiki/Special:FilePath/Mangos_-_single_and_halved.jpg?width=800', emoji: '🥭', bg: '#fde4a4' } },
  { caption: 'ข้าวเหนียว',
    image: { file: 'images/gallery/g3.jpg', online: 'https://commons.wikimedia.org/wiki/Special:FilePath/Sticky_rice.jpg?width=800', emoji: '🍚', bg: '#f4f1e6' } },
  { caption: 'กะทิ',
    image: { file: 'images/gallery/g4.jpg', online: 'https://commons.wikimedia.org/wiki/Special:FilePath/Coconut_milk.jpg?width=800', emoji: '🥥', bg: '#f1f9ec' } },
  { caption: 'ใบเตย',
    image: { file: 'images/gallery/g5.jpg', online: 'https://commons.wikimedia.org/wiki/Special:FilePath/Pandanus_amaryllifolius.jpg?width=800', emoji: '🌿', bg: '#dff0d2' } },
  { caption: 'น้ำตาลทราย', size: 'wide',
    image: { file: 'images/gallery/g6.jpg', online: 'https://commons.wikimedia.org/wiki/Special:FilePath/Sticky_rice_steamer.jpg?width=800', emoji: '♨️', bg: '#eeeeee' } },
  { caption: 'ถั่วทองทอด',
    image: { file: 'images/gallery/g7.jpg', online: 'https://commons.wikimedia.org/wiki/Special:FilePath/Mung_beans.jpg?width=800', emoji: '🫘', bg: '#f6e3b4' } },
  { caption: 'เกลือป่น',
    image: { file: 'images/gallery/g8.jpg', online: 'https://commons.wikimedia.org/wiki/Special:FilePath/Mango_sticky_rice.jpg?width=800', emoji: '🍽️', bg: '#fff3d6' } }
];

s