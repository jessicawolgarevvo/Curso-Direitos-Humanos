/* Módulo 02 — peças que se repetem em várias telas (player de vídeo de marcação, textos fixos) */
(function () {
  'use strict';

  var POSTER = 'assets/img/intro/video-marcacao.jpg';
  var ICONES = {
    play: '<svg class="ic-play" viewBox="0 0 24 24"><path d="M7 4.5v15l12-7.5z"/></svg>',
    pausa: '<svg class="ic-pausa" viewBox="0 0 24 24"><path d="M6 4.5h4v15H6zM14 4.5h4v15h-4z"/></svg>',
    volume: '<svg viewBox="0 0 24 24"><path d="M3 9.5v5h4l5 4v-13l-5 4zM15.5 8.5a5 5 0 0 1 0 7M18 6a8.5 8.5 0 0 1 0 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M3 9.5v5h4l5 4v-13l-5 4z"/></svg>',
    tela: '<svg viewBox="0 0 24 24"><path d="M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  };

  window.M2 = {
    D: 'assets/img/m2/',
    /* Fundo das telas com player de vídeo: o mesmo da Abertura (tela 02). */
    FUNDO: 'assets/img/intro/fundo.jpg',
    /* Fundo dos quizzes: o mesmo da tela "Temas Prioritários" (Módulo 01, tela 08). */
    FUNDO_QUIZ: 'assets/img/m1/t8/fundo.png',

    /* Conteúdo da caixa de vídeo. Sem arquivo de vídeo: aparece o player de marcação. */
    videoHtml: function (src) {
      if (src) { return '<video class="poster" controls preload="metadata" poster="' + POSTER + '" src="' + src + '"></video>'; }
      return '<img class="poster" alt="Marcação: o vídeo será inserido aqui" src="' + POSTER + '">' +
        '<div class="controles">' +
          '<button type="button" class="btn-play" aria-label="Reproduzir vídeo">' + ICONES.play + ICONES.pausa + '</button>' +
          '<button type="button" tabindex="-1" aria-hidden="true">' + ICONES.volume + '</button>' +
          '<div class="trilho"><i></i></div><span class="tempo">0:00</span>' +
          '<button type="button" class="btn-tela" aria-label="Tela cheia">' + ICONES.tela + '</button>' +
        '</div>';
    },

    /* Liga o botão de tela cheia do player de marcação (o vídeo de verdade usa o botão do próprio navegador). */
    ligarTelaCheia: function (caixa) {
      var b = caixa.querySelector('.btn-tela');
      if (!b) { return; }
      b.addEventListener('click', function () {
        var d = document, f = d.fullscreenElement || d.webkitFullscreenElement;
        try {
          var p = f ? (d.exitFullscreen || d.webkitExitFullscreen).call(d)
                    : (caixa.requestFullscreen || caixa.webkitRequestFullscreen).call(caixa);
          if (p && p.catch) { p.catch(function () { /* aparelho ou LMS sem permissão de tela cheia: nada acontece */ }); }
        } catch (e) { /* aparelho sem suporte a tela cheia: nada acontece */ }
      });
    },

    /* Liga o player: chama aoTerminar() quando o vídeo acaba (ou 2,5 s depois do "play", no player de marcação). */
    ligarVideo: function (caixa, src, aoTerminar) {
      var terminou = function () { if (document.body.contains(caixa)) { aoTerminar(); } };
      if (src) { caixa.querySelector('video').addEventListener('ended', terminou); return; }
      var tempo = caixa.querySelector('.tempo');
      var play = caixa.querySelector('.btn-play');
      window.M2.ligarTelaCheia(caixa);
      /* convite suave: o botão de play "respira" até o aluno clicar */
      var conv = window.Convite.criar([play]);
      conv.atualizar(function () { return false; }, 1800);
      play.addEventListener('click', function () {
        conv.parar();
        if (caixa.classList.contains('tocando')) { return; }
        caixa.classList.add('tocando');
        tempo.textContent = '0:03';
        setTimeout(function () { caixa.classList.remove('tocando'); terminou(); }, 2500);
      });
    }
  };
})();
