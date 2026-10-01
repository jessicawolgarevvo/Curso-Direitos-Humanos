/* Módulo 02 · Tela 01 — Da teoria à prática (texto e imagem) */
(function () {
  'use strict';
  window.RENDER = window.RENDER || {};
  var D = 'assets/img/m2/t1/';

  /* Storyboard: a frase de avanço só aparece depois que todo o conteúdo foi lido.
     Como a tela não tem clique, ela aparece (e a tela conclui) depois deste tempo de leitura. */
  var TEMPO_LEITURA = 4000;

  window.RENDER['m2-01'] = function (t, estadoId, ctx) {
    var el = ctx.tela;
    el.className = '';
    var jaLida = ctx.concluida();

    el.innerHTML =
      '<img class="el fundo" alt="" src="' + D + 'fundo.jpg" style="--x:0px;--y:0px;--w:1920px;--h:1080px">' +
      '<div class="el recorte-pessoas" style="--x:833px;--y:115px;--w:1017px;--h:965px"><img alt="" src="' + D + 'pessoas.png"></div>' +
      '<div class="el coluna" style="--x:200px;--y:272px;--w:580px">' +
        '<p class="t-rotulo">MÓDULO 2</p>' +
        '<h1 class="t-titulo" style="margin-top:12px">Da teoria à prática</h1>' +
        '<div style="margin-top:18px">' +
          '<p class="t-texto">Você já conhece os conceitos e os princípios que orientam os Direitos Humanos. Agora é hora de ver como eles se refletem nas decisões e atitudes do dia a dia.</p>' +
          '<p class="t-texto" style="margin-top:38px">Ao longo deste módulo, você encontrará relatos de situações práticas para analisar, refletir e identificar as condutas mais adequadas em diferentes contextos.</p>' +
        '</div>' +
        '<div class="chips-m2" style="margin-top:23px">' +
          '<span class="chip-m2"><img alt="" src="' + D + 'analisar.png">Analisar</span>' +
          '<span class="chip-m2"><img alt="" src="' + D + 'refletir.png">Refletir</span>' +
          '<span class="chip-m2"><img alt="" src="' + D + 'identificar-condutas.png">Identificar</span>' +
        '</div>' +
        '<p id="instr" class="t-instrucao aparece' + (jaLida ? ' visivel' : '') + '" style="margin-top:24px">Vamos colocar esse conhecimento em prática? Avance para a próxima tela para começar!</p>' +
      '</div>';

    if (!jaLida) {
      var alvo = document.getElementById('instr');
      setTimeout(function () {
        if (!document.body.contains(alvo)) { return; }   // o aluno já saiu da tela
        alvo.classList.add('visivel');
        ctx.concluir();
      }, TEMPO_LEITURA);
    }
  };
})();
