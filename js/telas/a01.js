/* Abertura · Tela 01 — Boas-vindas ao treinamento sobre Direitos Humanos (capa) */
(function () {
  'use strict';
  window.RENDER = window.RENDER || {};
  var D = 'assets/img/capa/';

  window.RENDER.a01 = function (t, estadoId, ctx) {
    var el = ctx.tela;
    el.className = 'escuro capa';
    el.innerHTML =
      '<img class="el fundo" alt="" src="' + D + 'fundo.jpg" style="--x:0px;--y:0px;--w:1920px;--h:1080px">' +
      /* só no celular em pé: fundo sem pessoas + a mulher sozinha, centralizada */
      '<img class="cel-fundo" alt="" src="' + D + 'fundo-celular.jpg">' +
      '<img class="cel-mulher" alt="" src="' + D + 'mulher-celular.png">' +
      '<h1 class="sr-only">Boas-vindas ao treinamento sobre Direitos Humanos</h1>' +
      '<img class="el" alt="Direitos Humanos" src="' + D + 'titulo.png" style="--x:40px;--y:450px;--w:600px;--h:260px">' +
      '<img class="el" alt="Selo da Política de Direitos Humanos" src="' + D + 'selo.png" style="--x:1659px;--y:20px;--w:235px;--h:243px">' +
      '<button type="button" id="btnIniciar" class="el btn-img" aria-label="Clique aqui para iniciar" style="--x:215px;--y:735px;--w:249px;--h:79px;--ar:249/79">' +
        '<img alt="" src="' + D + 'btn_iniciar_n.png"><img class="h" alt="" src="' + D + 'btn_iniciar_h.png">' +
      '</button>';

    /* convite suave: o botão "Iniciar" respira até o clique */
    var conv = window.Convite.criar([document.getElementById('btnIniciar')]);
    conv.atualizar(function () { return false; }, 1800);

    document.getElementById('btnIniciar').addEventListener('click', function () {
      conv.parar();
      ctx.concluir();
      ctx.ir('a02');
    });
  };
})();
