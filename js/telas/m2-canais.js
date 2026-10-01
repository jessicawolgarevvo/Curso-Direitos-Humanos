/* Módulo 02 · Telas 13, 14 e 15 — Canais da Samarco: visão geral, Canal de Ética e Ouvidoria Social */
(function () {
  'use strict';
  window.RENDER = window.RENDER || {};

  /* Como em m1-01: a frase de avanço aparece depois de um tempo de leitura, e a tela conclui. */
  var TEMPO_LEITURA = 4000;
  var AVANCE = 'Avance para a próxima tela.';

  function lerEConcluir(ctx, seletor) {
    var alvo = document.querySelector(seletor);
    if (ctx.concluida()) { alvo.classList.add('visivel'); return; }
    setTimeout(function () {
      if (!document.body.contains(alvo)) { return; }   // o aluno já saiu da tela
      alvo.classList.add('visivel');
      ctx.concluir();
    }, TEMPO_LEITURA);
  }

  /* ---------- Tela 13: visão geral dos canais ---------- */
  window.RENDER['m2-13'] = function (t, estadoId, ctx) {
    var el = ctx.tela;
    el.className = 'escuro';
    var D = 'assets/img/m2/t13/';

    el.innerHTML =
      '<img class="el fundo" alt="" src="' + D + 'fundo.jpg" style="--x:0px;--y:0px;--w:1920px;--h:1080px">' +
      /* o homem sentado (só no computador; no celular a tela fica sem ele) */
      '<div class="el recorte-pessoas so-desktop" style="--x:0px;--y:0px;--w:900px;--h:1080px"><img alt="" src="' + D + 'homem.png" style="width:1272px;max-width:none;margin-left:-123px"></div>' +
      '<div class="el canais-chamada" style="--x:1020px;--y:169px;--w:800px">' +
        '<h1 class="grande">Ao longo deste treinamento, orientamos que, sempre que necessário, sejam utilizados os canais da Samarco. Mas quais são esses canais?</h1>' +
        '<p id="instr" class="pequena aparece">Avance para a próxima tela para conhecer mais sobre eles.</p>' +
      '</div>' +
      '<div class="el canais-botoes" style="--x:0px;--y:0px;--w:0px;--h:0px">' +
        '<div class="canal-item" style="left:1090px;top:449px"><div class="bolinha"><img alt="" src="' + D + 'canal-etica.png"></div>Canal de Ética</div>' +
        '<div class="canal-item" style="left:1420px;top:449px"><div class="bolinha"><img alt="" src="' + D + 'ouvidoria.png"></div>Ouvidoria Social da Samarco</div>' +
      '</div>';

    lerEConcluir(ctx, '#instr');
  };

  /* ---------- Tela 14: Canal de Ética ---------- */
  window.RENDER['m2-14'] = function (t, estadoId, ctx) {
    var el = ctx.tela;
    el.className = 'escuro';
    var D = 'assets/img/m2/t14/';

    el.innerHTML =
      '<img class="el fundo" alt="" src="' + D + 'fundo.jpg" style="--x:0px;--y:0px;--w:1920px;--h:1080px">' +
      '<img class="el so-desktop" alt="" src="' + D + 'bracos.png" style="--x:674px;--y:115px;--w:1437px;--h:1796px">' +
      '<div class="el cartao-contato" style="--x:170px;--y:164px;--w:969px;--h:675px">' +
        '<h1 style="top:50px">Canal de Ética Samarco</h1>' +
        '<p style="top:131px;width:850px">Você conhece nosso Canal de Ética? Ele é um espaço para formalizar relatos sobre condutas que possam violar o nosso <a href="https://www.samarco.com/wp-content/uploads/2023/09/codigo-de-Conduta-Samarco2023.pdf" target="_blank" rel="noopener" style="color:inherit;font-weight:700">Código de Conduta</a>, leis em vigor, procedimentos ou políticas da empresa ou obrigações institucionais.</p>' +
        '<p style="top:249px;width:850px">Pode ser acessado por qualquer pessoa, dentro ou fora da empresa, das seguintes formas:</p>' +
        '<div class="linha-contato" style="top:325px"><img alt="" src="' + D + 'phone-call.png"><span>0800 377 8002</span></div>' +
        '<div class="linha-contato" style="top:416px"><img alt="" src="' + D + 'mail.png"><a href="mailto:canaldeetica@samarco.com">canaldeetica@samarco.com</a></div>' +
        '<div class="linha-contato" style="top:507px"><img alt="" src="' + D + 'website.png"><a href="https://www.canaldeetica.com.br/samarco" target="_blank" rel="noopener">www.canaldeetica.com.br/samarco</a></div>' +
        '<p id="instr" class="t-instrucao aparece" style="top:602px;left:60px">' + AVANCE + '</p>' +
      '</div>';

    lerEConcluir(ctx, '#instr');
  };

  /* ---------- Tela 15: Ouvidoria Social ---------- */
  window.RENDER['m2-15'] = function (t, estadoId, ctx) {
    var el = ctx.tela;
    el.className = 'escuro';
    var D = 'assets/img/m2/t15/', D14 = 'assets/img/m2/t14/';

    el.innerHTML =
      '<img class="el fundo" alt="" src="' + D14 + 'fundo.jpg" style="--x:0px;--y:0px;--w:1920px;--h:1080px">' +
      '<div class="el cartao-contato" style="--x:169px;--y:67px;--w:1332px;--h:787px">' +
        '<h1 style="top:50px">Ouvidoria Social Samarco</h1>' +
        '<p style="top:133px;width:850px">A nossa Ouvidoria Social é responsável por criar um canal permanente para as manifestações das comunidades anfitriãs e vizinhas da Samarco, assegurando o respeito aos seus direitos.</p>' +
        '<p style="top:249px;width:850px">Pode ser acessada das seguintes formas:</p>' +
        '<div class="linha-contato linha-alta" style="top:319px"><img alt="" src="' + D14 + 'phone-call.png"><span class="linha-txt"><span class="num">0800 721 0717</span> <span class="peq">(atendimento das 7h às 19h, de segunda-feira a sexta-feira. Após este horário, o atendimento será realizado por secretária eletrônica)</span></span></div>' +
        '<div class="linha-contato" style="top:411px"><img alt="" src="' + D + 'whatsapp.png"><span>WhatsApp (31) 98440-3156</span></div>' +
        '<div class="linha-contato" style="top:501px"><img alt="" src="' + D14 + 'mail.png"><a href="mailto:ouvidoriasocial@samarco.com">ouvidoriasocial@samarco.com</a></div>' +
        '<div class="linha-contato" style="top:589px"><img alt="" src="' + D14 + 'website.png"><a href="https://canalconfidencial.com.br/ouvidoriasocial/" target="_blank" rel="noopener">https://canalconfidencial.com.br/ouvidoriasocial/</a></div>' +
        '<p id="instr" class="t-instrucao aparece" style="top:707px;left:60px">' + AVANCE + '</p>' +
      '</div>' +
      /* a moça fica por cima da caixa branca (a caixa continua por trás dela, como no Figma); só no computador */
      '<img class="el so-desktop" alt="" src="' + D + 'mulher.png" style="--x:1166px;--y:18px;--w:857px;--h:1071px">';

    lerEConcluir(ctx, '#instr');
  };
})();
