/* Abertura · Tela 02 — Toda operação começa pelas pessoas (texto + vídeo) */
(function () {
  'use strict';
  window.RENDER = window.RENDER || {};
  var D = 'assets/img/intro/';

  /* Quando o vídeo existir, coloque o arquivo em assets/video/ e informe o caminho aqui.
     Vídeo do storyboard: 3822_Samarco_DireitosHumanos_Video01_Abertura_V02
     Enquanto estiver vazio, aparece o player de marcação e a tela conclui ao clicar em "play". */
  var VIDEO_SRC = '';

  var INSTRUCAO = 'Que tal conversar mais sobre a importância deste tema? Assista ao vídeo e vamos começar!';
  var AVANCE = 'Avance para a próxima tela.';

  var ICONES = {
    play: '<svg class="ic-play" viewBox="0 0 24 24"><path d="M7 4.5v15l12-7.5z"/></svg>',
    pausa: '<svg class="ic-pausa" viewBox="0 0 24 24"><path d="M6 4.5h4v15H6zM14 4.5h4v15h-4z"/></svg>',
    volume: '<svg viewBox="0 0 24 24"><path d="M3 9.5v5h4l5 4v-13l-5 4zM15.5 8.5a5 5 0 0 1 0 7M18 6a8.5 8.5 0 0 1 0 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M3 9.5v5h4l5 4v-13l-5 4z"/></svg>',
    tela: '<svg viewBox="0 0 24 24"><path d="M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  };

  window.RENDER.a02 = function (t, estadoId, ctx) {
    var el = ctx.tela;
    el.className = 'escuro';

    var midia = VIDEO_SRC
      ? '<video id="video" class="poster" controls preload="metadata" poster="' + D + 'video-marcacao.jpg" src="' + VIDEO_SRC + '"></video>'
      : '<img class="poster" alt="Marcação: o vídeo será inserido aqui" src="' + D + 'video-marcacao.jpg">' +
        '<div class="controles">' +
          '<button type="button" id="btnPlay" aria-label="Reproduzir vídeo">' + ICONES.play + ICONES.pausa + '</button>' +
          '<button type="button" tabindex="-1" aria-hidden="true">' + ICONES.volume + '</button>' +
          '<div class="trilho"><i></i></div>' +
          '<span class="tempo">0:00</span>' +
          '<button type="button" class="btn-tela" aria-label="Tela cheia">' + ICONES.tela + '</button>' +
        '</div>';

    el.innerHTML =
      '<img class="el fundo" alt="" src="' + D + 'fundo.jpg" style="--x:0px;--y:0px;--w:1920px;--h:1080px">' +
      '<div class="el coluna" style="--x:200px;--y:294px;--w:560px">' +
        '<h1 class="t-titulo" style="width:620px">Toda operação começa pelas pessoas</h1>' +
        '<p class="t-texto">Equipamentos, processos e tecnologia são fundamentais, mas nenhuma operação é verdadeiramente sustentável se não respeitar a dignidade, a segurança e os direitos das pessoas.</p>' +
        '<p class="t-texto">Neste treinamento, você verá como os Direitos Humanos fazem parte das decisões e atitudes do dia a dia de todos os empregados e empregadas da Samarco.</p>' +
        '<p id="instrucao" class="t-instrucao">' + (ctx.concluida() ? AVANCE : INSTRUCAO) + '</p>' +
      '</div>' +
      '<div id="caixaVideo" class="el video-caixa" style="--x:880px;--y:300px;--w:848px;--h:477px">' + midia + '</div>';

    function terminou() {
      ctx.concluir();
      document.getElementById('instrucao').textContent = AVANCE;
    }

    if (VIDEO_SRC) {
      document.getElementById('video').addEventListener('ended', terminou);
    } else {
      var caixa = document.getElementById('caixaVideo');
      window.M2.ligarTelaCheia(caixa);
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
