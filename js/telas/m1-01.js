/* Módulo 01 · Tela 01 — O que está por trás de cada decisão? (texto + imagem) */
(function () {
  'use strict';
  window.RENDER = window.RENDER || {};
  var D = 'assets/img/m1/t1/';

  /* Storyboard: a frase de avanço só aparece depois que todo o conteúdo foi lido.
     Como a tela não tem clique, ela aparece (e a tela conclui) depois deste tempo de leitura. */
  var TEMPO_LEITURA = 4000;

  window.RENDER['m1-01'] = function (t, estadoId, ctx) {
    var el = ctx.tela;
    el.className = '';
    var jaLida = ctx.concluida();

    el.innerHTML =
      '<img class="el fundo fundo-foto sem-foto-celular" alt="" src="' + D + 'fundo.jpg" style="--x:0px;--y:0px;--w:1920px;--h:1080px">' +
      '<div class="el coluna" style="--x:200px;--y:210px;--w:560px">' +
        '<p class="t-rotulo">MÓDULO 1</p>' +
        '<h1 class="t-titulo" style="margin-top:5px;width:664px">O que está por trás<br>de cada decisão?</h1>' +
        '<div style="margin-top:31px">' +
          '<p class="t-texto">Antes de entender como os Direitos Humanos estão presentes no nosso dia a dia, é importante <strong>conhecer o que eles significam e por que são tão importantes</strong>.</p>' +
          '<p class="t-texto" style="margin-top:28px">Neste módulo, você vai conhecer os <strong>princípios que orientam a atuação da Samarco</strong> e entender como eles contribuem para relações, decisões e atitudes baseadas no respeito, na dignidade e na responsabilidade.</p>' +
        '</div>' +
        '<div class="caixa-destaque" style="margin-top:41px;margin-left:-10px;width:568px">O primeiro passo é compreender o significado dos Direitos Humanos.</div>' +
        '<p id="instr" class="t-instrucao aparece' + (jaLida ? ' visivel' : '') + '" style="margin-top:37px">Avance para a próxima tela e descubra.</p>' +
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
