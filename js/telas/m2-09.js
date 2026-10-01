/* Módulo 02 · Tela 09 (e 09.1) — Respeito às comunidades anfitriãs (texto + 4 cards que viram) */
(function () {
  'use strict';
  window.RENDER = window.RENDER || {};
  var D = 'assets/img/m2/t9/';
  var FUNDO = 'assets/img/m2/t1/fundo.jpg';   // mesmo fundo claro da tela 01

  var INSTRUCAO = 'Explore os cards e conheça atitudes que fortalecem uma convivência responsável com as comunidades anfitriãs.';
  var AVANCE = 'Avance para a próxima tela.';

  /* Ordem dos cards: a do Figma (da esquerda para a direita) */
  var CARDS = [
    { x: 212,  foto: 'foto1.jpg', pos: '93% 50%', rotulo: 'Respeito à população local',
      verso: 'Valorizar as pessoas, os costumes e a cultura das comunidades, mantendo relações pautadas no diálogo, na cordialidade e no respeito.' },
    { x: 603,  foto: 'foto2.jpg', rotulo: 'Combate ao abuso e à exploração sexual de crianças e adolescentes',
      verso: 'Repudiar e denunciar qualquer suspeita ou ocorrência de violência, abuso ou exploração de crianças e adolescentes, utilizando os canais da Samarco e os canais públicos disponíveis, como o <strong>Disque 100.</strong>' },
    { x: 988,  foto: 'foto3.jpg', rotulo: 'Condução responsável',
      verso: 'Dirigir de forma segura, respeitando as leis de trânsito, os limites de velocidade e priorizando a segurança das comunidades por onde circulamos.' },
    { x: 1373, foto: 'foto4.jpg', rotulo: 'Convivência respeitosa',
      verso: 'Nas moradias disponibilizadas ou contratadas pela empresa, assegurar uma convivência harmoniosa, com respeito à vizinhança, aos espaços comuns e à comunidade local.' }
  ];

  window.RENDER['m2-09'] = function (t, estadoId, ctx) {
    var el = ctx.tela;
    el.className = '';

    /* Os cards sempre começam na frente e viram ao clicar. Só o estado 09.1, aberto pelo índice, mostra os quatro virados. */
    var todosVirados = estadoId === '09.1';
    var fraseFinal = todosVirados || ctx.concluida();

    var cards = CARDS.map(function (c, i) {
      return '<button type="button" class="el flip2' + (todosVirados ? ' virado' : '') + '" data-i="' + i + '" aria-pressed="' + todosVirados + '" ' +
        'aria-label="' + c.rotulo + '. ' + c.verso.replace(/<[^>]+>/g, '') + '" style="--x:' + c.x + 'px;--y:460px;--w:336px;--h:464px">' +
        '<span class="in">' +
          '<span class="face frente"><img class="foto" alt="" src="' + D + c.foto + '" style="object-position:' + (c.pos || '50% 50%') + '"><span class="rot">' + c.rotulo + '</span></span>' +
          '<span class="face verso"><img class="foto" alt="" src="' + D + c.foto + '" style="object-position:' + (c.pos || '50% 50%') + '"><span class="txt"><span>' + c.verso + '</span></span></span>' +
        '</span></button>';
    }).join('');

    el.innerHTML =
      '<img class="el fundo" alt="" src="' + FUNDO + '" style="--x:0px;--y:0px;--w:1920px;--h:1080px">' +
      '<div class="faixa-cinza" aria-hidden="true"></div>' +
      '<div class="el coluna centro" style="--x:360px;--y:111px;--w:1200px">' +
        '<h1 class="t-titulo">Respeito às comunidades anfitriãs</h1>' +
        '<div style="margin-top:19px">' +
          '<p class="t-texto">Nossa responsabilidade vai além dos limites da empresa. Ela também está presente na forma como convivemos com as comunidades onde atuamos.</p>' +
          '<p class="t-texto" style="margin-top:32px">Nossas atitudes, dentro e fora do ambiente de trabalho, refletem o compromisso da empresa com o respeito aos direitos humanos, às pessoas, aos costumes locais e aos espaços compartilhados.</p>' +
        '</div>' +
        '<p id="instrucao" class="t-instrucao" style="margin-top:33px">' + (fraseFinal ? AVANCE : INSTRUCAO) + '</p>' +
      '</div>' + cards;

    var vistos = {};

    /* convite suave: o próximo card ainda não virado "respira" (fundo claro: brilho azul) */
    var conv = window.Convite.criar([].slice.call(el.querySelectorAll('.flip2')), { claro: true });
    var convidar = function (atraso) { conv.atualizar(function (k) { return vistos[k]; }, atraso); };
    if (!fraseFinal) { convidar(1600); }

    el.querySelectorAll('.flip2').forEach(function (b) {
      b.addEventListener('click', function () {
        var i = b.getAttribute('data-i');
        var virado = b.classList.toggle('virado');
        b.setAttribute('aria-pressed', virado);
        if (virado) { vistos[i] = true; }
        convidar(900);
        if (Object.keys(vistos).length === CARDS.length) {
          document.getElementById('instrucao').textContent = AVANCE;
          ctx.concluir();
        }
      });
    });
  };
})();
