/* Módulo 01 · Tela 09 — O que vimos aqui? (texto + botão "Menu") */
(function () {
  'use strict';
  window.RENDER = window.RENDER || {};
  var D = 'assets/img/m1/t9/';

  window.RENDER['m1-09'] = function (t, estadoId, ctx) {
    var el = ctx.tela;
    el.className = 'fundo-celular-t9';   /* no celular em pé, o fundo vem da própria página (ver estilo.css) */

    el.innerHTML =
      '<img class="el fundo fundo-foto sem-foto-celular" alt="" src="' + D + 'fundo.jpg" style="--x:0px;--y:0px;--w:1920px;--h:1080px">' +
      '<div class="el coluna" style="--x:200px;--y:137px;--w:650px">' +
        '<h1 class="t-titulo">O que vimos aqui?</h1>' +
        '<div style="margin-top:16px">' +
          '<p class="t-texto">Neste módulo, você compreendeu <strong>o que são os Direitos Humanos</strong>, por que eles são fundamentais para a atuação da Samarco e como orientam nossas relações, decisões e atividades.</p>' +
          '<p class="t-texto" style="margin-top:36px">Você também conheceu os principais referenciais sobre o tema, a Política de Direitos Humanos da Samarco, a importância da devida diligência e os públicos que podem ser impactados pelas nossas ações.</p>' +
        '</div>' +
        '<div class="caixa-temas" style="margin-top:26px">No próximo módulo, vamos nos aprofundar em três dos temas prioritários, essenciais para o nosso dia a dia:' +
          '<ul><li>Trabalho decente;</li><li>Práticas abusivas e discriminatórias;</li><li>Qualidade de vida, saúde e segurança das comunidades anfitriãs.</li></ul></div>' +
        '<p class="t-instrucao" style="margin-top:25px;margin-left:-11px">Clique em “Menu” para avançar no seu treinamento.</p>' +
        '<button type="button" id="btnMenu" class="btn-img" aria-label="Menu" style="position:relative;margin-top:22px;margin-left:-12px;width:145px;height:50px">' +
          '<img alt="" src="' + D + 'btn_menu_n.png"><img class="h" alt="" src="' + D + 'btn_menu_h.png"></button>' +
      '</div>';

    document.getElementById('btnMenu').addEventListener('click', function () {
      ctx.concluir();
      ctx.ir('a03');
    });
  };
})();
