/*
  Motor do curso: mostra a tela atual, controla navegação, travamento, índice de revisão,
  progresso (suspend_data) e conclusão (lesson_status) no SCORM 1.2.

  Para criar o conteúdo de uma tela, registre uma função em js/telas/<id>.js:
    window.RENDER['m1-01'] = function (t, estadoId, ctx) { ... };
  Dentro dela, chame ctx.concluir() quando o aluno terminar a atividade da tela.
*/
(function () {
  'use strict';

  var CFG = window.CONFIG, TELAS = window.TELAS, GRUPOS = window.GRUPOS;
  window.RENDER = window.RENDER || {};

  var $ = function (s) { return document.querySelector(s); };
  var pos = {};                       // id -> posição na lista
  TELAS.forEach(function (t, i) { pos[t.id] = i; });

  var estado = { atual: null, est: null, feitas: {}, vistas: {} };

  function pad(n) { n = String(n); return n.length < 2 ? '0' + n : n; }

  /* ---------------- escala do palco ---------------- */
  function ajustarEscala() {
    var e = Math.min(window.innerWidth / CFG.LARGURA, window.innerHeight / CFG.ALTURA);
    document.documentElement.style.setProperty('--escala', e);
  }

  /* ---------------- imagens de fundo carregadas antes de aparecer ---------------- */
  var carregados = {};      // endereço -> true (já está no navegador)
  var contagemTela = 0;     // número do desenho atual (descarta respostas atrasadas)
  function carregarImagem(url, depois) {
    if (carregados[url] === true) { depois(true); return; }
    var im = new Image();
    im.onload = function () { carregados[url] = true; depois(true); };
    im.onerror = function () { depois(false); };
    im.src = url;
  }

  /* ---------------- celular em pé ---------------- */
  var CELULAR = window.matchMedia('(max-width: 900px) and (orientation: portrait), (max-width: 600px), (max-height: 500px) and (orientation: landscape)');

  /* Os cards que viram mantêm o tamanho do desenho e são reduzidos para caber na largura da tela. */
  function ajustarMobile() {
    var largura = Math.min($('#tela').clientWidth || 360, 440);
    document.querySelectorAll('.flip').forEach(function (f) {
      if (CELULAR.matches) { f.style.setProperty('--k', (largura / 511).toFixed(4)); }
      else { f.style.removeProperty('--k'); }
    });
  }

  /* ---------------- progresso (suspend_data) ---------------- */
  function carregar() {
    var bruto = Scorm.obter('cmi.suspend_data'), o = {};
    try { o = JSON.parse(bruto || '{}'); } catch (e) { o = {}; }
    (o.d || []).forEach(function (id) { if (id in pos) { estado.feitas[id] = 1; } });
    (o.v || []).forEach(function (id) { if (id in pos) { estado.vistas[id] = 1; } });
    return o;
  }

  function salvar() {
    /* o estado interno da tela (pop-up aberto etc.) não é guardado: ao voltar, a tela abre normal */
    var o = { c: estado.atual, e: null, d: Object.keys(estado.feitas), v: Object.keys(estado.vistas) };
    var s = JSON.stringify(o);
    if (s.length < 4000) { Scorm.definir('cmi.suspend_data', s); }   // limite do SCORM 1.2: 4096
    Scorm.definir('cmi.core.lesson_location', estado.atual || '');
    atualizarConclusao();
    Scorm.salvar();
  }

  function totalFeitas() { return Object.keys(estado.feitas).length; }

  function atualizarConclusao() {
    Scorm.status(totalFeitas() >= TELAS.length ? 'completed' : 'incomplete');
  }

  /* ---------------- desenho da tela ---------------- */
  function aviso(texto) {
    var a = $('#aviso');
    a.textContent = texto;
    a.classList.add('visivel');
    clearTimeout(aviso.tempo);
    aviso.tempo = setTimeout(function () { a.classList.remove('visivel'); }, 3200);
  }

  function ctxDaTela(t) {
    return {
      tela: $('#tela'),
      concluir: function () { concluirTela(t.id); },
      ir: ir,
      /* Vai para a tela seguinte da lista (usado nos vídeos que avançam sozinhos ao terminar). */
      proxima: function () { var i = pos[t.id] + 1; if (i < TELAS.length && estado.atual === t.id) { ir(TELAS[i].id); } },
      concluida: function () { return !!estado.feitas[t.id]; },
      estados: t.estados || [],
      /* Informa que a tela mostra agora um estado (pop-up aberto, item aberto...) ou volta ao normal (null). */
      estado: function (e) {
        estado.est = e || null;
        try { history.replaceState(null, '', '#' + t.id + (e ? '/' + e : '')); } catch (x) { /* ignora */ }
        if ($('#indice').classList.contains('aberto')) { montarIndice(); }
      },
      aviso: aviso,
      vista: function (id) { return !!estado.vistas[id]; },
      moduloConcluido: function (grupo) {
        return TELAS.every(function (x) { return x.grupo !== grupo || !!estado.feitas[x.id]; });
      }
    };
  }

  function desenhar(t, estId) {
    var el = $('#tela');
    el.innerHTML = '';
    el.className = '';
    var fn = window.RENDER[t.id];
    if (fn) { fn(t, estId, ctxDaTela(t)); return; }

    /* tela provisória */
    var est = (t.estados || []).filter(function (x) { return x.id === estId; })[0];
    var h = '<div class="provisoria">' +
      '<span class="selo">TELA EM CONSTRUÇÃO</span>' +
      '<p class="el t-rotulo" style="--x:200px;--y:322px;--w:1200px">' + GRUPOS[t.grupo].nome + ' · Tela ' + t.num + '</p>' +
      '<h1 class="el t-titulo" style="--x:200px;--y:355px;--w:1300px">' + t.titulo + '</h1>' +
      '<p class="el t-texto" style="--x:200px;--y:470px;--w:1200px">Tipo de interação no storyboard: ' + t.tipo + '.' +
        (t.tituloProvisorio ? '<br>O storyboard não traz título para esta tela — o nome acima é provisório.' : '') + '</p>' +
      '<p class="el t-instrucao" style="--x:200px;--y:570px;--w:1200px">Storyboard ' + GRUPOS[t.grupo].arquivo + ' · slide ' + (est ? est.slide : t.slide) +
        (est ? ' · estado ' + est.id + ' — ' + est.rotulo : '') + '</p>' +
      (CFG.MODO_REVISAO ? '<button id="btnTeste" class="el btn-borda" type="button" style="--x:200px;--y:650px">Marcar esta tela como concluída (teste)</button>' : '') +
      '</div>';
    el.innerHTML = h;
    var b = $('#btnTeste');
    if (b) { b.addEventListener('click', function () { concluirTela(t.id); }); }
  }

  function concluirTela(id) {
    if (estado.feitas[id]) { return; }
    estado.feitas[id] = 1;
    salvar();
    atualizarChrome();
    if ($('#indice').classList.contains('aberto')) { montarIndice(); }
  }

  /* ---------------- navegação ---------------- */
  function liberada(id) {
    var i = pos[id];
    return CFG.MODO_REVISAO || !!estado.vistas[id] || i === 0 || !!estado.feitas[anterior(id)];
  }

  /* A tela "anterior": a da lista, ou a indicada em "voltarPara" (o Módulo 02 volta para o menu, não para o fim do Módulo 01). */
  function anterior(id) {
    var t = TELAS[pos[id]];
    return t.voltarPara || TELAS[pos[id] - 1].id;
  }

  var primeiraTela = true;   // na abertura do curso o foco não é movido

  /* semHistorico = true quando a troca veio do botão "voltar/avançar" do navegador (não cria nova entrada no histórico). */
  function ir(id, estId, semHistorico) {
    if (!(id in pos)) { id = TELAS[0].id; }
    var t = TELAS[pos[id]];
    var mudouDeTela = estado.atual !== null && estado.atual !== id;
    estado.atual = id;
    estado.est = estId || null;
    estado.vistas[id] = 1;
    if (t.concluiAoVisitar) { estado.feitas[id] = 1; }
    desenhar(t, estado.est);
    /* acessibilidade: o título da aba acompanha a tela; os avisos de instrução são lidos quando mudam; o foco vai para o título */
    document.title = t.grupo + ' · ' + t.titulo + ' — Direitos Humanos Samarco';
    ['instrucao', 'instr'].forEach(function (n) { var p = document.getElementById(n); if (p) { p.setAttribute('aria-live', 'polite'); } });
    if (!primeiraTela && mudouDeTela) {
      var h = document.querySelector('#tela h1');
      if (h) { h.setAttribute('tabindex', '-1'); try { h.focus({ preventScroll: true }); } catch (x) { /* ignora */ } }
    }
    primeiraTela = false;
    /* Fundo expandido: a mesma arte continua para os lados/cima/baixo, atrás do palco de 1920x1080. */
    var fundo = document.querySelector('#tela img.fundo');
    var urlLargo = fundo ? fundo.getAttribute('src').replace(/fundo\.(jpg|png)$/, 'fundo-largo.jpg') : '';
    var meuDesenho = ++contagemTela;
    var vp = $('#viewport');
    /* Primeiro entra o fundo; só depois o conteúdo (texto, botões, barra) aparece, com uma transição suave. */
    vp.classList.add('espera');
    var revelar = function () {
      setTimeout(function () { if (meuDesenho === contagemTela) { vp.classList.remove('espera'); } }, 90);
    };
    if (fundo && CFG.FUNDO_EXPANDIDO && !CELULAR.matches && (CFG.FUNDOS_LARGOS || []).indexOf(urlLargo) > -1) {
      var feito = false;
      var aplicar = function (ok) {
        if (feito || meuDesenho !== contagemTela) { return; }   // já aplicado, ou o aluno foi para outra tela
        feito = true;
        if (ok) {
          var largo = document.createElement('img');
          largo.className = 'fundo-largo';
          largo.alt = '';
          largo.src = urlLargo;
          fundo.parentNode.insertBefore(largo, fundo);
          fundo.classList.add('substituido');
        }
        fundo.classList.remove('aguardando');
        revelar();
      };
      if (carregados[urlLargo]) { aplicar(true); }              // já estava carregado: o fundo entra na hora
      else {
        fundo.classList.add('aguardando');                      // o fundo antigo não aparece enquanto o novo carrega
        carregarImagem(urlLargo, aplicar);
        setTimeout(function () { aplicar(false); }, 8000);       // segurança: nunca deixa a tela sem conteúdo
      }
    } else {
      revelar();
    }
    $('#palco').classList.toggle('modo-escuro', $('#tela').classList.contains('escuro'));
    $('#palco').classList.toggle('capa-pagina', $('#tela').classList.contains('capa'));
    $('#palco').classList.toggle('fundo-celular-t9', $('#tela').classList.contains('fundo-celular-t9'));
    ajustarMobile();
    window.scrollTo(0, 0);
    /* cada tela nova entra no histórico: o botão "voltar" do navegador/celular volta uma tela em vez de sair do curso */
    try {
      var endereco = '#' + id + (estado.est ? '/' + estado.est : '');
      if (mudouDeTela && !semHistorico) { history.pushState(null, '', endereco); } else { history.replaceState(null, '', endereco); }
    } catch (e) { /* ignora */ }
    salvar();
    atualizarChrome();
  }

  function atualizarChrome() {
    var t = TELAS[pos[estado.atual]], i = pos[estado.atual];
    var voltar = $('#btnVoltar'), avancar = $('#btnAvancar');
    voltar.classList.toggle('oculto', t.voltar === false || i === 0);
    avancar.classList.toggle('oculto', t.avancar === false || i === TELAS.length - 1);
    avancar.classList.toggle('bloqueado', !estado.feitas[t.id]);
    avancar.setAttribute('aria-disabled', estado.feitas[t.id] ? 'false' : 'true');
    $('#barra').classList.toggle('oculto', t.barra === false);
    /* o contador conta as telas de cada módulo (ex.: Módulo 02 = "01 / 16") */
    var doGrupo = TELAS.filter(function (x) { return x.grupo === t.grupo; });
    $('#contador').textContent = pad(doGrupo.indexOf(t) + 1) + ' / ' + pad(doGrupo.length);
  }

  function avancarTela() {
    var t = TELAS[pos[estado.atual]];
    if (!estado.feitas[t.id]) {
      var b = $('#btnAvancar');
      b.classList.remove('tremer'); void b.offsetWidth; b.classList.add('tremer');
      aviso('Complete a atividade desta tela para avançar.');
      return;
    }
    ir(TELAS[pos[estado.atual] + 1].id);
  }

  function voltarTela() { ir(anterior(estado.atual)); }

  /* ---------------- índice (modo revisão) ---------------- */
  function montarIndice() {
    var h = '<div class="painel">' +
      '<div class="topo"><h2>Índice de telas</h2>' +
      '<p>' + (CFG.MODO_REVISAO ? 'Versão de revisão: clique em qualquer tela para ir direto até ela.' : 'Clique em uma tela liberada.') + '</p>' +
      '<button class="fechar" type="button" aria-label="Fechar o índice"><svg viewBox="0 0 24 24"><path d="M5 5l14 14M19 5 5 19"/></svg></button></div>' +
      '<div class="lista">';
    var grupoAtual = '';
    TELAS.forEach(function (t) {
      if (t.grupo !== grupoAtual) { grupoAtual = t.grupo; h += '<div class="grupo">' + GRUPOS[t.grupo].nome + '</div>'; }
      h += item(t.id, null, t.num, t.titulo + (t.tituloProvisorio ? ' (título provisório)' : ''),
                'Slide ' + t.slide + ' · ' + t.tipo, estado.atual === t.id && !estado.est, !!estado.feitas[t.id], liberada(t.id));
      if (t.estados) {
        h += '<div class="sub">';
        t.estados.forEach(function (e) {
          h += item(t.id, e.id, e.id, e.rotulo, 'Slide ' + e.slide, estado.atual === t.id && estado.est === e.id, false, liberada(t.id));
        });
        h += '</div>';
      }
    });
    h += '</div><div class="rodape"><div class="status" id="statusIndice"></div>';
    if (CFG.MODO_REVISAO) {
      h += '<button type="button" data-acao="todas">Marcar todas como concluídas (teste)</button>' +
           '<button type="button" data-acao="zerar">Reiniciar progresso</button>';
    }
    if (CFG.MODO_REVISAO && window.self === window.top && !CELULAR.matches) {
      h += '<button type="button" data-acao="celular">Ver versão celular</button>';
    }
    h += '<a href="design-system.html" target="_blank" rel="noopener">Ver design system</a></div></div>';

    var ind = $('#indice');
    ind.innerHTML = h;
    statusIndice();
  }

  function item(id, est, num, titulo, detalhe, atual, feita, livre) {
    return '<button type="button" class="item' + (atual ? ' atual' : '') + (feita ? ' feita' : '') + (livre ? '' : ' travada') +
      '" data-id="' + id + '"' + (est ? ' data-est="' + est + '"' : '') + '>' +
      '<span class="n">' + num + '</span><span class="t">' + titulo + '<small>' + detalhe + '</small></span>' +
      '<span class="c"></span></button>';
  }

  function statusIndice() {
    var s = $('#statusIndice');
    if (!s) { return; }
    var st = Scorm.obter('cmi.core.lesson_status') || 'not attempted';
    s.innerHTML = 'Telas concluídas: <b>' + totalFeitas() + ' de ' + TELAS.length + '</b><br>' +
      'Status enviado ao LMS: <b>' + st + '</b> · ' + (Scorm.lms ? 'LMS conectado' : 'sem LMS (progresso guardado neste navegador)');
  }

  /* ---------------- janela de ajuda (botão "?") ---------------- */
  var focoAntesDaAjuda = null;
  function abrirAjuda() {
    focoAntesDaAjuda = document.activeElement;
    var a = $('#ajuda');
    a.classList.add('aberto');
    a.setAttribute('aria-hidden', 'false');
    setTimeout(function () { var f = $('#ajuda .ajuda-fechar'); if (f) { f.focus(); } }, 60);
  }
  function fecharAjuda() {
    var a = $('#ajuda');
    if (!a.classList.contains('aberto')) { return; }
    a.classList.remove('aberto');
    a.setAttribute('aria-hidden', 'true');
    if (focoAntesDaAjuda && focoAntesDaAjuda.focus && document.body.contains(focoAntesDaAjuda)) { try { focoAntesDaAjuda.focus(); } catch (x) { /* ignora */ } }
  }

  var focoAntesDoIndice = null;

  function abrirIndice() {
    focoAntesDoIndice = document.activeElement;
    montarIndice();
    var ind = $('#indice');
    ind.classList.add('aberto');
    ind.setAttribute('aria-hidden', 'false');
    /* o foco vai para dentro do painel (quem usa teclado ou leitor de tela cai direto nele) */
    setTimeout(function () { var f = $('#indice .fechar'); if (f) { f.focus(); } }, 60);
  }

  /* Visão celular (só na versão de revisão): mostra o mesmo curso, na mesma tela, dentro de um celular em pé. */
  function abrirCelular() {
    if ($('#previaCel')) { return; }
    var endereco = location.href.split('#')[0] + '#' + estado.atual + (estado.est ? '/' + estado.est : '');
    var el = document.createElement('div');
    el.id = 'previaCel';
    el.innerHTML = '<div class="cel-aparelho"><iframe title="Visão celular" allow="fullscreen" allowfullscreen src="' + endereco + '"></iframe></div>' +
      '<button type="button" class="cel-fechar">✕ Fechar visão celular</button>';
    $('#palco').appendChild(el);
    el.addEventListener('click', function (e) { if (e.target === el || e.target.className === 'cel-fechar') { fecharCelular(); } });
  }
  function fecharCelular() { var el = $('#previaCel'); if (el) { el.parentNode.removeChild(el); } }

  /* semFoco = true quando o índice fecha porque o aluno foi para outra tela (o foco vai para o título dela). */
  function fecharIndice(semFoco) {
    var ind = $('#indice');
    var estavaAberto = ind.classList.contains('aberto');
    ind.classList.remove('aberto');
    ind.setAttribute('aria-hidden', 'true');
    if (estavaAberto && semFoco !== true && focoAntesDoIndice && focoAntesDoIndice.focus && document.body.contains(focoAntesDoIndice)) {
      try { focoAntesDoIndice.focus(); } catch (x) { /* ignora */ }
    }
  }

  /* Mantém o Tab dentro de um pop-up ou do índice enquanto estão abertos. */
  function prenderFoco(recipiente, e) {
    var itens = [].slice.call(recipiente.querySelectorAll('button, a[href], [tabindex]:not([tabindex="-1"])'))
      .filter(function (x) { return !x.disabled && x.offsetParent !== null; });
    if (!itens.length) { return; }
    var primeiro = itens[0], ultimo = itens[itens.length - 1], ativo = document.activeElement;
    if (!recipiente.contains(ativo)) { primeiro.focus(); e.preventDefault(); }
    else if (e.shiftKey && ativo === primeiro) { ultimo.focus(); e.preventDefault(); }
    else if (!e.shiftKey && ativo === ultimo) { primeiro.focus(); e.preventDefault(); }
  }

  function teclado(e) {
    if (e.key === 'Escape') { fecharAjuda(); fecharIndice(); fecharCelular(); return; }
    var popup = $('#tela .popup'), indiceAberto = $('#indice').classList.contains('aberto'), ajudaAberta = $('#ajuda').classList.contains('aberto');
    if (e.key === 'Tab') {
      if (ajudaAberta) { prenderFoco($('#ajuda'), e); }
      else if (popup) { prenderFoco(popup, e); }
      else if (indiceAberto) { prenderFoco($('#indice'), e); }
      return;
    }
    /* setas ← → do teclado voltam e avançam as telas (menos onde elas já têm outro uso) */
    if ((e.key === 'ArrowRight' || e.key === 'ArrowLeft') && !e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
      var alvo = e.target;
      if (alvo && /^(INPUT|TEXTAREA|SELECT|VIDEO|AUDIO)$/.test(alvo.tagName)) { return; }
      if (popup || indiceAberto || ajudaAberta || $('#previaCel') || document.getElementById('carVai')) { return; }
      var b = $(e.key === 'ArrowRight' ? '#btnAvancar' : '#btnVoltar');
      if (b.classList.contains('oculto')) { return; }
      e.preventDefault();
      if (e.key === 'ArrowRight') { avancarTela(); } else { voltarTela(); }
    }
  }

  function cliqueIndice(ev) {
    var alvo = ev.target;
    if (alvo === $('#indice')) { fecharIndice(); return; }             // clicou fora do painel
    var btn = alvo.closest ? alvo.closest('button, a') : null;
    if (!btn) { return; }
    if (btn.classList.contains('fechar')) { fecharIndice(); return; }
    var acao = btn.getAttribute('data-acao');
    if (acao === 'celular') { fecharIndice(); abrirCelular(); return; }
    if (acao === 'todas') { TELAS.forEach(function (t) { estado.feitas[t.id] = 1; }); salvar(); atualizarChrome(); montarIndice(); return; }
    if (acao === 'zerar') {
      estado.feitas = {}; estado.vistas = {};
      Scorm.definir('cmi.suspend_data', '');
      Scorm.definir('cmi.core.lesson_status', 'incomplete');   // botão de teste: volta ao zero de verdade
      ir(TELAS[0].id);
      montarIndice();
      return;
    }
    if (btn.classList.contains('item') && !btn.classList.contains('travada')) {
      ir(btn.getAttribute('data-id'), btn.getAttribute('data-est'));
      fecharIndice(true);
    }
  }

  /* ---------------- início ---------------- */
  function pegarDaUrl() {
    var h = (location.hash || '').replace('#', '');
    if (!h) { return null; }
    var p = h.split('/');
    return p[0] in pos ? { id: p[0], est: p[1] || null } : null;
  }

  function iniciar() {
    Scorm.iniciar();
    var st = Scorm.obter('cmi.core.lesson_status');
    if (!st || st === 'not attempted') { Scorm.status('incomplete'); }
    var salvo = carregar();

    ajustarEscala();
    window.addEventListener('resize', function () { ajustarEscala(); ajustarMobile(); });

    $('#btnAvancar').addEventListener('click', avancarTela);
    $('#btnVoltar').addEventListener('click', voltarTela);
    $('#btnCasa').addEventListener('click', function () { ir('a03'); });
    $('#btnIndice').addEventListener('click', abrirIndice);
    var rev = $('#btnIndiceRev');                       // atalho do índice só na versão de revisão
    if (CFG.MODO_REVISAO) { rev.addEventListener('click', abrirIndice); } else { rev.parentNode.removeChild(rev); }
    $('#btnAjuda').addEventListener('click', abrirAjuda);
    $('#ajuda').addEventListener('click', function (e) {
      if (e.target === $('#ajuda') || (e.target.closest && e.target.closest('.ajuda-fechar'))) { fecharAjuda(); }
    });
    $('#btnSair').addEventListener('click', function () {
      if (window.confirm('Deseja sair do curso? Seu progresso fica salvo.')) {
        Scorm.finalizar();
        try { window.close(); } catch (e) { /* ignora */ }
        /* algumas janelas não podem ser fechadas pelo curso: avisa o aluno */
        setTimeout(function () { aviso('Seu progresso foi salvo. Você já pode fechar esta janela.'); }, 400);
      }
    });
    $('#indice').addEventListener('click', cliqueIndice);
    document.addEventListener('keydown', teclado);
    /* botão "voltar/avançar" do navegador: troca de tela sem criar nova entrada no histórico (e respeita o travamento) */
    window.addEventListener('hashchange', function () {
      var u = pegarDaUrl();
      if (u && u.id !== estado.atual || (u && u.est !== estado.est)) {
        if (liberada(u.id)) { fecharIndice(true); ir(u.id, u.est, true); }
      }
    });
    window.addEventListener('beforeunload', function () { Scorm.finalizar(); });

    var u = pegarDaUrl();
    if (u && liberada(u.id)) { ir(u.id, u.est); }
    else if (salvo.c && salvo.c in pos) { ir(salvo.c, salvo.e || null); }
    else { ir(TELAS[0].id); }

    /* Carrega os fundos das outras telas em segundo plano, para a troca de tela ser instantânea. */
    if (CFG.FUNDO_EXPANDIDO && !CELULAR.matches) {
      setTimeout(function () { (CFG.FUNDOS_LARGOS || []).forEach(function (u) { carregarImagem(u, function () {}); }); }, 300);
    }
  }

  window.Curso = { ir: ir, abrirIndice: abrirIndice };
  /* Começa quando a página terminou de carregar (inclusive os scripts das telas). */
  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', iniciar); }
  else { setTimeout(iniciar, 0); }
})();
