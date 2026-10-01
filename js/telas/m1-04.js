/* Módulo 01 · Tela 04 — Por que esse tema é tão importante para a Samarco? (texto + podcast) */
(function () {
  'use strict';
  window.RENDER = window.RENDER || {};
  var D = 'assets/img/m1/t4/';

  /* Quando o podcast existir, coloque o áudio em assets/audio/ e informe o caminho aqui.
     Arquivo do storyboard: 3822_Samarco_DireitosHumanos_Podcast01_Modulo01_V01
     Vazio = player de marcação (a tela conclui ao clicar em "play"). */
  var AUDIO_SRC = '';

  var INSTRUCAO = 'Ajuste o volume e ouça nosso podcast!';
  var AVANCE = 'Avance para a próxima tela.';

  var ICONES = {
    play: '<svg class="ic-play" viewBox="0 0 24 24"><path d="M7 4.5v15l12-7.5z"/></svg>',
    pausa: '<svg class="ic-pausa" viewBox="0 0 24 24"><path d="M6 4.5h4v15H6zM14 4.5h4v15h-4z"/></svg>',
    volume: '<svg viewBox="0 0 24 24"><path d="M3 9.5v5h4l5 4v-13l-5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18 6a8.5 8.5 0 0 1 0 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>'
  };

  window.RENDER['m1-04'] = function (t, estadoId, ctx) {
    var el = ctx.tela;
    el.className = 'escuro';

    var player = AUDIO_SRC
      ? '<audio id="audio" controls preload="metadata" src="' + AUDIO_SRC + '"></audio>'
      : '<button type="button" id="btnPlay" aria-label="Reproduzir podcast">' + ICONES.play + ICONES.pausa + '</button>' +
        '<button type="button" tabindex="-1" aria-hidden="true">' + ICONES.volume + '</button>' +
        '<div class="trilho"><i></i></div><span class="tempo">0:00</span>';

    el.innerHTML =
      '<img class="el fundo fundo-foto sem-foto-celular" alt="" src="' + D + 'fundo.jpg" style="--x:0px;--y:0px;--w:1920px;--h:1080px">' +
      '<div class="el coluna" style="--x:200px;--y:282px;--w:560px">' +
        '<h1 class="t-titulo" style="width:720px">Por que esse tema é tão<br>importante para a Samarco?</h1>' +
        '<div style="margin-top:37px">' +
          '<p class="t-texto">Depois de conhecer os principais conceitos sobre Direitos Humanos, fica bem mais fácil entender por que esse compromisso faz parte da atuação da Samarco.</p>' +
          '<p class="t-texto" style="margin-top:33px">Em primeiro lugar, porque ele reflete um dos nossos principais valores. Mas vai além disso: é também uma questão de estratégia, responsabilidade e sustentabilidade do negócio. Vamos conversar mais sobre isso?</p>' +
        '</div>' +
        '<p id="instrucao" class="t-instrucao" style="margin-top:47px">' + (ctx.concluida() ? AVANCE : INSTRUCAO) + '</p>' +
      '</div>' +
      '<div id="caixaAudio" class="el audio-caixa" style="--x:881px;--y:720px;--w:775px;--h:55px">' + player + '</div>' +
      /* só aparece no celular em pé (no computador o fundo da tela já traz a imagem do podcast) */
      '<img class="somente-celular" alt="" src="' + D + 'podcast-mobile.png">';

    function terminou() {
      ctx.concluir();
      document.getElementById('instrucao').textContent = AVANCE;
    }

    if (AUDIO_SRC) {
      document.getElementById('audio').addEventListener('ended', terminou);
    } else {
      var caixa = document.getElementById('caixaAudio');
      var tempo = caixa.querySelector('.tempo');
      var trilho = caixa.querySelector('.trilho i');
      var conv = window.Convite.criar([document.getElementById('btnPlay')]);   // convite suave: o play "respira" até o clique
      if (!ctx.concluida()) { conv.atualizar(function () { return false; }, 1800); }
      document.getElementById('btnPlay').addEventListener('click', function () {
        conv.parar();
        if (caixa.classList.contains('tocando')) { return; }
        caixa.classList.add('tocando');
        tempo.textContent = '0:03';
        setTimeout(function () {
          caixa.classList.remove('tocando');
          terminou();
        }, 2500);
      });
    }
  };
})();
