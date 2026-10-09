/* Alfa Contabilidade — interações */
(() => {
  const WA_NUMBER = '5512991670553';
  const WA_DEFAULT = 'Olá! Gostaria de conversar com a ALFA Contabilidade.';
  const waLink = (text) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text || WA_DEFAULT)}`;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ---------- Links de WhatsApp ---------- */
  document.querySelectorAll('[data-wa]').forEach((a) => {
    a.href = waLink(a.dataset.wa);
    a.target = '_blank';
    a.rel = 'noopener';
  });

  /* ---------- Header + barra de progresso ---------- */
  const header = document.querySelector('.site-header');
  const bar = document.querySelector('.progress span');
  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle('scrolled', y > 20);
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    updateSteps();
  };

  /* ---------- Menu mobile ---------- */
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.getElementById('mobile-menu');
  const setMenu = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    menu.hidden = !open;
  };
  toggle.addEventListener('click', () => setMenu(menu.hidden));
  menu.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !menu.hidden) setMenu(false); });
  window.addEventListener('resize', () => { if (window.innerWidth > 1080 && !menu.hidden) setMenu(false); });

  /* ---------- Reveal ao rolar ---------- */
  const revealIO = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add('in'); revealIO.unobserve(en.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach((el) => revealIO.observe(el));

  /* ---------- Contadores ---------- */
  const countIO = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      const el = en.target;
      countIO.unobserve(el);
      const to = +el.dataset.count;
      const from = +(el.dataset.from || 0);
      if (reduceMotion) { el.textContent = to; return; }
      const dur = 1600;
      const t0 = performance.now();
      const tick = (t) => {
        const p = Math.min((t - t0) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 4);
        el.textContent = Math.round(from + (to - from) * eased);
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.6 });
  document.querySelectorAll('[data-count]').forEach((el) => countIO.observe(el));

  /* ---------- Navegação ativa ---------- */
  const navLinks = [...document.querySelectorAll('.nav a')];
  const sectionIO = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      navLinks.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === `#${en.target.id}`));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  navLinks.forEach((a) => {
    const s = document.querySelector(a.getAttribute('href'));
    if (s) sectionIO.observe(s);
  });

  /* ---------- Spotlight nos cards ---------- */
  document.querySelectorAll('.spotlight').forEach((card) => {
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
  });

  /* ---------- Parallax / tilt no hero ---------- */
  const tilt = document.querySelector('[data-tilt]');
  if (tilt && finePointer && !reduceMotion) {
    const photo = tilt.querySelector('.hero-photo');
    const layers = tilt.querySelectorAll('[data-depth]');
    tilt.closest('.hero').addEventListener('pointermove', (e) => {
      const r = tilt.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) / r.width;
      const y = (e.clientY - (r.top + r.height / 2)) / r.height;
      photo.style.setProperty('--ry', `${x * 6}deg`);
      photo.style.setProperty('--rx', `${-y * 6}deg`);
      layers.forEach((l) => {
        const d = +l.dataset.depth;
        l.style.setProperty('--tx', `${-x * d}px`);
        l.style.setProperty('--ty', `${-y * d}px`);
      });
    });
    tilt.closest('.hero').addEventListener('pointerleave', () => {
      photo.style.setProperty('--ry', '0deg');
      photo.style.setProperty('--rx', '0deg');
      layers.forEach((l) => { l.style.setProperty('--tx', '0px'); l.style.setProperty('--ty', '0px'); });
    });
  }

  /* ---------- Cartão "Rotina do mês" ---------- */
  const routine = document.querySelectorAll('.routine li');
  const routineBar = document.querySelector('.routine-bar span');
  if (routine.length) {
    let step = 0;
    const run = () => {
      routine.forEach((li, i) => li.classList.toggle('done', i < step));
      routineBar.style.width = `${(step / routine.length) * 100}%`;
      step = step >= routine.length ? 0 : step + 1;
    };
    if (reduceMotion) { step = routine.length; run(); }
    else { setTimeout(() => { run(); setInterval(run, 1300); }, 900); }
  }

  /* ---------- Botões magnéticos ---------- */
  if (finePointer && !reduceMotion) {
    document.querySelectorAll('.magnetic').forEach((btn) => {
      btn.addEventListener('pointermove', (e) => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        btn.style.transform = `translate(${x * 0.18}px, ${y * 0.3 - 2}px)`;
      });
      btn.addEventListener('pointerleave', () => { btn.style.transform = ''; });
    });
  }

  /* ---------- Abas de serviços ---------- */
  const tabs = [...document.querySelectorAll('.svc-tabs [role="tab"]')];
  const selectTab = (tab, focus) => {
    tabs.forEach((t) => {
      const on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
    });
    if (focus) tab.focus();
    if (window.innerWidth <= 1080) tab.scrollIntoView({ block: 'nearest', inline: 'center', behavior: reduceMotion ? 'auto' : 'smooth' });
  };
  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => selectTab(tab));
    tab.addEventListener('keydown', (e) => {
      const keys = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
      if (e.key in keys) {
        e.preventDefault();
        selectTab(tabs[(i + keys[e.key] + tabs.length) % tabs.length], true);
      }
    });
  });

  /* ---------- Processo: linha que preenche ---------- */
  const stepsEl = document.getElementById('steps');
  const stepItems = stepsEl ? [...stepsEl.querySelectorAll('.step')] : [];
  function updateSteps() {
    if (!stepsEl) return;
    const r = stepsEl.getBoundingClientRect();
    const vh = window.innerHeight;
    const p = Math.max(0, Math.min(1, (vh * 0.85 - r.top) / (vh * 0.55)));
    stepsEl.style.setProperty('--fill', p.toFixed(3));
    stepItems.forEach((s, i) => s.classList.toggle('lit', p >= i / (stepItems.length - 1) - 0.02));
  }

  /* ---------- Diagnóstico ---------- */
  const quiz = document.getElementById('quiz');
  if (quiz) {
    const wrap = quiz.closest('.quiz');
    const qs = [...quiz.querySelectorAll('.q')];
    const total = qs.length - 1; // última é o resultado
    const next = document.getElementById('q-next');
    const back = document.getElementById('q-back');
    const cur = document.getElementById('q-cur');
    const qbar = document.getElementById('q-bar');
    const label = wrap.querySelector('.quiz-step-label');
    let idx = 0;

    const answered = (q) => !!q.querySelector('input:checked');
    const values = (name) => [...quiz.querySelectorAll(`input[name="${name}"]:checked`)].map((i) => i.value);

    const render = () => {
      qs.forEach((q, i) => q.classList.toggle('active', i === idx));
      const done = idx === total;
      wrap.classList.toggle('done', done);
      cur.textContent = Math.min(idx + 1, total);
      label.innerHTML = done ? '<b>Pronto!</b> Seu resumo' : `Pergunta <b>${idx + 1}</b> de ${total}`;
      qbar.style.width = `${((idx + (done ? 0 : 1)) / total) * 100}%`;
      back.disabled = idx === 0;
      next.disabled = !done && !answered(qs[idx]);
      next.innerHTML = idx === total - 1
        ? 'Ver meu diagnóstico <svg class="ico"><use href="#i-arrow"/></svg>'
        : 'Continuar <svg class="ico"><use href="#i-arrow"/></svg>';
      if (done) buildResult();
    };

    const go = (to) => {
      idx = Math.max(0, Math.min(total, to));
      render();
      const top = wrap.getBoundingClientRect().top;
      if (top < 0 || top > window.innerHeight * 0.5) wrap.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    };

    quiz.addEventListener('change', (e) => {
      next.disabled = !answered(qs[idx]);
      // avança sozinho nas perguntas de escolha única
      if (e.target.type === 'radio' && idx < total - 1) setTimeout(() => go(idx + 1), 320);
    });
    next.addEventListener('click', () => go(idx + 1));
    back.addEventListener('click', () => go(idx - 1));

    const buildResult = () => {
      const momento = values('momento')[0] || '';
      const tipo = values('tipo')[0] || '';
      const equipe = values('equipe')[0] || '';
      const ajuda = values('ajuda');

      const svc = new Set();
      const plan = {
        'Quero abrir uma empresa': ['Abertura de empresa', 'Seu negócio começa organizado: escolhemos juntos o melhor enquadramento, cuidamos da abertura e deixamos a rotina inicial pronta.', ['Societário', 'Fiscal e tributário', 'Contabilidade']],
        'Quero trocar de contador': ['Troca de contador sem dor de cabeça', 'A gente entende sua rotina atual, cuida da passagem de documentos com o escritório anterior e assume o acompanhamento com proximidade.', ['Contabilidade', 'Fiscal e tributário', 'Orientação próxima']],
        'Preciso organizar a rotina': ['Rotina contábil organizada', 'Vamos colocar a casa em ordem: organizar documentos, revisar impostos e deixar claro o que precisa ser feito todo mês.', ['Contabilidade', 'Obrigações acessórias', 'Orientação próxima']],
        'Sou MEI e estou crescendo': ['Crescimento com segurança', 'Avaliamos se é hora de deixar o MEI, qual o melhor enquadramento para o novo porte e como fazer a transição do jeito certo.', ['Societário', 'Fiscal e tributário']],
      }[momento] || ['Atendimento sob medida', 'Vamos entender seu cenário e indicar o acompanhamento ideal.', ['Orientação próxima']];

      plan[2].forEach((s) => svc.add(s));
      if (equipe && equipe !== 'Nenhum') svc.add('Trabalhista');
      const map = {
        'Impostos e notas fiscais': 'Fiscal e tributário',
        'Folha de pagamento': 'Trabalhista',
        'Abertura ou alteração de empresa': 'Societário',
        'Organizar a contabilidade': 'Contabilidade',
        'Regularizar pendências': 'Obrigações acessórias',
        'Entender os números da empresa': 'Orientação próxima',
      };
      ajuda.forEach((a) => map[a] && svc.add(map[a]));

      document.getElementById('r-title').textContent = plan[0];
      document.getElementById('r-text').textContent = plan[1];
      const box = document.getElementById('r-services');
      box.innerHTML = '';
      svc.forEach((s) => { const sp = document.createElement('span'); sp.textContent = s; box.appendChild(sp); });

      const msg = [
        'Olá! Fiz o diagnóstico no site da Alfa Contabilidade.',
        `• Momento: ${momento}`,
        `• Situação da empresa: ${tipo}`,
        `• Funcionários: ${equipe}`,
        ajuda.length ? `• Preciso de ajuda com: ${ajuda.join(', ')}` : '',
        '',
        'Gostaria de conversar com um contador.',
      ].filter((l, i, arr) => l !== '' || arr[i - 1] !== '').join('\n');

      const ta = document.getElementById('r-msg');
      ta.value = msg;
      const send = document.getElementById('r-send');
      send.href = waLink(ta.value);
      ta.oninput = () => { send.href = waLink(ta.value); };
    };

    render();
  }

  /* ---------- Formulário de contato → WhatsApp ---------- */
  const form = document.getElementById('contact');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const nome = form.nome.value.trim();
      const field = form.nome.closest('.field');
      if (!nome) { field.classList.add('error'); form.nome.focus(); return; }
      field.classList.remove('error');
      const empresa = form.empresa.value.trim();
      const msg = [
        `Olá! Meu nome é ${nome}${empresa ? `, da empresa ${empresa}` : ''}.`,
        `Assunto: ${form.assunto.value}.`,
        form.mensagem.value.trim(),
      ].filter(Boolean).join('\n');
      window.open(waLink(msg), '_blank', 'noopener');
    });
    form.nome.addEventListener('input', () => form.nome.closest('.field').classList.remove('error'));
  }

  /* ---------- Balão do WhatsApp ---------- */
  const bubble = document.getElementById('wa-bubble');
  let bubbleClosed = false;
  try { bubbleClosed = sessionStorage.getItem('alfa-wa-bubble') === '1'; } catch (_) { /* sem storage */ }
  if (bubble && !bubbleClosed) {
    setTimeout(() => { bubble.hidden = false; }, 6000);
    bubble.querySelector('.wa-bubble-close').addEventListener('click', () => {
      bubble.hidden = true;
      try { sessionStorage.setItem('alfa-wa-bubble', '1'); } catch (_) { /* sem storage */ }
    });
  }

  /* ---------- Ano no rodapé ---------- */
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', updateSteps);
  onScroll();
})();
