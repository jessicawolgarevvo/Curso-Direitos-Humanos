/* Módulo 02 · Quizzes: 04 (e 04.1), 08 (e 08.1) e 11 (e 11.1)
   O aluno escolhe A ou B; o cartão fica verde (certa) ou rosa (errada) e abre o vídeo de feedback da escolha. */
(function () {
  'use strict';
  window.RENDER = window.RENDER || {};

  var PERGUNTA = 'Diante dessa situação, qual é a atitude mais adequada?';
  var CHAMADA = 'Com base no que você aprendeu neste treinamento até agora, escolha um caminho e, em seguida, confira o feedback.';

  /* Vídeos de feedback (storyboard: arquivos StudyCase01/02/03). Vazio = player de marcação. */
  var QUIZZES = {
    'm2-04': { estado: '04.1', videos: { certa: '', errada: '' }, opcoes: [
      { letra: 'A', certa: false, texto: 'Seguir a rotina normalmente, já que a atividade precisava ser concluída e essas situações podem acontecer em dias mais difíceis.' },
      { letra: 'B', certa: true,  texto: 'Conversar com a liderança ou buscar o Canal de Ética para relatar a situação de forma responsável, contribuindo para que as condições sejam avaliadas e tratadas.' } ] },
    'm2-08': { estado: '08.1', videos: { certa: '', errada: '' }, opcoes: [
      { letra: 'A', certa: true,  texto: 'Comunicar a situação à liderança ou utilizar o Canal de Ética para que o ambiente seja avaliado e situações como essa não sejam normalizadas.' },
      { letra: 'B', certa: false, texto: 'Seguir a rotina normalmente, entendendo que era apenas uma brincadeira e que alguém acabará apagando a pichação.' } ] },
    'm2-11': { estado: '11.1', videos: { certa: '', errada: '' }, opcoes: [
      { letra: 'A', certa: false, esq: 121, texto: 'Mesmo incomodada, a comunidade não pode fazer nada e deve considerar que o barulho faz parte da rotina da moradia e que não cabe interferir, já que a situação acontece fora do horário de trabalho.' },
      { letra: 'B', certa: true,  texto: 'Buscar a Ouvidoria Social, contribuindo para que as regras de convivência sejam preservadas e para que o relacionamento com a comunidade seja pautado pelo respeito.' } ] }
  };

  var POSICOES = [ { x: 317, w: 628 }, { x: 1020, w: 632 } ];

  Object.keys(QUIZZES).forEach(function (id) {
    var q = QUIZZES[id];

    window.RENDER[id] = function (t, estadoId, ctx) {
      var el = ctx.tela;
      el.className = 'escuro';
      function tagFundo(src) { return '<img class="el fundo" alt="" src="' + src + '" style="--x:0px;--y:0px;--w:1920px;--h:1080px">'; }
      var fundo = tagFundo(window.M2.FUNDO_QUIZ);
      var fundoVideo = window.M2.FUNDO;   // o feedback tem player de vídeo: usa o fundo das telas de vídeo

      /* ---- feedback: vídeo da escolha ---- */
      function feedback(certa, contar) {
        var src = q.videos[certa ? 'certa' : 'errada'];
        /* troca só o conteúdo: o fundo (e o fundo expandido) fica onde está */
        [].slice.call(el.children).forEach(function (n) { if (!n.classList.contains('fundo') && !n.classList.contains('fundo-largo')) { el.removeChild(n); } });
        el.insertAdjacentHTML('beforeend',
          '<div class="el coluna" style="--x:200px;--y:460px;--w:340px">' +
            '<h1 class="t-titulo">Assista ao feedback da sua escolha!</h1></div>' +
          '<div id="caixaVideo" class="el video-caixa video-m2" style="--x:574px;--y:185px;--w:1147px;--h:645px">' + window.M2.videoHtml(src) + '</div>');
        /* troca o fundo (e o fundo expandido, se já estiver na tela) pelo das telas de vídeo */
        var f = el.querySelector('img.fundo'); if (f) { f.src = fundoVideo; }
        var fl = el.querySelector('img.fundo-largo'); if (fl) { fl.src = fundoVideo.replace('fundo.jpg', 'fundo-largo.jpg'); }
        ctx.estado(q.estado);
        window.M2.ligarVideo(document.getElementById('caixaVideo'), src, function () { if (contar) { ctx.concluir(); } });
      }

      /* aberto pelo índice (04.1, 08.1, 11.1): mostra o feedback sem contar como atividade feita */
      if (estadoId === q.estado) { el.innerHTML = tagFundo(fundoVideo); feedback(true, false); return; }

      /* ---- as duas alternativas ---- */
      var botoes = q.opcoes.map(function (o, i) {
        return '<button type="button" class="el quiz-opcao" data-i="' + i + '" style="--x:' + POSICOES[i].x + 'px;--y:469px;--w:' + POSICOES[i].w + 'px;--h:300px' + (o.esq ? ';--esq:' + o.esq + 'px' : '') + '">' +
          '<span class="letra" aria-hidden="true">' + o.letra + '</span><span class="txt"><span class="sr-only">Alternativa ' + o.letra + ': </span>' + o.texto + '</span></button>';
      }).join('');

      el.innerHTML = fundo +
        '<div class="el quiz-cab" style="--x:0px;--y:172px;--w:1920px">' +
          '<p class="rot">QUIZ</p>' +
          '<h1 class="pergunta">' + PERGUNTA + '</h1>' +
          '<p class="chamada">' + CHAMADA + '</p>' +
        '</div>' + botoes;

      var respondeu = false;
      el.querySelectorAll('.quiz-opcao').forEach(function (b) {
        b.addEventListener('click', function () {
          if (respondeu) { return; }
          respondeu = true;
          var i = +b.getAttribute('data-i');
          var certa = q.opcoes[i].certa;
          el.querySelectorAll('.quiz-opcao').forEach(function (o) {
            o.disabled = true;
            if (o !== b) { o.classList.add('apagada'); }
          });
          b.classList.add(certa ? 'certa' : 'errada');
          setTimeout(function () { if (document.body.contains(b)) { feedback(certa, true); } }, 1100);
        });
      });
    };
  });
})();
