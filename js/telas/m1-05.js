/* Módulo 01 · Tela 05 — A nossa Política de Direitos Humanos (texto + imagem) */
(function () {
  'use strict';
  window.RENDER = window.RENDER || {};
  var D = 'assets/img/m1/t5/';

  window.RENDER['m1-05'] = function (t, estadoId, ctx) {
    var el = ctx.tela;
    el.className = 'escuro';

    el.innerHTML =
      '<img class="el fundo" alt="" src="' + D + 'fundo.png" style="--x:0px;--y:0px;--w:1920px;--h:1080px">' +
      '<img class="el" alt="Política de Direitos Humanos" src="' + D + 'selo.png" style="--x:960px;--y:126px;--w:742px;--h:763px">' +
      '<div class="el coluna" style="--x:200px;--y:232px;--w:660px">' +
        '<h1 class="t-titulo">A nossa Política de<br>Direitos Humanos</h1>' +
        '<div style="margin-top:46px">' +
          '<p class="t-texto">Você sabia que, em 2023, a Samarco lançou sua <strong>Política de Direitos Humanos</strong>? Ela reafirma o compromisso de respeitar os Direitos Humanos e estabelecer princípios e diretrizes para prevenir, mitigar e remediar impactos relacionados às suas atividades.</p>' +
          '<p class="t-texto" style="margin-top:32px">Esta política deve ser observada por empregados(as), terceiros(as) e fornecedores, reforçando a responsabilidade de todos e todas em conhecer, respeitar e colocar esses princípios em prática.</p>' +
        '</div>' +
        '<p class="t-instrucao" style="margin-top:48px">Você sabe quem são os detentores de Direitos Humanos? Avance para a próxima tela e descubra.</p>' +
      '</div>';

    /* Tela só de leitura: o storyboard não pede atividade nem trava a frase de avanço. */
    ctx.concluir();
  };
})();
