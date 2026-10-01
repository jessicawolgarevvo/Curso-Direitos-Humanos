/* Abertura · Tela 03 — Como os Direitos Humanos fazem parte do nosso dia a dia? (menu) */
(function () {
  'use strict';
  window.RENDER = window.RENDER || {};
  var D = 'assets/img/menu/';

  window.RENDER.a03 = function (t, estadoId, ctx) {
    var el = ctx.tela;
    el.className = 'escuro';

    /* O card do módulo mostra o visual "concluído" (com o check) quando o aluno terminou o módulo. */
    function card(numero, x, nome) {
      /* marcado como visitado ao concluir o módulo; no Módulo 02, basta ter chegado à última tela */
      var pronto = ctx.moduloConcluido('Módulo 0' + numero) || (numero === '2' && ctx.vista('m2-16'));
      return '<button type="button" class="el card-modulo" data-modulo="' + numero + '" aria-label="' + nome + '" ' +
        'style="--x:' + x + 'px;--y:354px;--w:541px;--h:583px;--ar:541/583">' +
        '<img alt="" src="' + D + 'btn_mod' + numero + '_' + (pronto ? 'v' : 'n') + '.png">' +
        '<img class="h" alt="" src="' + D + 'btn_mod' + numero + '_h.png">' +
      '</button>';
    }

    el.innerHTML =
      '<img class="el fundo" alt="" src="' + D + 'fundo.jpg" style="--x:0px;--y:0px;--w:1920px;--h:1080px">' +
      '<div class="el coluna centro" style="--x:210px;--y:128px;--w:1500px">' +
        '<h1 class="t-titulo">Menu</h1>' +
        '<p class="t-texto" style="margin-top:18px;width:1067px;margin-left:auto;margin-right:auto">Ao longo dos próximos módulos, você descobrirá como decisões, relações e atitudes do cotidiano podem fortalecer o respeito, a dignidade e a segurança das pessoas na Samarco.</p>' +
      '</div>' +
      card('1', 392, 'Módulo 01: Os Direitos Humanos na Samarco. Iniciar') +
      card('2', 987, 'Módulo 02: Decisões que fazem a diferença. Iniciar');

    el.querySelector('[data-modulo="1"]').addEventListener('click', function () { ctx.ir('m1-01'); });
    el.querySelector('[data-modulo="2"]').addEventListener('click', function () { ctx.ir('m2-01'); });
  };
})();
