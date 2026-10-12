/* โค้ดการทำงานของเว็บไซต์ — อ่านข้อมูลจาก data/content.js (ปกติไม่ต้องแก้ไฟล์นี้) */
(function () {
  'use strict';
  const $ = (id) => document.getElementById(id);
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let heroBgEl = null;

  /* ---------- รูปภาพ: ลองไฟล์ในโฟลเดอร์ → ลิงก์ออนไลน์ → ภาพอีโมจิ ---------- */
  function placeholder(emoji, bg) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect width="400" height="300" fill="${bg}"/><circle cx="330" cy="50" r="90" fill="#fff" opacity=".35"/><text x="50%" y="56%" font-size="110" text-anchor="middle" dominant-baseline="middle">${emoji}</text></svg>`;
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
  }
  function makeImg(spec, alt) {
    const img = document.createElement('img');
    const list = [spec.file, spec.online].filter(Boolean);
    const fallback = placeholder(spec.emoji || '🥭', spec.bg || '#fdf0cf');
    let i = 0;
    img.alt = alt || spec.alt || '';
    img.loading = 'lazy';
    img.onerror = () => {
      if (i < list.length) { img.src = list[i++]; }
      else { img.onerror = null; img.src = fallback; }
    };
    img.onerror();
    return img;
  }
  function el(tag, cls, text) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined) e.textContent = text;
    return e;
  }

  /* ---------- หน้าแรก ---------- */
  $('navTitle').textContent = SITE.navTitle;
  $('heroTag').textContent = SITE.tag;
  $('t1').textContent = SITE.titleMain;
  $('t2').textContent = SITE.titleSub;
  $('heroIntro').textContent = SITE.intro;
  $('startBtn').textContent = SITE.startButton;
  $('heroImg').appendChild(makeImg(SITE.heroImage));

  /* รูปพื้นหลังหน้าแรก: เปิดไว้เป็นค่าเริ่มต้น  ปิดได้โดยใส่ heroBackground: false ใน data/content.js */
  if (SITE.heroBackground !== false) {
    const home = $('home');
    const candidates = [SITE.heroImage.file, SITE.heroImage.online].filter(Boolean);
    (function tryNext(i) {
      if (i >= candidates.length) return;           // ไม่พบรูป: ใช้เลย์เอาต์เดิม
      const probe = new Image();
      probe.onload = () => {
        const bg = el('div', 'hero-bg');
        bg.style.backgroundImage = 'url("' + candidates[i] + '")';
        bg.setAttribute('aria-hidden', 'true');
        home.insertBefore(bg, home.firstChild);
        home.classList.add('hero-full');
        heroBgEl = bg;
      };
      probe.onerror = () => tryNext(i + 1);
      probe.src = candidates[i];
    })(0);
  }
  $('footerText').textContent = SITE.footer;
  $('footerNote').textContent = SITE.footerNote;

  /* ---------- ประวัติศาสตร์ ---------- */
  $('historyFig').insertBefore(makeImg(HISTORY.image), $('historyCap'));
  $('historyCap').textContent = HISTORY.caption;
  const ht = $('historyText');
  HISTORY.sections.forEach((s) => { ht.append(el('h3', '', s.h), el('p', '', s.p)); });
  const note = el('p', 'note');
  note.append(el('strong', '', HISTORY.noteLabel + ' '), document.createTextNode(HISTORY.note));
  ht.appendChild(note);

  /* ---------- ดับเบิลคลิก (หรือแตะสองครั้ง / กด Enter) เพื่อขยาย-ย่อ การ์ด ---------- */
  function makeExpandable(node, group, label) {
    node.tabIndex = 0;
    node.setAttribute('aria-expanded', 'false');
    node.title = label;
    let lastTap = 0;
    const toggle = () => {
      const was = node.classList.contains('expanded');
      group.forEach((n) => { n.classList.remove('expanded'); n.setAttribute('aria-expanded', 'false'); });
      if (!was) {
        node.classList.add('expanded');
        node.setAttribute('aria-expanded', 'true');
        setTimeout(() => node.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' }), 80);
      }
      const sel = window.getSelection && window.getSelection();
      if (sel) sel.removeAllRanges();
    };
    const onPlayer = (e) => e.target.closest && e.target.closest('video, iframe');
    node.addEventListener('dblclick', (e) => { if (!onPlayer(e)) toggle(); });
    node.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); toggle(); } });
    node.addEventListener('touchend', (e) => {   // แตะสองครั้งบนมือถือ
      if (onPlayer(e)) return;
      const now = Date.now();
      if (now - lastTap < 350) { e.preventDefault(); toggle(); lastTap = 0; } else lastTap = now;
    });
  }

  /* ---------- ส่วนผสม ---------- */
  const ingGrid = $('ingGrid');
  const ingCards = [];
  INGREDIENTS.forEach((x, idx) => {
    const a = el('article', 'card reveal');
    a.dataset.i = idx % 4;
    makeExpandable(a, ingCards, 'ดับเบิลคลิกเพื่อขยาย: ' + x.name);
    ingCards.push(a);
    const wrap = el('div', 'img');
    wrap.appendChild(makeImg(x.image, 'ภาพประกอบ' + x.name));
    const body = el('div', 'body');
    body.append(el('h3', '', x.name), el('span', 'qty', x.qty), el('p', '', x.desc), el('small', 'hint', 'ดับเบิลคลิกเพื่อขยาย / ย่อ'));
    a.append(wrap, body);
    ingGrid.appendChild(a);
  });

  /* ---------- คลิปในขั้นตอนวิธีทำ: ไฟล์ในโฟลเดอร์ videos หรือลิงก์ YouTube (ถ้าโหลดไม่ได้ จะใช้รูปแทน) ---------- */
  function ytId(s) {
    if (!s) return null;
    const m = String(s).match(/(?:youtu\.be\/|v=|embed\/|shorts\/|live\/)([\w-]{11})/) || String(s).match(/^([\w-]{11})$/);
    return m ? m[1] : null;
  }
  function makeMedia(s, i) {
    const alt = `ภาพประกอบขั้นตอนที่ ${i + 1}: ${s.title}`;
    const id = ytId(s.youtube);
    if (id) {
      const f = document.createElement('iframe');
      f.src = 'https://www.youtube-nocookie.com/embed/' + id + '?rel=0';
      f.title = `คลิปขั้นตอนที่ ${i + 1}: ${s.title}`;
      f.allow = 'encrypted-media; picture-in-picture; fullscreen';
      f.allowFullscreen = true;
      f.loading = 'lazy';
      return f;
    }
    if (s.video) {
      const v = document.createElement('video');
      v.controls = true; v.playsInline = true; v.preload = 'metadata';
      v.setAttribute('aria-label', `คลิปขั้นตอนที่ ${i + 1}: ${s.title}`);
      if (s.image && s.image.file) v.poster = s.image.file;
      v.src = s.video;
      v.onerror = () => { v.replaceWith(makeImg(s.image, alt)); };   // ไม่พบคลิป: ใช้รูปแทน
      v.addEventListener('play', () => {                              // หยุดเพลงประกอบตอนเล่นคลิป
        if (typeof soundOn !== 'undefined' && soundOn) { soundOn = false; stopMusic(); setBtn(false); }
      });
      return v;
    }
    return makeImg(s.image, alt);
  }

  /* ---------- วิธีการทำ ---------- */
  const stepsEl = $('steps');
  const stepCards = [];
  STEPS.forEach((s, i) => {
    const a = el('article', 'step reveal');
    makeExpandable(a, stepCards, 'ดับเบิลคลิกเพื่อขยาย: ขั้นตอนที่ ' + (i + 1));
    stepCards.push(a);
    const pic = el('div', 'pic');
    pic.appendChild(makeMedia(s, i));
    const txt = el('div', 'txt');
    const tip = el('div', 'tip');
    tip.append(el('b', '', 'เคล็ดลับ: '), document.createTextNode(s.tip));
    txt.append(el('span', 'num', String(i + 1)), el('h3', '', `ขั้นตอนที่ ${i + 1}: ${s.title}`), el('p', '', s.desc), tip, el('small', 'hint', 'ดับเบิลคลิกเพื่อขยาย / ย่อ'));
    a.append(pic, txt);
    stepsEl.appendChild(a);
  });

  /* ---------- แกลเลอรี่ + Lightbox ---------- */
  const gal = $('galleryGrid');
  const lb = $('lightbox'), lbImg = $('lbImg'), lbCap = $('lbCap');
  let cur = 0, lastFocus = null;

  GALLERY.forEach((g, i) => {
    const b = el('div', 'g-item reveal ' + (g.size || ''));
    b.dataset.i = i % 4;
    b.setAttribute('role', 'button');
    b.tabIndex = 0;
    b.setAttribute('aria-label', 'ดูภาพ: ' + g.caption);
    b.appendChild(makeImg(g.image, g.caption));
    b.appendChild(el('span', '', g.caption));
    const zoom = el('i', 'zoom', '🔍');
    zoom.setAttribute('aria-hidden', 'true');
    b.appendChild(zoom);
    const open = () => openLB(i);
    b.addEventListener('click', open);
    b.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
    gal.appendChild(b);
  });

  let lbToken = 0;
  function showLB(i) {
    cur = (i + GALLERY.length) % GALLERY.length;
    const g = GALLERY[cur];
    const thumb = gal.querySelectorAll('.g-item img')[cur];
    const token = ++lbToken;
    lbImg.classList.remove('zoomed');
    lb.classList.remove('zoomed-on');
    lbImg.style.transformOrigin = '50% 50%';
    lbImg.src = thumb.currentSrc || thumb.src;          // แสดงภาพเล็กก่อนทันที
    lbImg.alt = g.caption;
    lbCap.textContent = `${g.caption} (${cur + 1}/${GALLERY.length})`;
    // แล้วโหลดภาพความละเอียดสูงมาแทนที่
    const hi = [g.image.file, g.image.online && g.image.online.replace(/width=\d+/, 'width=1800')].filter(Boolean);
    (function tryNext(k) {
      if (k >= hi.length) return;
      const probe = new Image();
      probe.onload = () => { if (token === lbToken) lbImg.src = hi[k]; };
      probe.onerror = () => tryNext(k + 1);
      probe.src = hi[k];
    })(0);
  }
  function openLB(i) {
    lastFocus = document.activeElement;
    showLB(i);
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
    $('lbClose').focus();
  }
  function closeLB() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }
  $('lbClose').onclick = closeLB;
  $('lbPrev').onclick = () => showLB(cur - 1);
  $('lbNext').onclick = () => showLB(cur + 1);
  lb.addEventListener('click', (e) => { if (e.target === lb) closeLB(); });
  // คลิกที่ภาพเพื่อซูมเข้า/ออก ณ ตำแหน่งที่คลิก
  lbImg.addEventListener('click', (e) => {
    const r = lbImg.getBoundingClientRect();
    if (!lbImg.classList.contains('zoomed')) {
      lbImg.style.transformOrigin = ((e.clientX - r.left) / r.width * 100) + '% ' + ((e.clientY - r.top) / r.height * 100) + '%';
    }
    const z = lbImg.classList.toggle('zoomed');
    lb.classList.toggle('zoomed-on', z);
  });
  // ปัดซ้าย-ขวาบนมือถือ
  let tx = null;
  lb.addEventListener('touchstart', (e) => { tx = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', (e) => {
    if (tx === null || lbImg.classList.contains('zoomed')) { tx = null; return; }
    const dx = e.changedTouches[0].clientX - tx; tx = null;
    if (Math.abs(dx) > 50) showLB(cur + (dx < 0 ? 1 : -1));
  }, { passive: true });
  document.addEventListener('keydown', (e) => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') closeLB();
    if (e.key === 'ArrowLeft') showLB(cur - 1);
    if (e.key === 'ArrowRight') showLB(cur + 1);
  });


  /* ---------- เมนู ---------- */
  const burger = $('burger'), menu = $('menu');
  burger.onclick = () => { const o = menu.classList.toggle('open'); burger.setAttribute('aria-expanded', o); };
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => {
    menu.classList.remove('open'); burger.setAttribute('aria-expanded', false);
  }));

  const links = [...document.querySelectorAll('a.link')];
  const secObs = new IntersectionObserver((es) => {
    es.forEach((e) => {
      if (e.isIntersecting) links.forEach((l) => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  document.querySelectorAll('main section').forEach((s) => secObs.observe(s));

  /* ---------- เอฟเฟกต์เลื่อนเข้า ---------- */
  const revObs = new IntersectionObserver((es) => {
    es.forEach((e) => {
      if (!e.isIntersecting) return;
      const d = (Number(e.target.dataset.i) || 0) * 90;
      e.target.style.transitionDelay = d + 'ms';
      e.target.classList.add('show');
      setTimeout(() => { e.target.style.transitionDelay = ''; e.target.classList.add('done'); }, 1000 + d);
      revObs.unobserve(e.target);
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((x) => revObs.observe(x));
  /* ---------- แถบความคืบหน้าการเลื่อน + พารัลแลกซ์รูปพื้นหลัง ---------- */
  const bar = el('div', 'progress');
  bar.setAttribute('aria-hidden', 'true');
  document.body.appendChild(bar);
  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = 'scaleX(' + (max > 0 ? Math.min(1, window.scrollY / max) : 0) + ')';
      if (heroBgEl && !reduce) heroBgEl.style.setProperty('--py', Math.min(70, window.scrollY * 0.12) + 'px');
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- กลีบดอกไม้/ใบไม้โปรยลงมาในหน้าแรก ---------- */
  if (!reduce) {
    const box = el('div', 'petals');
    box.setAttribute('aria-hidden', 'true');
    const icons = ['🌼', '🍃', '🌼', '🍃', '✨', '🥭'];
    const n = window.innerWidth < 700 ? 8 : 16;
    for (let k = 0; k < n; k++) {
      const p = el('span', 'petal', icons[k % icons.length]);
      p.style.left = Math.random() * 100 + '%';
      p.style.setProperty('--s', 14 + Math.random() * 16 + 'px');
      p.style.setProperty('--d', 11 + Math.random() * 10 + 's');
      p.style.setProperty('--delay', -Math.random() * 20 + 's');
      p.style.setProperty('--sw', 30 + Math.random() * 60 + 'px');
      box.appendChild(p);
    }
    $('home').insertBefore(box, $('home').firstChild);
  }

  /* ---------- เพลงประกอบ + เสียงเอฟเฟกต์ ----------
     ถ้ามีไฟล์ audio/bgm.mp3 จะเล่นไฟล์นั้น (ตั้งชื่ออื่นได้ที่ musicFile: ใน data/content.js)
     ถ้าไม่มีไฟล์ จะสร้างเสียงดนตรีเบา ๆ แบบสเกลเพนทาโทนิกให้อัตโนมัติ (ไม่มีลิขสิทธิ์)
     เบราว์เซอร์ไม่อนุญาตให้เล่นเสียงเอง ผู้ชมต้องกดปุ่มเปิดเอง */
  const MUSIC_FILE = SITE.musicFile || 'audio/bgm.mp3';
  const SCALE = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 587.33, 659.25, 784.0, 880.0];
  let actx = null, master = null, bus = null, fx = null;
  let melodyTimer = null, padTimer = null, fileAudio = null, mode = null, soundOn = false, noteIdx = 4;

  function ensureCtx() {
    if (actx) return actx;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    actx = new AC();
    master = actx.createGain(); master.gain.value = 0; master.connect(actx.destination);
    fx = actx.createGain(); fx.gain.value = 0.6; fx.connect(actx.destination);
    bus = actx.createGain(); bus.connect(master);
    const d = actx.createDelay(1.5); d.delayTime.value = 0.45;
    const fb = actx.createGain(); fb.gain.value = 0.4;
    const wet = actx.createGain(); wet.gain.value = 0.45;
    bus.connect(d); d.connect(fb); fb.connect(d); d.connect(wet); wet.connect(master);
    return actx;
  }
  function tone(freq, t, dur, vol, type, attack, dest) {
    const o = actx.createOscillator(), g = actx.createGain();
    o.type = type || 'sine'; o.frequency.value = freq;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + (attack || 0.03));
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(dest || bus);
    o.start(t); o.stop(t + dur + 0.05);
  }
  function melody() {
    const t = actx.currentTime + 0.05;
    if (Math.random() < 0.78) {
      noteIdx = Math.max(0, Math.min(SCALE.length - 1, noteIdx + Math.floor(Math.random() * 5) - 2));
      tone(SCALE[noteIdx], t, 2.6, 0.16, 'triangle', 0.02);
      tone(SCALE[noteIdx] / 2, t, 3.2, 0.05, 'sine', 0.05);
    }
  }
  function pad() {
    const t = actx.currentTime + 0.05;
    tone(130.81, t, 9, 0.07, 'sine', 3);
    tone(196.0, t, 9, 0.05, 'sine', 3.5);
  }
  function startSynth() {
    if (!ensureCtx()) return false;
    actx.resume();
    mode = 'synth';
    master.gain.cancelScheduledValues(actx.currentTime);
    master.gain.setValueAtTime(master.gain.value, actx.currentTime);
    master.gain.linearRampToValueAtTime(0.55, actx.currentTime + 2);
    pad();
    melodyTimer = setInterval(melody, 650);
    padTimer = setInterval(pad, 8000);
    return true;
  }
  function stopMusic() {
    if (mode === 'file' && fileAudio) fileAudio.pause();
    if (mode === 'synth' && actx) {
      clearInterval(melodyTimer); clearInterval(padTimer);
      master.gain.cancelScheduledValues(actx.currentTime);
      master.gain.setValueAtTime(master.gain.value, actx.currentTime);
      master.gain.linearRampToValueAtTime(0, actx.currentTime + 0.8);
      setTimeout(() => { if (!soundOn && actx) actx.suspend(); }, 1000);
    }
    mode = null;
  }
  function chime() {
    if (!soundOn || !ensureCtx()) return;
    actx.resume();
    const t = actx.currentTime + 0.01;
    tone(880, t, 0.7, 0.12, 'sine', 0.01, fx);
    tone(1318.5, t + 0.09, 0.9, 0.09, 'sine', 0.01, fx);
  }

  const mbtn = document.createElement('button');
  mbtn.type = 'button';
  mbtn.className = 'music-btn';
  mbtn.innerHTML = '<span class="eq"><i></i><i></i><i></i></span><span class="lbl">เปิดเพลง</span>';
  mbtn.setAttribute('aria-pressed', 'false');
  mbtn.setAttribute('aria-label', 'เปิดเพลงประกอบ');
  const hint = el('div', 'music-hint', '🎵 กดเพื่อเปิดเพลงประกอบ');
  document.body.append(hint, mbtn);
  setTimeout(() => hint.classList.add('gone'), 8000);

  function setBtn(on) {
    mbtn.classList.toggle('on', on);
    mbtn.setAttribute('aria-pressed', on);
    mbtn.setAttribute('aria-label', on ? 'ปิดเพลงประกอบ' : 'เปิดเพลงประกอบ');
    mbtn.querySelector('.lbl').textContent = on ? 'ปิดเพลง' : 'เปิดเพลง';
  }
  mbtn.addEventListener('click', async () => {
    hint.classList.add('gone');
    if (soundOn) { soundOn = false; stopMusic(); setBtn(false); return; }
    soundOn = true; setBtn(true);
    try {
      if (!fileAudio) { fileAudio = new Audio(MUSIC_FILE); fileAudio.loop = true; fileAudio.volume = 0.5; }
      await fileAudio.play();
      mode = 'file';
    } catch (err) {
      fileAudio = null;
      if (!startSynth()) { soundOn = false; setBtn(false); }
    }
  });
  document.addEventListener('click', (e) => {
    if (e.target.closest('.btn, .g-item, a.link, .lb-btn')) chime();
  });
})();
