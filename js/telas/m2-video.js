/* Módulo 02 · Telas de vídeo: 03 (Caso 1), 07 (Caso 2), 10 (Caso 3) e 16 (O que vimos aqui?)
   Título e texto à esquerda, vídeo à direita. Nos casos, a tela avança sozinha quando o vídeo termina. */
(function () {
  'use strict';
  window.RENDER = window.RENDER || {};

  /* Quando o vídeo existir, coloque o arquivo em assets/video/ e informe o caminho em "src".
     Arquivos do storyboard:
       Caso 1  — 3822_Samarco_DireitosHumanos_StudyCase01_Modulo02_V02
       Caso 2  — 3822_Samarco_DireitosHumanos_StudyCase02_Modulo02_V02
       Caso 3  — 3822_Samarco_DireitosHumanos_StudyCase03_Modulo02_V02
       Final   — 3822_Samarco_DireitosHumanos_Video02_Modulo02_V02
     Vazio = player de marcação (a tela conclui ao clicar em "play").
     "avanca: true" faria a tela passar sozinha para a próxima ao fim do vídeo; está desligado: o aluno avança pelo botão. */
  var TELAS_VIDEO = {
    'm2-03': { src: '', avanca: false,
      titulo: 'Caso 1: Trabalho decente',
      textos: ['Assista ao relato e acompanhe uma situação sobre trabalho decente. Depois, reflita: qual é a atitude mais adequada?'] },
    /* Caso 2: no Figma o texto é mais longo (começa mais acima, coluna mais larga) e o vídeo é um pouco menor que nos outros casos */
    'm2-07': { src: '', avanca: false, colunaY: 183, textoW: 366, textoMt: 29,
      caixa: { x: 605, y: 193, w: 1114, h: 626 },
      titulo: 'Caso 2: Respeito e dignidade',
      textos: ['Se você tiver interesse em saber mais e se aprofundar nos conceitos e exemplos sobre práticas abusivas e discriminatórias, é convidado(a) a fazer o treinamento específico sobre o tema (nome do treinamento) disponível na plataforma Saber Samarco.',
               'E agora, assista a mais um relato e acompanhe uma situação sobre um ambiente de trabalho livre de práticas abusivas e discriminatórias. Depois, reflita: qual é a atitude mais adequada?'] },
    'm2-10': { src: '', avanca: false,
      titulo: 'Caso 3: Respeito à convivência e à comunidade',
      textos: ['Assista a este último relato e acompanhe uma situação sobre como ter uma boa convivência e respeitar a comunidade local. Depois, reflita: qual é a atitude mais adequada?'] },
    'm2-16': { src: '', avanca: false,
      titulo: 'O que vimos aqui?',
      textos: ['Dê um play no vídeo para conferir os principais pontos do treinamento.'],
      aposVideo: 'Clique no X para fechar e concluir o treinamento.' }
  };

  Object.keys(TELAS_VIDEO).forEach(function (id) {
    var c = TELAS_VIDEO[id];

    window.RENDER[id] = function (t, estadoId, ctx) {
      var el = ctx.tela;
      el.className = 'escuro';

      var caixa = c.caixa || { x: 574, y: 185, w: 1147, h: 645 };
      var paragrafos = c.textos.map(function (tx, i) {
        return '<p class="t-texto" style="width:' + (c.textoW || 300) + 'px' + (i ? ';margin-top:' + (c.textoMt ? 41 : 24) + 'px' : '') + '">' + tx + '</p>';
      }).join('');
      var aposVideo = c.aposVideo
        ? '<p id="instrucao" class="t-instrucao aparece' + (ctx.concluida() ? ' visivel' : '') + '" style="margin-top:30px;width:330px">' + c.aposVideo + '</p>' : '';

      el.innerHTML =
        '<img class="el fundo" alt="" src="' + window.M2.FUNDO + '" style="--x:0px;--y:0px;--w:1920px;--h:1080px">' +
        '<div class="el coluna" style="--x:200px;--y:' + (c.colunaY || 342) + 'px;--w:' + ((c.textoW || 300) + 40) + 'px">' +
          '<h1 class="t-titulo" style="width:340px">' + c.titulo + '</h1>' +
          '<div style="margin-top:' + (c.textoMt || 24) + 'px">' + paragrafos + '</div>' + aposVideo +
        '</div>' +
        '<div id="caixaVideo" class="el video-caixa video-m2" style="--x:' + caixa.x + 'px;--y:' + caixa.y + 'px;--w:' + caixa.w + 'px;--h:' + caixa.h + 'px">' + window.M2.videoHtml(c.src) + '</div>';

      window.M2.ligarVideo(document.getElementById('caixaVideo'), c.src, function () {
        ctx.concluir();
        var instr = document.getElementById('instrucao');
        if (instr) { instr.classList.add('visivel'); }
        if (c.avanca) { setTimeout(function () { ctx.proxima(); }, 1200); }
      });
    };
  });
})();

