/* Módulo 01 · Tela 03 (e 03.1) — Princípios orientadores da ONU (texto + 3 cards que viram) */
(function () {
  'use strict';
  window.RENDER = window.RENDER || {};
  var D = 'assets/img/m1/t3/';

  /* A frase muda quando o aluno vira os três cards (slide 7 -> slide 8 do storyboard). */
  var FRASE_INICIAL = 'Explore os cards e conheça os três pilares que compõem os Princípios Orientadores.';
  var FRASE_FINAL = 'Avance para a próxima tela.';

  var CARDS = [
    { x: 174,  rotulo: 'Proteger (Estado)',            verso: 'Os governos devem proteger as pessoas contra abusos de Direitos Humanos.' },
    { x: 705,  rotulo: 'Respeitar (Empresas)',         verso: 'As empresas devem evitar causar ou contribuir para impactos negativos e atuar para preveni-los.' },
    { x: 1235, rotulo: 'Remediar (acesso à reparação)', verso: 'Quando houver impactos, deve existir acesso a mecanismos de reparação para as pessoas afetadas.' }
  ];

  window.RENDER['m1-03'] = function (t, estadoId, ctx) {
    var el = ctx.tela;
    el.className = '';

    /* Os cards sempre começam SEM texto (frente) e viram ao clicar.
       Só o estado 03.1, aberto pelo índice de revisão, mostra os três já virados. */
    var todosVirados = estadoId === '03.1';
    var fraseFinal = todosVirados || ctx.concluida();

    var cards = CARDS.map(function (c, i) {
      var n = i + 1;
      return '<button type="button" class="el flip' + (todosVirados ? ' virado' : '') + '" data-i="' + i + '" aria-pressed="' + todosVirados + '" ' +
        'aria-label="' + c.rotulo + '. ' + c.verso + '" style="--x:' + c.x + 'px;--y:565px;--w:511px;--h:313px;--ar:511/313">' +
        '<span class="in">' +
          /* frente: foto da imagem + rótulo verde com o texto do storyboard */
          '<span class="face frente"><img class="base" alt="" src="' + D + 'card' + n + '_frente.png"><span class="rot">' + c.rotulo + '</span></span>' +
          /* verso: a mesma foto escurecida em azul, com a frase do storyboard */
          '<span class="face verso"><img class="base" alt="" src="' + D + 'card' + n + '_frente.png">' +
            '<span class="veu" style="-webkit-mask-image:url(' + D + 'card' + n + '_frente.png);mask-image:url(' + D + 'card' + n + '_frente.png)"></span>' +
            '<span class="txt">' + c.verso + '</span><span class="rot">' + c.rotulo + '</span></span>' +
        '</span></button>';
    }).join('');

    el.innerHTML =
      '<img class="el fundo" alt="" src="' + D + 'fundo.png" style="--x:0px;--y:0px;--w:1920px;--h:1080px">' +
      '<div class="el coluna centro" style="--x:140px;--y:203px;--w:1640px">' +
        '<h1 class="t-titulo">Princípios orientadores da ONU</h1>' +
        '<div style="margin-top:18px">' +
          '<p class="t-texto">Você já ouviu falar nos Princípios Orientadores da ONU sobre Empresas e Direitos Humanos? Eles são a principal referência internacional para orientar as empresas sobre como devem prevenir, respeitar e tratar impactos sobre os Direitos Humanos.</p>' +
          '<p class="t-texto" style="margin-top:28px">Aprovados em 2011, eles estabelecem que o respeito aos Direitos Humanos não é apenas uma responsabilidade dos Estados. As empresas também têm o dever de prevenir, mitigar e reparar impactos negativos sobre as pessoas decorrentes de suas atividades e relações de negócio.</p>' +
        '</div>' +
        '<p id="instrucao" class="t-instrucao" style="margin-top:34px">' + (fraseFinal ? FRASE_FINAL : FRASE_INICIAL) + '</p>' +
      '</div>' + cards;

    var vistos = {};

    /* convite suave: o próximo card ainda não virado "respira" (fundo claro: brilho azul) */
    var conv = window.Convite.criar([].slice.call(el.querySelectorAll('.flip')), { claro: true });
    var convidar = function (atraso) { conv.atualizar(function (k) { return vistos[k]; }, atraso); };
    if (!fraseFinal) { convidar(1600); }

    el.querySelectorAll('.flip').forEach(function (b) {
      b.addEventListener('click', function () {
        var i = b.getAttribute('data-i');
        var virado = b.classList.toggle('virado');
        b.setAttribute('aria-pressed', virado);
        if (virado) { vistos[i] = true; }
        convidar(900);
        if (Object.keys(vistos).length === CARDS.length) {
          document.getElementById('instrucao').textContent = FRASE_FINAL;
          ctx.concluir();
        }
      });
    });
  };
})();
